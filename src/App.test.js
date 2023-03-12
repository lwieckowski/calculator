import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Calculator display", () => {
  test("is shown and is read-only", () => {
    render(<App />);
    const userInput = "5";
    const display = screen.getByRole("textbox", { id: "display" });
    const currentValue = display.value;
    userEvent.type(display, userInput);
    expect(display).toHaveValue(currentValue);
  });
});

describe("Calculator keypad", () => {
  test("is shown and has all required keys", () => {
    render(<App />);
    const keys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "AC",
      "±",
      "%",
      "÷",
      "x",
      "-",
      "+",
      "=",
      ".",
    ];
    for (const keyName of keys) {
      const key = screen.getByRole("button", { name: keyName });
      expect(key).toBeInTheDocument();
    }
  });
});

describe("Calculator functionality", () => {
  test("user can enter numbers as sequences up to 8 digits long", () => {
    render(<App />);
    const keys = ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (const keyName of keys) {
      const key = screen.getByRole("button", { name: keyName });
      userEvent.click(key);
    }
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("0.123456");
  });

  test("user can enter only one decimal separator", () => {
    render(<App />);
    const key = screen.getByRole("button", { name: "." });
    userEvent.click(key);
    userEvent.click(key);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("0.");
  });

  test("user can enter only one 0 if the display is empty", () => {
    render(<App />);
    const key = screen.getByRole("button", { name: "0" });
    userEvent.click(key);
    userEvent.click(key);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("0");
  });

  describe("when the display is empty", () => {
    const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (const key of keys) {
      test(`user can click on key ${key} and ${key} will be displayed`, () => {
        testInputKeyWithEmptyDisplay(key, key);
      });
    }

    test(`user can click on key . and 0. will be displayed`, () => {
      testInputKeyWithEmptyDisplay(".", "0.");
    });
  });

  test("clicking keys 2 + 2 = results in 4", () => {
    render(<App />);
    pressKeys(["2", "+", "2", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("4");
  });

  test("clicking keys 10 - 4 = results in 6", () => {
    render(<App />);
    pressKeys(["1", "0", "-", "4", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("6");
  });

  test("clicking keys 10 ÷ 2 = results in 5", () => {
    render(<App />);
    pressKeys(["1", "0", "÷", "2", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("5");
  });

  test("clicking keys 5 ÷ 0 = results in Infinity", () => {
    render(<App />);
    pressKeys(["5", "÷", "0", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("Infinity");
  });

  test("clicking 5 ÷ 7 = results in 0.71428571 (rounded)", () => {
    render(<App />);
    pressKeys(["5", "÷", "7", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("0.71428571");
  });

  test("clicking keys 3 x 5 = results in 15", () => {
    render(<App />);
    pressKeys(["3", "x", "5", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("15");
  });

  test("multiplying 12345678 by 12345678 is 1.5241577e+14", () => {
    render(<App />);
    pressKeys(["1", "2", "3", "4", "5", "6", "7", "8", "x"]);
    pressKeys(["1", "2", "3", "4", "5", "6", "7", "8", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("1.5241577e+14");
  });

  test("clicking keys 1 2 + 9 - 1 x 1 0 ÷ 2 0 + results in 100", () => {
    render(<App />);
    pressKeys(["1", "2", "+", "9", "-", "1", "x", "1", "0", "÷", "2", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("100");
  });

  test("clicking keys 5 + + + results in 5", () => {
    render(<App />);
    pressKeys(["5", "+", "+", "+"]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("5");
  });

  test("clicking keys 5 = = = results in 5", () => {
    render(<App />);
    pressKeys(["5", "=", "=", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("5");
  });

  test("clicking keys 5 + = + results in 5", () => {
    render(<App />);
    pressKeys(["5", "+", "=", "+"]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("5");
  });

  test("clicking keys 5 + 5 + results in 10", () => {
    render(<App />);
    pressKeys(["5", "+", "5", "+"]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("10");
  });

  test("clicking keys 5 + 5 = + results in 10", () => {
    render(<App />);
    pressKeys(["5", "+", "5", "=", "+"]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("10");
  });

  test("clicking keys 5 + 5 % results in 0.25", () => {
    render(<App />);
    pressKeys(["5", "+", "5", "%"]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("0.25");
  });

  test("clicking keys 5 + 5 % = results in 0.25", () => {
    render(<App />);
    pressKeys(["5", "+", "5", "%", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("5.25");
  });

  test("clicking keys 5 + 5 ± = results in 0", () => {
    render(<App />);
    pressKeys(["5", "+", "5", "±", "="]);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue("0");
  });

  const testInputKeyWithEmptyDisplay = (keyName, expectedDisplay) => {
    render(<App />);
    const key = screen.getByRole("button", { name: keyName });
    userEvent.click(key);
    const display = screen.getByRole("textbox", { id: "display" });
    expect(display).toHaveValue(expectedDisplay);
  };

  const pressKeys = (keys) => {
    keys.forEach((key) =>
      userEvent.click(screen.getByRole("button", { name: key }))
    );
  };
});
