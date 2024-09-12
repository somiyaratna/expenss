import React, { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { setExpense } from "../store/expenseSlice";

const RecentExpenses = () => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    async function getExpenses() {
      try {
        const fetchedExpenses = await fetchExpenses();
        if (isMounted) {
          dispatch(setExpense(fetchedExpenses));
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        // Handle the error accordingly
      }
    }
    getExpenses();
    return () => {
      isMounted = false; // Cleanup function to update isMounted on unmount
    };
  }, [dispatch]);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod={"Last 7 Days"}
      fallbackText={"No expense registered for the last 7 days"}
    />
  );
};

export default RecentExpenses;
