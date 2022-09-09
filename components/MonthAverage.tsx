import React from "react";
import { Month } from "../types/month";
import Card from "./Card";
import CardHeadline from "./CardHeadline";
import CardItem from "./CardItem";

type Props = {
  average: Month;
};
const MonthAverage: React.FC<Props> = ({ average }) => {
  return (
    <li>
      <CardHeadline
        text={average.name}
        income={average.income}
        expenses={average.expenses}
      />
      <Card>
        {average.categories.map((c) => (
          <CardItem
            key={c.name}
            name={c.name}
            selected={false}
            transactions={c.transactions.length}
            sum={c.sum}
            expensesPercent={c.expensesPercent}
          />
        ))}
      </Card>
    </li>
  );
};

export default MonthAverage;
