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
  
  describe('when display is empty', () => {
    const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    for (const key of keys) {
      test(`user can click on key ${key} and it will show on display`, () => {
        testNumericKeyClick(key);
      });
    }
  });

  test('user can enter numbers as sequences up to 8 digits long', () => {
    render(<App />);
    const keys = ['0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (const keyName of keys) {
      const key = screen.getByRole('button', {name: keyName});
      userEvent.click(key);
    }
    const display = screen.getByRole('textbox', { id: "display"});
    expect(display).toHaveValue('0.123456');
  });

  test('user can enter only one decimal separator', () => {
    render(<App />);
    const key = screen.getByRole('button', {name: '.'});
    userEvent.click(key);
    userEvent.click(key);
    const display = screen.getByRole('textbox', { id: "display"});
    expect(display).toHaveValue('.');
  });

  const testNumericKeyClick = (keyName) => {
    render(<App />);
    const key = screen.getByRole('button', {name: keyName});
    userEvent.click(key);
    const display = screen.getByRole('textbox', { id: "display"});
    expect(display).toHaveValue(keyName);
  }

});
