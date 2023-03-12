import { initialState } from "./CalculatorContext";
import { DEFAULT_DIGITS, OPERATORS } from "./Calculator";

export function calculatorReducer(state, action) {
  switch (action.type) {
    case "INPUT":
      if (state.isNewEntry || state.currentInput.length < DEFAULT_DIGITS) {
        const updatedInput = processInput(
          action.payload,
          state.currentInput,
          state.isNewEntry
        );
        return {
          ...state,
          currentInput: updatedInput,
          operand2: Number(updatedInput),
          isNewEntry: false,
        };
      } else {
        return state;
      }
    case "OPERATOR":
      if (state.operator) {
        const result = OPERATORS[state.operator](
          state.operand1,
          state.operand2
        );
        return {
          ...state,
          currentInput: String(result),
          operator: action.payload,
          operand1: result,
          operand2: 0,
          isNewEntry: true,
        };
      } else {
        return {
          ...state,
          operator: action.payload,
          operand1: state.operand2,
          operand2: 0,
          isNewEntry: true,
        };
      }
    case "EQUALS":
      if (state.operator) {
        const result = OPERATORS[state.operator](
          state.operand1,
          state.operand2
        );
        return {
          ...state,
          currentInput: String(result),
          operator: null,
          operand1: result,
          operand2: 0,
          isNewEntry: true,
        };
      } else {
        return { ...state, isNewEntry: true };
      }
    case "FUNCTION":
      const FUNCTIONS = {
        "%": () =>
          state.operator
            ? state.operand1 * state.operand2 * 0.01
            : state.operand2 * 0.01,
        "±": () => -Number(state.currentInput),
      };
      const updatedInput = FUNCTIONS[action.payload]();
      return {
        ...state,
        currentInput: String(updatedInput),
        operand2: updatedInput,
      };
    case "CLEAR":
      return { ...initialState };
    default:
      return state;
  }
}
const processInput = (key, prevInput, isNewEntry) => {
  if (isNewEntry) {
    return key === "." ? "0." : key;
  } else {
    return key === "." && prevInput.includes(key) ? prevInput : prevInput + key;
  }
};
