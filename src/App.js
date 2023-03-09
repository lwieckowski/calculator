import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("");

  const handleNumericKey = (e) => {
    const key = e.target.name;
    if (display.length < 8) {
      setDisplay(display => {
        if (key === '.' && display.includes(key)) {
          return display;
        }
        return display + key;
      });
    };
  };

  const handleClearKey = (e) => {
    setDisplay("");
  };

  return (
    <div id="app-container">
      <div>
        <input id="display" disabled value={display}></input>
        <div id="keypad">
          <FunctionKey name="C" handleClick={handleClearKey}>C</FunctionKey>
          <FunctionKey name="±">&plusmn;</FunctionKey>
          <FunctionKey name="%">%</FunctionKey>
          <OperatorKey name="/">&divide;</OperatorKey>
          <NumericKey name="7" handleClick={handleNumericKey}>7</NumericKey>
          <NumericKey name="8" handleClick={handleNumericKey}>8</NumericKey>
          <NumericKey name="9" handleClick={handleNumericKey}>9</NumericKey>
          <OperatorKey name="×">&times;</OperatorKey>
          <NumericKey name="4" handleClick={handleNumericKey}>4</NumericKey>
          <NumericKey name="5" handleClick={handleNumericKey}>5</NumericKey>
          <NumericKey name="6" handleClick={handleNumericKey}>6</NumericKey>
          <OperatorKey name="-">-</OperatorKey>
          <NumericKey name="1" handleClick={handleNumericKey}>1</NumericKey>
          <NumericKey name="2" handleClick={handleNumericKey}>2</NumericKey>
          <NumericKey name="3" handleClick={handleNumericKey}>3</NumericKey>
          <OperatorKey name="+">+</OperatorKey>
          <NumericKey name="0" handleClick={handleNumericKey}>0</NumericKey>
          <NumericKey name="." handleClick={handleNumericKey}>.</NumericKey>
          <OperatorKey name="=">=</OperatorKey>
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
