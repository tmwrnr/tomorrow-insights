import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Disclosure } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import React, { useCallback, useState } from "react";

import { Month as MonthType } from "../types/month";
import { Category } from "../types/transaction";
import { compare, compareValue } from "../utils/array";
import Card from "./Card";
import CardHeadline from "./CardHeadline";
import CardItem from "./CardItem";
import SortButton, { SortOptions } from "./SortButton";
import TransactionList from "./TransactionList";

type Props = {
  month: MonthType;
};
const Month: React.FC<Props> = ({ month }) => {
  const { t } = useTranslation();
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [sorting, setSorting] = useState<typeof SortOptions[number]>(
    SortOptions[0]
  );

  const handleCategoryClick = useCallback((category: Category) => {
    setSelectedCategory((prev) => (prev !== category ? category : undefined));
  }, []);

  const filteredTransactions = selectedCategory
    ? month.transactions.filter((t) => t.category === selectedCategory)
    : month.transactions;

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    switch (sorting) {
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
      <CardHeadline
        text={month.name}
        income={month.income}
        expenses={month.expenses}
      />

      <Card>
        {month.categories.map((c) => (
          <CardItem
            key={c.name}
            name={c.name}
            selected={c.name === selectedCategory}
            transactions={c.transactions.length}
            sum={c.sum}
            expensesPercent={c.expensesPercent}
            onClick={handleCategoryClick}
          />
        ))}
      </Card>

      <div ref={parent}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full py-2 text-center text-violet-500 hover:underline focus:outline-none focus-visible:underline">
                {open ? t("hideTransactions") : t("showTransactions")}
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
