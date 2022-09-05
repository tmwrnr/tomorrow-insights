import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Disclosure } from "@headlessui/react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

import { Month as MonthType } from "../types/month";
import { Category } from "../types/transaction";
import { compare, compareValue } from "../utils/array";
import { formatEuro, formatPercent } from "../utils/string";
import CategoryIcon from "./CategoryIcon";
import SortButton, { SortOptions } from "./SortButton";
import TransactionList from "./TransactionList";

type Props = {
  month: MonthType;
};
const Month: React.FC<Props> = ({ month }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [sorting, setSorting] = useState<typeof SortOptions[number]>(
    SortOptions[0]
  );

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory((prev) => (prev !== category ? category : undefined));
    // TODO Show transactions if hidden
  };

  // TODO remove selectedCategory if transaction are hidden

  const filteredTransactions = selectedCategory
    ? month.transactions.filter((t) => t.category === selectedCategory)
    : month.transactions;

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    switch (sorting.value) {
      case "date":
        return compare(a, b, "bookingDate", "desc");
      case "name":
        return compareValue(
          a.senderOrRecipient || a.description,
          b.senderOrRecipient || b.description
        );
      case "amount":
        return compareValue(Math.abs(a.amount), Math.abs(b.amount), "desc");
      case "co2":
        return compare(a, b, "co2FootprintInGrams", "desc");
    }
  });

  return (
    <li key={month.key}>
      <div className="mb-2 flex flex-wrap items-baseline space-y-1">
        <h2 className="mr-3 w-full text-2xl md:w-auto">{month.name}</h2>
        <div className="mr-2 flex items-center rounded-full border border-green-500 bg-green-50 px-2 py-1 text-xs text-green-500">
          <ArrowDownTrayIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Einnahmen</span>
          {formatEuro(month.income)}
        </div>
        <div className="flex items-center rounded-full border border-red-500 bg-red-50 px-2 py-1 text-xs text-red-500">
          <ArrowUpTrayIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Ausgaben</span>
          {formatEuro(month.expenses)}
        </div>
      </div>

      <ul className="grid gap-x-6 gap-y-2 rounded-lg bg-white p-3 shadow-md md:grid-cols-2 ">
        {month.categories.map((c) => (
          <li key={c.name} className="">
            <button
              className={clsx(
                "flex w-full items-center  space-x-3 rounded py-1 px-2 hover:bg-violet-100 focus:outline-violet-500 focus-visible:bg-violet-100",
                { "bg-violet-100": c.name === selectedCategory }
              )}
              onClick={() => handleCategoryClick(c.name)}
              aria-label={`Zeige nur Transaktionen der Kategorie ${c.name} an`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-500">
                <CategoryIcon category={c.name} className="h-6 w-6" />
              </div>
              <div className="grow text-left">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-400">
                  {c.transactions.length} Transaktionen
                </div>
              </div>
              <div className="text-right">
                <div className="text-semibold">
                  <span className="sr-only">Summe der Ausgaben</span>
                  {formatEuro(c.sum, true)}
                </div>
                <div className="text-sm text-gray-400">
                  <span className="sr-only">Prozentualer Anteil</span>
                  {formatPercent(c.expensesPercent, true)}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div ref={parent}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full py-2 text-center text-violet-500 hover:underline focus:outline-none focus-visible:underline">
                Transaktionen {open ? "ausblenden" : "anzeigen"}
              </Disclosure.Button>
              <Disclosure.Panel className="md:px-20">
                <div className="my-1 flex justify-end">
                  <SortButton sorting={sorting} onChange={setSorting} />
                </div>
                <TransactionList transactions={sortedTransactions} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </li>
  );
};

export default Month;
