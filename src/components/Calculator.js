import { useState } from "react";
import { Keypad } from "./Keypad";
import { Display } from "./Display";

export function Calculator() {
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [storedValue, setStoredValue] = useState(0);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState("0");
  const [fontSize, setFontSize] = useState(64);
  const defaultFontSize = 64;
  const displaySize = 512;
  const defaultPrecision = 8;
  const maxDigits = 8;

  const handleInputKey = (e) => {
    const key = e.target.value;
    setFontSize(defaultFontSize);
    if (isNewEntry) {
      setDisplay("0");
    }
    if (isNewEntry || display.length < maxDigits) {
      setDisplay((display) => {
        setIsNewEntry(false);
        if (key === "0" && display === "0") {
          return display;
        }
        if (key === "." && display.includes(key)) {
          return display;
        }
        if (key !== "0" && key !== "." && display === "0") {
          return key;
        }
        return display + key;
      });
    }
  };

  const handleClearKey = (e) => {
    setFontSize(defaultFontSize);
    setIsNewEntry(true);
    setStoredValue(0);
    setOperator(null);
    setResult(null);
    setDisplay("0");
  };

  const handleOperatorKey = (e) => {
    if (operator == null) {
      setStoredValue(Number(display));
    } else {
      const res = compute(storedValue, Number(display), operator);
      const dis = res.toPrecision(defaultPrecision).replace(/\.?0+$/, "");
      setResult(res);
      setStoredValue(res);
      setDisplay(dis);
      setFontSize(
        dis.length <= maxDigits ? defaultFontSize : displaySize / dis.length
      );
    }
    const operatorKey = e.target.value;
    setOperator(operatorKey);
    setIsNewEntry(true);
  };

  const compute = (value1, value2, op) => {
    switch (op) {
      case "+":
        return value1 + value2;
      case "-":
        return value1 - value2;
      case "x":
        return value1 * value2;
      case "÷":
        return value1 / value2;
      case "=":
        return result;
    }
  };

  const handleFunctionKey = (e) => {
    const functionKey = e.target.value;
    let res;
    switch (functionKey) {
      case "%":
        res = Number(display) * 0.01;
        break;
      case "±":
        res = -Number(display);
        break;
    }
    setResult(res);
    setDisplay(res);
  };

  return (
    <div>
      <Display value={display} size={fontSize} />
      <Keypad
        handleClearKey={handleClearKey}
        handleFunctionKey={handleFunctionKey}
        handleInputKey={handleInputKey}
        handleOperatorKey={handleOperatorKey}
      />
    </div>
  );
}
