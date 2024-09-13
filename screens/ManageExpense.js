import { StyleSheet, TextInput, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, editExpense, removeExpense } from "../store/expenseSlice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const editedExpenseId = route.params?.expenseId;
  const expenses = useSelector((state) => state.expenses);

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const isEditing = !!editedExpenseId; // !! operator turns truthy value to true and falsy value to false

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setisSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      dispatch(removeExpense(editedExpenseId));
      navigation.goBack();
    } catch (error) {
      setError(`Could not delete expense! ${error.message}`);
    } finally {
      setisSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setisSubmitting(true);
    try {
      if (isEditing) {
        dispatch(editExpense({ id: editedExpenseId, ...expenseData }));
        await updateExpense(editedExpenseId, expenseData);
        setisSubmitting(false);
      } else {
        const id = await storeExpense(expenseData);
        setisSubmitting(false);
        dispatch(
          addExpense({
            ...expenseData,
            id: id,
          })
        );
      }
      navigation.goBack();
    } catch (error) {
      setError(
        `Could not ${isEditing ? "update" : "add"} expense! ${error.message}`
      );
    } finally {
      setisSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Edit" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
