import React, { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      const newValue = calculateOperation(currentValue, inputValue, operation);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateOperation = (prevValue, nextValue, op) => {
    switch (op) {
      case "+":
        return prevValue + nextValue;
      case "-":
        return prevValue - nextValue;
      case "*":
        return prevValue * nextValue;
      case "/":
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (prevValue != null && operation) {
      const newValue = calculateOperation(prevValue, inputValue, operation);
      setDisplay(String(newValue));
      setPrevValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="keypad">
        <button onClick={() => inputDigit(7)}>7</button>
        <button onClick={() => inputDigit(8)}>8</button>
        <button onClick={() => inputDigit(9)}>9</button>
        <button onClick={() => performOperation("/")}>/</button>

        <button onClick={() => inputDigit(4)}>4</button>
        <button onClick={() => inputDigit(5)}>5</button>
        <button onClick={() => inputDigit(6)}>6</button>
        <button onClick={() => performOperation("*")}>*</button>

        <button onClick={() => inputDigit(1)}>1</button>
        <button onClick={() => inputDigit(2)}>2</button>
        <button onClick={() => inputDigit(3)}>3</button>
        <button onClick={() => performOperation("-")}>-</button>

        <button onClick={() => inputDigit(0)}>0</button>
        <button onClick={inputDecimal}>.</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={() => performOperation("+")}>+</button>

        <button onClick={clearDisplay} className="clear-btn">
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
