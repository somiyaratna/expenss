import { createSlice } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-18-05"),
  },
  {
    id: "e3",
    description: "Graphics card",
    amount: 389.29,
    date: new Date("2023-12-30"),
  },
  {
    id: "e4",
    description: "Groceries",
    amount: 89.99,
    date: new Date("2024-11-23"),
  },
  {
    id: "e5",
    description: "A Guitar",
    amount: 189.99,
    date: new Date("2024-04-18"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-18-05"),
  },
  {
    id: "e8",
    description: "Graphics calendar",
    amount: 389.29,
    date: new Date("2023-12-30"),
  },
  {
    id: "e9",
    description: "Groceries",
    amount: 89.99,
    date: new Date("2024-11-23"),
  },
  {
    id: "e10",
    description: "A Guitar",
    amount: 189.99,
    date: new Date("2024-04-18"),
  },
];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: DUMMY_EXPENSES,
  reducers: {
    addExpense(state, action) {
      state.push(action.payload);
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
  },
});

export const { addExpense, removeExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
