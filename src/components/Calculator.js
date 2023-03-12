import { useState } from "react";
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

export function Calculator() {
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(0);
  const [operator, setOperator] = useState(null);
  const [display, setDisplay] = useState("0");
  const [isNewEntry, setIsNewEntry] = useState(true);

  const handleInputKey = (e) => {
    const key = e.target.value;
    const newValue = getNewDisplayValue(key, isNewEntry);
    if (isNewEntry || display.length < DEFAULT_DIGITS) {
      setDisplay(newValue);
      setOperand2(Number(newValue));
      setIsNewEntry(false);
    }
  };

  const getNewDisplayValue = (key, isNewEntry) => {
    if (isNewEntry) {
      return key === "." ? "0." : key;
    } else {
      return key === "." && display.includes(key) ? display : display + key;
    }
  };

  const handleClearKey = () => {
    setOperand1(0);
    setOperand2(0);
    setOperator(null);
    setDisplay("0");
    setIsNewEntry(true);
  };

  const handleOperatorKey = (e) => {
    if (operator) {
      const result = OPERATORS[operator](operand1, operand2);
      setOperand1(result);
      setDisplay(result);
    } else {
      setOperand1(operand2);
    }
    setOperator(e.target.value);
    setOperand2(0);
    setIsNewEntry(true);
  };

  const handleEqualsKey = () => {
    if (operator) {
      const result = OPERATORS[operator](operand1, operand2);
      setOperand1(result);
      setOperand2(0);
      setDisplay(String(result));
      setOperator(null);
    }
    setIsNewEntry(true);
  };

  const handleFunctionKey = (e) => {
    const functionKey = e.target.value;
    const FUNCTIONS = {
      "%": () => (operator ? operand1 * operand2 * 0.01 : operand2 * 0.01),
      "±": () => -Number(display),
    };
    const result = FUNCTIONS[functionKey]();
    setDisplay(String(result));
    setOperand2(result);
  };

  return (
    <div>
      <Display value={display} />
      <Keypad
        handleClearKey={handleClearKey}
        handleFunctionKey={handleFunctionKey}
        handleInputKey={handleInputKey}
        handleOperatorKey={handleOperatorKey}
        handleEqualsKey={handleEqualsKey}
      />
    </div>
  );
}
