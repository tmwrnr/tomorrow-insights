import { Category, Transaction } from "./transaction";

export type Month = {
  key: string; // 2022-01-01
  name: string; // Januar 2022
  transactions: Transaction[];
  expenses: number;
  income: number;
  categories: {
    name: Category;
    transactions: Transaction[];
    sum: number;
    expensesPercent: number;
  }[];
};
