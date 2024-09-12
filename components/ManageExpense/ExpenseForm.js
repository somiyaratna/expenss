import { Alert, StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../utils/date";
import React from "react";
import Input from "./Input";
import Button from "../../ui/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = React.useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputId, enteredValue) {
    setInputs((currInputs) => ({
      ...currInputs,
      [inputId]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescValid) {
      // Alert.alert("Invalid inputs", "Please check all input values");
      setInputs((currInputs) => ({
        amount: { value: currInputs.amount.value, isValid: isAmountValid },
        date: { value: currInputs.date.value, isValid: isDateValid },
        description: {
          value: currInputs.description.value,
          isValid: isDescValid,
        },
      }));
      return;
    }
    onSubmit(expenseData);
    defaultValues = null;
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          inValid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "Enter amount",
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />

        <Input
          label={"Date"}
          inValid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "numeric",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autocorrect: false,
          placeholder: "Add a note",
          // autoCapitalize: "none" or "sentences" or "words" or "characters",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input value(s), please enter correct data
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          customStyles={styles.customButtonStyles}
          mode="flat"
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          customStyles={styles.customButtonStyles}
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    margin: 24,
    textAlign: "center",
  },
  inputsRow: {
    // To make amount and date in same row
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // To make amount and date take maximum width
  rowInput: {
    flex: 1,
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
