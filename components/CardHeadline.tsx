import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { formatEuro } from "../utils/string";

type Props = {
  text: string;
  income: number;
  expenses: number;
};
const CardHeadline: React.FC<Props> = ({ text, income, expenses }) => {
  return (
    <div className="mb-2 flex flex-wrap items-baseline space-y-1">
      <h2 className="mr-3 w-full text-2xl md:w-auto">{text}</h2>
      <div className="mr-2 flex items-center rounded-full border border-green-500 bg-green-50 px-2 py-1 text-xs text-green-500">
        <ArrowDownTrayIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Einnahmen</span>
        {formatEuro(income)}
      </div>
      <div className="flex items-center rounded-full border border-red-500 bg-red-50 px-2 py-1 text-xs text-red-500">
        <ArrowUpTrayIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Ausgaben</span>
        {formatEuro(expenses)}
      </div>
    </div>
  );
};

export default React.memo(CardHeadline);
