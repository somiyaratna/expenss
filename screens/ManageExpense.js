import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { addExpense, editExpense, removeExpense } from "../store/expenseSlice";

const ManageExpense = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; // !! operator turns truthy value to true and falsy value to false

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    dispatch(removeExpense(editedExpenseId));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      dispatch(
        editExpense({
          id: editedExpenseId,
          description: "Edited Expense!!",
          amount: 69.99,
          date: new Date("2023-03-21"),
        })
      );
    } else {
      dispatch(
        addExpense({
          description: "Added Expense!!",
          amount: 29.99,
          date: new Date("2022-05-19"),
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          customStyles={styles.customButtonStyles}
          mode="flat"
          onPress={cancelHandler}
        >
          Cancel
        </Button>
        <Button
          customStyles={styles.customButtonStyles}
          onPress={confirmHandler}
        >
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  customButtonStyles: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
