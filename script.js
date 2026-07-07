const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let expression = "0";

function updateDisplay() {
  display.value = expression;
}

function appendValue(value) {
  if (expression === "0" && value !== ".") {
    expression = value;
    return;
  }

  const operators = ["+", "-", "*", "/", "%"];
  const lastChar = expression[expression.length - 1];

  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1) + value;
    return;
  }

  if (value === ".") {
    const parts = expression.split(/[+\-*/%]/);
    const currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
      return;
    }
  }

  expression += value;
}

function clearAll() {
  expression = "0";
}

function deleteLast() {
  if (expression.length === 1) {
    expression = "0";
    return;
  }

  expression = expression.slice(0, -1);
}

function calculate() {
  try {
    const result = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(result)) {
      expression = "Error";
      return;
    }

    expression = String(result);
  } catch {
    expression = "Error";
  }
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const { value, action } = button.dataset;

  if (action === "clear") {
    clearAll();
  } else if (action === "delete") {
    deleteLast();
  } else if (action === "equals") {
    calculate();
  } else if (value) {
    if (expression === "Error") {
      expression = "0";
    }

    appendValue(value);
  }

  updateDisplay();
});

updateDisplay();
