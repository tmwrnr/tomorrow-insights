import { Disclosure } from "@headlessui/react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import { Month as MonthType } from "../types/month";
import { formatDateString, formatEuro, formatPercent } from "../utils/string";
import CategoryIcon from "./CategoryIcon";

type Props = {
  month: MonthType;
};
const Month: React.FC<Props> = ({ month }) => {
  return (
    <li key={month.key}>
      <div className="mb-2 flex items-baseline">
        <h2 className="mr-3 text-2xl ">{month.name}</h2>
        <div className="mr-2 flex items-center rounded-full border border-green-500 bg-green-50 px-2 py-1 text-xs text-green-500">
          <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
          {formatEuro(month.income)}
        </div>
        <div className="flex items-center rounded-full border border-red-500 bg-red-50 px-2 py-1 text-xs text-red-500">
          <ArrowUpTrayIcon className="mr-2 h-4 w-4" />
          {formatEuro(month.expenses)}
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-lg bg-white p-4 shadow-md ">
        {month.categories.map((c) => (
          <li key={c.name} className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-500">
              <CategoryIcon category={c.name} className="h-6 w-6" />
            </div>
            <div className="grow">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-400">
                {c.transactions.length} Transactions
              </div>
            </div>
            <div className="text-right">
              <div className="text-semibold">{formatEuro(c.sum, true)}</div>
              <div className="text-sm text-gray-400">
                {formatPercent(c.expensesPercent, true)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Disclosure>
        <Disclosure.Button className="w-full py-2 text-center text-violet-500">
          Einträge anzeigen
        </Disclosure.Button>
        <Disclosure.Panel className="px-20">
          <ul className="space-y-5">
            {month.transactions.map((t) => (
              <li
                key={t.id}
                className="flex items-center space-x-3 px-2 py-1 hover:rounded hover:bg-violet-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-500">
                  <CategoryIcon category={t.category} className="h-6 w-6" />
                </div>
                <div className="grow">
                  <div className="font-semibold">
                    {t.senderOrRecipient || t.description}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDateString(t.bookingDate)}
                  </div>
                </div>
                <div>{formatEuro(t.amount)}</div>
              </li>
            ))}
          </ul>
        </Disclosure.Panel>
      </Disclosure>
    </li>
  );
};

export default Month;
