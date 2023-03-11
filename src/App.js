import { useState } from "react";
import "./App.css";

function App() {
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [operand, setOperand] = useState(0);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState("0");

  const handleInputKey = (e) => {
    const key = e.target.value;
    if (isNewEntry) {
      setDisplay("0");
    }
    if (display.length < 8) {
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
      setDisplay(res === Infinity ? "Error" : String(Number(String(res).substring(0, 8))));
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

  const keys = [
    { value: "C", onClick: handleClearKey, className: "key dark-grey" },
    { value: "±", onClick: handleFunctionKey, className: "key dark-grey" },
    { value: "%", onClick: handleFunctionKey, className: "key dark-grey" },
    { value: "÷", onClick: handleOperatorKey, className: "key orange" },
    { value: "7", onClick: handleInputKey, className: "key light-grey" },
    { value: "8", onClick: handleInputKey, className: "key light-grey" },
    { value: "9", onClick: handleInputKey, className: "key light-grey" },
    { value: "x", onClick: handleOperatorKey, className: "key orange" },
    { value: "4", onClick: handleInputKey, className: "key light-grey" },
    { value: "5", onClick: handleInputKey, className: "key light-grey" },
    { value: "6", onClick: handleInputKey, className: "key light-grey" },
    { value: "-", onClick: handleOperatorKey, className: "key orange" },
    { value: "1", onClick: handleInputKey, className: "key light-grey" },
    { value: "2", onClick: handleInputKey, className: "key light-grey" },
    { value: "3", onClick: handleInputKey, className: "key light-grey" },
    { value: "+", onClick: handleOperatorKey, className: "key orange" },
    { value: "0", onClick: handleInputKey, className: "key light-grey" },
    { value: ".", onClick: handleInputKey, className: "key light-grey" },
    { value: "=", onClick: handleOperatorKey, className: "key orange" },
  ];

  return (
    <div id="app-container">
      <div>
        <input id="display" disabled value={display}></input>
        <div id="keypad">
          {keys.map((key) => (
            <Key
              value={key.value}
              onClick={key.onClick}
              className={key.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Key({ value, onClick, className }) {
  return (
    <button className={className} onClick={onClick} value={value}>
      {value}
    </button>
  );
}

export default App;
