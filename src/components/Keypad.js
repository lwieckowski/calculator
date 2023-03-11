export function Keypad({
  handleClearKey,
  handleFunctionKey,
  handleInputKey,
  handleOperatorKey,
}) {
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
    <div id="keypad">
      {keys.map((key) => (
        <Key
          value={key.value}
          onClick={key.onClick}
          className={key.className}
        />
      ))}
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
