import { useReducer, createContext } from "react";
import { Keypad } from "./Keypad";
import { Display } from "./Display";

export const DEFAULT_FONT_SIZE = 64;
export const DEFAULT_DIGITS = 8;
export const PRECISION = 8;

const OPERATORS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const initialState = {
  currentInput: "0",
  operator: null,
  operand1: 0,
  operand2: 0,
  isNewEntry: true,
};

const CalculatorContext = createContext(initialState);

function calculatorReducer(state, action) {
  switch (action.type) {
    case "INPUT":
      if (state.isNewEntry || state.currentInput.length < DEFAULT_DIGITS) {
        const updatedInput = processInput(
          action.payload,
          state.currentInput,
          state.isNewEntry
        );
        return { ...state, currentInput: updatedInput, operand2: Number(updatedInput), isNewEntry: false };
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
      return { ...state, currentInput: String(updatedInput), operand2: updatedInput };
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

export function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleInputKey = (e) => {
    dispatch({ type: "INPUT", payload: e.target.value });
  };

  const handleClearKey = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleOperatorKey = (e) => {
    dispatch({ type: "OPERATOR", payload: e.target.value });
  };

  const handleEqualsKey = () => {
    dispatch({ type: "EQUALS" });
  };

  const handleFunctionKey = (e) => {
    dispatch({ type: "FUNCTION", payload: e.target.value });
  };

  return (
    <CalculatorContext.Provider value={state}>
      <div>
        <Display value={state.currentInput} />
        <Keypad
          handleClearKey={handleClearKey}
          handleFunctionKey={handleFunctionKey}
          handleInputKey={handleInputKey}
          handleOperatorKey={handleOperatorKey}
          handleEqualsKey={handleEqualsKey}
        />
      </div>
    </CalculatorContext.Provider>
  );
}
