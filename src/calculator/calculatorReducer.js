import { initialState } from "./CalculatorContext";
import { DEFAULT_DIGITS, OPERATORS } from "./CalculatorContext";


export function calculatorReducer(state, action) {
  switch (action.type) {
    case "INPUT":
      return handleInput(state, action);
    case "OPERATOR":
      return handleOperator(state, action);
    case "EQUALS":
      return handleEquals(state);
    case "FUNCTION":
      return handleFunction(state, action);
    case "CLEAR":
      return { ...initialState };
    default:
      return state;
  }
}

function handleInput(state, action) {
  const prevInput = state.currentInput;
  if (state.isNewEntry || prevInput.length < DEFAULT_DIGITS) {
    const key = action.payload;
    const updatedInput = state.isNewEntry
      ? key === "." ? "0." : key
      : key === "." && prevInput.includes(key) ? prevInput : prevInput + key;
    return {
      ...state,
      currentInput: updatedInput,
      operand2: Number(updatedInput),
      isNewEntry: false,
    };
  } else {
    return state;
  }
}

function handleOperator(state, action) {
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
}

function handleEquals(state) {
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
}

function handleFunction(state, action) {
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
}
