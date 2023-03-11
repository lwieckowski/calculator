import { useState } from "react";
import { Keypad } from "./Keypad";
import { Display } from "./Display";

export function Calculator() {
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(0);
  const [operator, setOperator] = useState(null);
  const [display, setDisplay] = useState("0");
  const [fontSize, setFontSize] = useState(64);
  const defaultFontSize = 64;
  const displaySize = 512;
  const defaultPrecision = 8;
  const maxDigits = 8;

  const handleInputKey = (e) => {
    const key = e.target.value;
    setFontSize(defaultFontSize);
    console.log(display.length);
    if (isNewEntry || display.length < maxDigits) {
      if (isNewEntry) {
        const dis = key !== "." ? key : "0.";
        setDisplay(dis);
        setOperand2(Number(dis));
      } else {
      const dis = getNewDisplayValue(e.target.value)
      setDisplay(dis);
      setOperand2(Number(dis));
      }
    }
    setIsNewEntry(false);
  };

  const getNewDisplayValue = (key) => {
    if (key === "0" && display === "0") {
      return display;
    }
    if (key === "." && display.includes(key)) {
      return display;
    }
    return display + key;
  }

  const handleClearKey = () => {
    setFontSize(defaultFontSize);
    setIsNewEntry(true);
    setOperand1(0);
    setOperand2(0);
    setOperator(null);
    setDisplay("0");
  };

  const handleOperatorKey = (e) => {
    if (operator == null) {
      setOperand1(operand2);
      setOperand2(0);
    } else {
      const res = compute(operand1, operand2, operator);
      const dis = res.toPrecision(defaultPrecision).replace(/\.?0+$/, "");
      setOperand1(res);
      setOperand2(0);
      setDisplay(dis);
      setFontSize(
        dis.length <= maxDigits ? defaultFontSize : displaySize / dis.length
      );
    }
    setOperator(e.target.value);
    setIsNewEntry(true);
  };

  const compute = (operand1, operand2, operator) => {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "x":
        return operand1 * operand2;
      case "÷":
        return operand1 / operand2;
      default:
        break;
    }
  };

  const handleEqualsKey = () => {
    if (operator != null) {
      const res = compute(operand1, operand2, operator);
      const dis = res.toPrecision(defaultPrecision).replace(/\.?0+$/, "");
      setOperand1(res);
      setOperand2(0);
      setDisplay(dis);
      setFontSize(
        dis.length <= maxDigits ? defaultFontSize : displaySize / dis.length
      );
      setOperator(null);
    }
    setIsNewEntry(true);
  };

  const handleFunctionKey = (e) => {
    const functionKey = e.target.value;
    let res;
    switch (functionKey) {
      case "%":
        res = operator === null ? operand2 * 0.01 : operand1 * operand2 * 0.01;
        setDisplay(res.toPrecision(defaultPrecision).replace(/\.?0+$/, ""));
        setOperand2(res);
        break;
      case "±":
        res = -Number(display);
        setDisplay(res);
        setOperand2(res);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Display value={display} size={fontSize} />
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
