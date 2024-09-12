import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    addExpense(state, action) {
      return [action.payload, ...state];
    },
    removeExpense(state, action) {
      return state.filter((expense) => expense.id !== action.payload);
    },
    editExpense(state, action) {
      const { id, description, amount, date } = action.payload;
      const expense = state.find((expense) => expense.id === id);
      if (expense) {
        expense.description = description;
        expense.amount = amount;
        expense.date = date;
      }
    },
    setExpense(state, action) {
      const inverted = action.payload.reverse();
      return inverted;
    },
  },
});

export const { addExpense, removeExpense, editExpense, setExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
