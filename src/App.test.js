import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe('user can see a display', () => {
  
  test('showing the current number entered or the last result', () => {
    render(<App />);
    const currentValue = '00000001';
    const display = screen.getByRole('textbox', { id: "display"});
    fireEvent.change(display, {'target': {'value': currentValue}});
    expect(display).toBeInTheDocument();
    expect(display).toHaveValue(currentValue);
  });

  test('that is read only', () => {
    render(<App />);
    const displayValue = '12345678';
    const userInput = '5';
    const display = screen.getByRole('textbox', { id: "display"});
    fireEvent.change(display, {'target': {'value': displayValue}});
    userEvent.type(display, userInput);
    expect(display).toHaveValue(displayValue);
  });

});
