import { useState } from "react";
import { Keypad } from "./Keypad";
import { Display } from "./Display";

export function Calculator() {
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [operand, setOperand] = useState(0);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState("0");
  const [fontSize, setFontSize] = useState(64);

  const handleInputKey = (e) => {
    const key = e.target.value;
    setFontSize(64);
    if (isNewEntry) {
      setDisplay("0");
    }
    if (isNewEntry || display.length < 8) {
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
    setFontSize(64);
    setIsNewEntry(true);
    setOperand(0);
    setOperator(null);
    setResult(null);
    setDisplay("0");
  };

  const handleOperatorKey = (e) => {
    if (operator != null) {
      let res;
      switch (operator) {
        case "+":
          res = operand + Number(display);
          break;
        case "-":
          res = operand - Number(display);
          break;
        case "x":
          res = operand * Number(display);
          break;
        case "÷":
          res = operand / Number(display);
          break;
        case "=":
          res = result;
      }
      setResult(res);
      setOperand(res);
      const resDisplay = res === Infinity ? res : res.toPrecision(8).replace(/\.?0+$/,"")
      setDisplay(resDisplay);
      setFontSize(resDisplay.length <= 8 ? 64 : 512 / resDisplay.length);
    } else {
      setOperand(Number(display));
    }
    const operatorKey = e.target.value;
    setOperator(operatorKey);
    setIsNewEntry(true);
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
