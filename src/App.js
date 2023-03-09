import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("");

  const handleClick = (e) => {
    const digit = e.target.name;
    setDisplay(digit);
  }

  return (
    <div id="app-container">
      <div>
        <input id="display" disabled value={display}></input>
        <div id="keypad">
          <FunctionKey name="C">C</FunctionKey>
          <FunctionKey name="±">&plusmn;</FunctionKey>
          <FunctionKey name="%">%</FunctionKey>
          <OperatorKey name="/">&divide;</OperatorKey>
          <NumericKey name="7" handleClick={handleClick}>7</NumericKey>
          <NumericKey name="8" handleClick={handleClick}>8</NumericKey>
          <NumericKey name="9" handleClick={handleClick}>9</NumericKey>
          <OperatorKey name="×">&times;</OperatorKey>
          <NumericKey name="4" handleClick={handleClick}>4</NumericKey>
          <NumericKey name="5" handleClick={handleClick}>5</NumericKey>
          <NumericKey name="6" handleClick={handleClick}>6</NumericKey>
          <OperatorKey name="-">-</OperatorKey>
          <NumericKey name="1" handleClick={handleClick}>1</NumericKey>
          <NumericKey name="2" handleClick={handleClick}>2</NumericKey>
          <NumericKey name="3" handleClick={handleClick}>3</NumericKey>
          <OperatorKey name="+">+</OperatorKey>
          <NumericKey name="0" handleClick={handleClick}>0</NumericKey>
          <NumericKey name="." handleClick={handleClick}>.</NumericKey>
          <OperatorKey name="=">=</OperatorKey>
        </div>
      </div>
    </div>
  );
}

function OperatorKey({ name, children }) {
  return (
    <button className="key orange" name={name} >{children}</button>
  );
}

function FunctionKey({ name, children }) {
  return (
    <button className="key dark-grey" name={name}>{children}</button>
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
