import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensePeriod={"Total"}
      fallbackText={"No expenses registered yet"}
    />
  );
};

export default AllExpenses;
