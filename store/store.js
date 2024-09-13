import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenseSlice";

const store = configureStore({
  reducer: { expenses: expensesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
