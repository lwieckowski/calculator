export function Keypad({
  handleClearKey,
  handleFunctionKey,
  handleInputKey,
  handleOperatorKey,
  handleEqualsKey,
}) {
  return (
    <div id="keypad">
      <Key value="AC" onClick={handleClearKey} className="key dark-grey" />
      <Key value="±" onClick={handleFunctionKey} className="key dark-grey" />
      <Key value="%" onClick={handleFunctionKey} className="key dark-grey" />
      <Key value="÷" onClick={handleOperatorKey} className="key orange" />
      <Key value="7" onClick={handleInputKey} className="key light-grey" />
      <Key value="8" onClick={handleInputKey} className="key light-grey" />
      <Key value="9" onClick={handleInputKey} className="key light-grey" />
      <Key value="x" onClick={handleOperatorKey} className="key orange" />
      <Key value="4" onClick={handleInputKey} className="key light-grey" />
      <Key value="5" onClick={handleInputKey} className="key light-grey" />
      <Key value="6" onClick={handleInputKey} className="key light-grey" />
      <Key value="-" onClick={handleOperatorKey} className="key orange" />
      <Key value="1" onClick={handleInputKey} className="key light-grey" />
      <Key value="2" onClick={handleInputKey} className="key light-grey" />
      <Key value="3" onClick={handleInputKey} className="key light-grey" />
      <Key value="+" onClick={handleOperatorKey} className="key orange" />
      <Key value="0" onClick={handleInputKey} className="key light-grey" />
      <Key value="." onClick={handleInputKey} className="key light-grey" />
      <Key value="=" onClick={handleEqualsKey} className="key orange" />
    </div>
  );
}

export function Key({ value, onClick, className }) {
  return (
    <button className={className} onClick={onClick} value={value}>
      {value}
    </button>
  );
}
