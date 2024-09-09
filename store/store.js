import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenseSlice";

const store = configureStore({
  reducer: { expenses: expensesReducer },
});

export default store;
