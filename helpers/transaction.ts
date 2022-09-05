import { nanoid } from "nanoid";
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

const MonthDateFormatter = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
});
function getMonthName(date: string): string {
  return MonthDateFormatter.format(new Date(date));
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
