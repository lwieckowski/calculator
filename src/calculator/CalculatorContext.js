import { createContext } from "react";

export const DEFAULT_FONT_SIZE = 64;
export const DEFAULT_DIGITS = 8;
export const PRECISION = 8;

export const OPERATORS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

export const initialState = {
  currentInput: "0",
  operator: null,
  operand1: 0,
  operand2: 0,
  isNewEntry: true,
};

export const CalculatorContext = createContext(initialState);
