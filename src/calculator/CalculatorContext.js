import { createContext } from "react";

export const initialState = {
  currentInput: "0",
  operator: null,
  operand1: 0,
  operand2: 0,
  isNewEntry: true,
};

export const CalculatorContext = createContext(initialState);
