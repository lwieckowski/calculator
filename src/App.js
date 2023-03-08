import './App.css';

function App() {
  return (
    <div id="app-container">
      <div>
        <input id="display" disabled></input>
        <div id="keypad">
          <FunctionKey>C</FunctionKey>
          <FunctionKey>&plusmn;</FunctionKey>
          <FunctionKey>%</FunctionKey>
          <OperatorKey>&divide;</OperatorKey>
          <NumericKey>7</NumericKey>
          <NumericKey>8</NumericKey>
          <NumericKey>9</NumericKey>
          <OperatorKey>&times;</OperatorKey>
          <NumericKey>4</NumericKey>
          <NumericKey>5</NumericKey>
          <NumericKey>6</NumericKey>
          <OperatorKey>-</OperatorKey>
          <NumericKey>1</NumericKey>
          <NumericKey>2</NumericKey>
          <NumericKey>3</NumericKey>
          <OperatorKey>+</OperatorKey>
          <NumericKeyZero>0</NumericKeyZero>
          <NumericKey>.</NumericKey>
          <OperatorKey>=</OperatorKey>
        </div>
      </div>
    </div>
  );
}

function OperatorKey(props) {
  return (
    <div className="key orange">{props.children}</div>
  );
}

function FunctionKey(props) {
  return (
    <div className="key dark-grey">{props.children}</div>
  );
}

function NumericKey(props) {
  return (
    <div className="key light-grey">{props.children}</div>
  );
}

function NumericKeyZero(props) {
    return (
      <div className="key light-grey" id="key-0">{props.children}</div>
    );
}



export default App;
