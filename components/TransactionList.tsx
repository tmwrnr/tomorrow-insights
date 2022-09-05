import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { Transaction } from "../types/transaction";
import { formatDateString, formatEuro, formatMassUnit } from "../utils/string";
import CategoryIcon from "./CategoryIcon";

type Props = {
  transactions: Transaction[];
};
const TransactionList: React.FC<Props> = ({ transactions }) => {
  const [parent] = useAutoAnimate<HTMLUListElement>(/* optional config */);
  return (
    <ul className="space-y-5" ref={parent}>
      {transactions.map((t) => (
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
          <div className="text-right">
            <div>{formatEuro(t.amount)}</div>
            <div className="text-sm text-gray-500">
              {formatMassUnit(t.co2FootprintInGrams)} CO₂
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
