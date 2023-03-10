import { useState } from 'react';
import './App.css';

function App() {
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [operand, setOperand]= useState(0);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState("0");


  const handleNumericKey = (e) => {
    const key = e.target.name;
    if (isNewEntry) {
      setDisplay("0");
    }
    if (display.length < 8) {
      setDisplay(display => {
        setIsNewEntry(false);
        if (key === "0" && display === "0") {
          return display;
        }
        if (key === '.' && display.includes(key)) {
          return display;
        }
        if (key !== "0" && key !== "." && display === "0") {
          return key;
        }
        return display + key;
      });
    };
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
        case "×":
          res = operand * Number(display);
          break;
        case "/":
          res = operand / Number(display);
          break;
        case "=":
          res = result;
      }
      setResult(res);
      setOperand(res);
      setDisplay(String(res));
    } else {
      setOperand(Number(display));
    }
    const operatorKey = e.target.name;
    setOperator(operatorKey);
    setIsNewEntry(true);
  }

  const handleFunctionKey = (e) => {
    const functionKey = e.target.name;
    let res;
    switch (functionKey) {
      case "%":
        res = Number(display) * 0.01;
        break;
      case "±":
        res = -Number(display);
        break;
    }
    console.log(res);
    setResult(res);
    setDisplay(res);
  }


  return (
    <div id="app-container">
      <div>
        <input id="display" disabled value={display}></input>
        <div id="keypad">
          <FunctionKey name="C" handleClick={handleClearKey}>C</FunctionKey>
          <FunctionKey name="±" handleClick={handleFunctionKey}>&plusmn;</FunctionKey>
          <FunctionKey name="%" handleClick={handleFunctionKey}>%</FunctionKey>
          <OperatorKey name="/" handleClick={handleOperatorKey}>&divide;</OperatorKey>
          <NumericKey name="7" handleClick={handleNumericKey}>7</NumericKey>
          <NumericKey name="8" handleClick={handleNumericKey}>8</NumericKey>
          <NumericKey name="9" handleClick={handleNumericKey}>9</NumericKey>
          <OperatorKey name="×" handleClick={handleOperatorKey}>&times;</OperatorKey>
          <NumericKey name="4" handleClick={handleNumericKey}>4</NumericKey>
          <NumericKey name="5" handleClick={handleNumericKey}>5</NumericKey>
          <NumericKey name="6" handleClick={handleNumericKey}>6</NumericKey>
          <OperatorKey name="-" handleClick={handleOperatorKey}>-</OperatorKey>
          <NumericKey name="1" handleClick={handleNumericKey}>1</NumericKey>
          <NumericKey name="2" handleClick={handleNumericKey}>2</NumericKey>
          <NumericKey name="3" handleClick={handleNumericKey}>3</NumericKey>
          <OperatorKey name="+" handleClick={handleOperatorKey}>+</OperatorKey>
          <NumericKey name="0" handleClick={handleNumericKey}>0</NumericKey>
          <NumericKey name="." handleClick={handleNumericKey}>.</NumericKey>
          <OperatorKey name="=" handleClick={handleOperatorKey}>=</OperatorKey>
        </div>
      </div>
    </div>
  );
}

function OperatorKey({ name, children, handleClick }) {
  return (
    <button
      className="key orange"
      name={name}
      onClick={handleClick}
    >{children}</button>
  );
}

function FunctionKey({ name, children, handleClick }) {
  return (
    <button
      className="key dark-grey"
      name={name}
      onClick={handleClick}
    >{children}</button>
  );
}

function NumericKey({ name, children, handleClick }) {
  return (
    <button
      className="key light-grey"
      name={name}
      onClick={handleClick}
    >{children}</button>
  );
}

export default App;
