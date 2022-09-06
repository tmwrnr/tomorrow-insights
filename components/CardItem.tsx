import clsx from "clsx";
import React from "react";
import { Category } from "../types/transaction";
import { formatEuro, formatPercent } from "../utils/string";
import CategoryIcon from "./CategoryIcon";

type Props = {
  name: Category;
  selected: boolean;
  onClick?: (category: Category) => void;
  transactions: number;
  sum: number;
  expensesPercent: number;
};

const CardItem: React.FC<Props> = ({
  name,
  selected,
  onClick,
  transactions,
  sum,
  expensesPercent,
}) => {
  return (
    <li>
      <button
        className={clsx(
          "flex w-full items-center  space-x-3 rounded py-1 px-2 hover:bg-violet-100 focus:outline-violet-500 focus-visible:bg-violet-100",
          { "bg-violet-100": selected }
        )}
        onClick={() => onClick && onClick(name)}
        aria-label={`Zeige nur Transaktionen der Kategorie ${name} an`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-500">
          <CategoryIcon category={name} className="h-6 w-6" />
        </div>
        <div className="grow text-left">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-400">
            {transactions} Transaktionen
          </div>
        </div>
        <div className="text-right">
          <div className="text-semibold">
            <span className="sr-only">Summe der Ausgaben</span>
            {formatEuro(sum, true)}
          </div>
          <div className="text-sm text-gray-400">
            <span className="sr-only">Prozentualer Anteil</span>
            {formatPercent(expensesPercent, true)}
          </div>
        </div>
      </button>
    </li>
  );
};

export default React.memo(CardItem);
