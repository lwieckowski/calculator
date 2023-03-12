import {
  DEFAULT_FONT_SIZE,
  DEFAULT_DIGITS,
  PRECISION,
} from "../CalculatorContext";

export function Display({ value }) {
  const formattedValue = formatValue(value);
  return (
    <input
      id="display"
      disabled
      value={formattedValue}
      style={{ fontSize: `${calculateFontSize(formattedValue)}px` }}
    ></input>
  );
}

const formatValue = (value) => {
  if (value.endsWith(".")) {
    return value;
  } else {
    return Number(value)
      .toPrecision(PRECISION)
      .replace(/\.?0+$/, "");
  }
};

const calculateFontSize = (value) => {
  return value.length <= DEFAULT_DIGITS
    ? DEFAULT_FONT_SIZE
    : (DEFAULT_FONT_SIZE * DEFAULT_DIGITS) / value.length;
};
