import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe('Calculator display', () => {
  
  test('shows the current number entered or the last result', () => {
    render(<App />);
    const currentValue = '00000001';
    const display = screen.getByRole('textbox', { id: "display"});
    fireEvent.change(display, {'target': {'value': currentValue}});
    expect(display).toBeInTheDocument();
    expect(display).toHaveValue(currentValue);
  });

  test('is read only', () => {
    render(<App />);
    const displayValue = '12345678';
    const userInput = '5';
    const display = screen.getByRole('textbox', { id: "display"});
    fireEvent.change(display, {'target': {'value': displayValue}});
    userEvent.type(display, userInput);
    expect(display).toHaveValue(displayValue);
  });

});

describe('Calculator keypad', () => {
  
  test('has all required keys', () => {
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

  test('user can click on key 0 and it will show up on display', () => {
    render(<App />);
    const display = screen.getByRole('textbox', { id: "display"});
    const key = screen.getByRole('button', {name: "0"});
    userEvent.click(key);
    expect(display).toHaveValue("0");
  });

});
