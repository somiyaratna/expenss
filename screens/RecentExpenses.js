import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { setExpense } from "../store/expenseSlice";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

const RecentExpenses = () => {
  const expenses = useSelector((state) => state.expenses);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const fetchedExpenses = await fetchExpenses();
        dispatch(setExpense(fetchedExpenses));
      } catch (error) {
        setError(`Could not fetch expenses! ${error.message}`);
      } finally {
        setIsFetching(false);
      }
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
