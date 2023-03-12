import { useReducer } from "react";
import { Keypad } from "./components/Keypad";
import { Display } from "./components/Display";
import { initialState, CalculatorContext } from "./CalculatorContext";
import { calculatorReducer } from "./calculatorReducer";

export const DEFAULT_FONT_SIZE = 64;
export const DEFAULT_DIGITS = 8;
export const PRECISION = 8;

export const OPERATORS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "x": (a, b) => a * b,
  "÷": (a, b) => a / b,
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
