import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe('Calculator display', () => {

  test('is shown and is read-only', () => {
    render(<App />);
    const userInput = '5';
    const display = screen.getByRole('textbox', { id: "display" });
    const currentValue = display.value;
    userEvent.type(display, userInput);
    expect(display).toHaveValue(currentValue);
  });

});

describe('Calculator keypad', () => {
  
  test('is shown and has all required keys', () => {
    render(<App />);
    const keyNames = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'C', '±', '%', '÷', '×', '-', '+', '=', '.'
    ]
    for (const keyName of keyNames) {
      const key = screen.getByRole('button', {name: keyName});
      expect(key).toBeInTheDocument();
    }
  });

});

describe('Calculator usage', () => {

  const numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

  describe('when display is empty', () => {
    for (const key of numericKeys) {
      test(`user can click on key ${key} and it will show up on display`, () => {
        testNumericKeyClick(key);
      });
    }
  });

  const testNumericKeyClick = (keyName) => {
    render(<App />);
    const key = screen.getByRole('button', {name: keyName});
    userEvent.click(key);
    const display = screen.getByRole('textbox', { id: "display"});
    expect(display).toHaveValue(keyName);
  }

});
