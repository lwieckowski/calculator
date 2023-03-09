import './App.css';

function App() {
  return (
    <div id="app-container">
      <div>
        <input id="display" disabled></input>
        <div id="keypad">
          <FunctionKey name="C">C</FunctionKey>
          <FunctionKey name="±">&plusmn;</FunctionKey>
          <FunctionKey name="%">%</FunctionKey>
          <OperatorKey name="/">&divide;</OperatorKey>
          <NumericKey name="7">7</NumericKey>
          <NumericKey name="8">8</NumericKey>
          <NumericKey name="9">9</NumericKey>
          <OperatorKey name="×">&times;</OperatorKey>
          <NumericKey name="4">4</NumericKey>
          <NumericKey name="5">5</NumericKey>
          <NumericKey name="6">6</NumericKey>
          <OperatorKey name="-">-</OperatorKey>
          <NumericKey name="1">1</NumericKey>
          <NumericKey name="2">2</NumericKey>
          <NumericKey name="3">3</NumericKey>
          <OperatorKey name="+">+</OperatorKey>
          <NumericKey name="0">0</NumericKey>
          <NumericKey name=".">.</NumericKey>
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

function NumericKey({ name, children }) {
  return (
    <button className="key light-grey" name={name}>{children}</button>
  );
}

export default App;
