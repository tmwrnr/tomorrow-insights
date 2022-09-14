import { nanoid } from "nanoid";
import { i18n } from "next-i18next";
import { csvToJson } from "../lib/csvToJson";
import { Month } from "../types/month";
import { Category, Transaction, TransactionImport } from "../types/transaction";
import { compare, groupBy, sortBy } from "../utils/array";
import { euroStringToNumber } from "../utils/string";
import { isObject } from "../utils/type";

export const prepareData = async (files: File[]): Promise<Transaction[]> => {
  const convertedFiles = await Promise.all(
    files.map(csvToJson<TransactionImport>)
  );

  const validTransactions = convertedFiles
    .flat()
    .filter((t) => isTransactionImport(t));

  if (validTransactions.length === 0) {
    // TODO Show error to user
    throw new Error("No valid imports");
  }

  const transactions = validTransactions.map(transactionFactory);

  return sortBy(transactions, "bookingDate", "desc");
};

export const getTransactionsPerMonth = (
  transactions: Transaction[]
): Month[] => {
  const monthsMap = transactions.reduce((map, t) => {
    const month = getMonthDateString(t.bookingDate);
    const monthTransactions = map[month] ?? [];
    return {
      ...map,
      [month]: [...monthTransactions, t],
    };
  }, {} as Record<string, Transaction[]>);

  const months: Month[] = Object.entries(monthsMap).map(
    ([month, transactions]) => {
      const expenses = getExpenses(transactions);
      const income = getIncome(transactions);

      const categories: Month["categories"] = Object.entries(
        groupBy(transactions, "category")
      )
        .map(([category, transactions]) => {
          const sum = getExpenses(transactions);
          const expensesPercent = sum / expenses;
          return {
            name: category as Category,
            transactions,
            sum,
            expensesPercent,
          };
        })
        .filter((category) => category.sum > 0)
        .sort((a, b) => compare(a, b, "sum", "desc"));

      return {
        key: month,
        name: getMonthName(month),
        transactions,
        expenses,
        income,
        categories,
      };
    }
  );

  sortBy(months, "key", "desc");

  return months;
};

const getAverage = (numbers: number[], months: number) =>
  numbers.reduce((sum, n) => sum + n, 0) / months;

export const getAverageMonth = (months: Month[]): Month | undefined => {
  if (months.length < 2) {
    return undefined;
  }

  const expenses = getAverage(
    months.map((m) => m.expenses),
    months.length
  );
  const income = getAverage(
    months.map((m) => m.income),
    months.length
  );

  const categoriesMap = groupBy(months.map((m) => m.categories).flat(), "name");
  const categories: Month["categories"] = Object.entries(categoriesMap)
    .map(([category, categories]) => {
      const sum = getAverage(
        categories.map((c) => c.sum),
        months.length
      );
      const expensesPercent = getAverage(
        categories.map((c) => c.expensesPercent),
        months.length
      );
      const allTransactions: Transaction[] = categories
        .map((c) => c.transactions)
        .flat();
      const averageTransactionsSize = Math.ceil(
        allTransactions.length / months.length
      );
      const transactions = allTransactions.slice(0, averageTransactionsSize);
      return {
        sum,
        expensesPercent,
        name: category as Category,
        transactions, // Only for displaying the average size of transactions a month
      };
    })
    .sort((a, b) => compare(a, b, "sum", "desc"));

  return {
    expenses,
    income,
    categories,
    key: "overview",
    name: i18n?.t("average") ?? "Durchschnitt",
    transactions: [],
  };
};

const mandatoryKeys: (keyof TransactionImport)[] = [
  "account_type",
  "amount",
  "booking_date",
  "booking_type",
  "category",
  "co2_footprint_in_grams",
  "currency",
  "description",
  "iban",
  "sender_or_recipient",
  "valuta_date",
];
function isTransactionImport(value: unknown): value is TransactionImport {
  if (isObject(value)) {
    const keys = Object.keys(value);
    return mandatoryKeys.every((key) => keys.includes(key));
  }

  return false;
}

function transactionFactory(transaction: TransactionImport): Transaction {
  return {
    id: nanoid(),
    accountType: transaction.account_type,
    amount: euroStringToNumber(transaction.amount),
    bookingDate: transaction.booking_date,
    bookingType: transaction.booking_type,
    category: transaction.category,
    co2FootprintInGrams: euroStringToNumber(transaction.co2_footprint_in_grams),
    currency: transaction.currency,
    description: transaction.description,
    iban: transaction.iban,
    senderOrRecipient: transaction.sender_or_recipient,
    valutaDate: transaction.valuta_date,
  };
}

function getMonthName(date: string): string {
  return new Intl.DateTimeFormat(i18n?.language, {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

type DateTuple = [year: string, month: string, day: string];
function getMonthDateString(date: string): string {
  const [year, month] = date.split("-") as DateTuple;
  return `${year}-${month}-01`;
}

function getExpenses(transactions: Transaction[]) {
  return transactions
    .filter((t) => Math.sign(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
}

function getIncome(transactions: Transaction[]) {
  return transactions
    .filter((t) => Math.sign(t.amount) > 0)
    .reduce((sum, t) => sum + t.amount, 0);
}
