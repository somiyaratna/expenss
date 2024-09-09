import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const expenses = useSelector((state) => state.expenses);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={expenses}
      expensePeriod={"Last 7 Days"}
      fallbackText={"No expense registered for the last 7 days"}
    />
  );
};

export default RecentExpenses;
