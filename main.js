const keys = document.querySelector(".calc__buttons");
const history = document.querySelector(".history_output");
const display = document.querySelector(".display_output");

let displayValue = "";
let operator = "";
let historyValue = "";

keys.addEventListener("click", (event) => {
  const key = event.target;
  const keyValue = key.textContent;
  const { type } = key.dataset;

  if (type === "number") {
    number = keyValue.replaceAll(",", ".");
    appendNumber(number);
    updateDisplay();
  }

  if (type === "operator") {
    operation = keyValue;

    // if (displayValue === "0" && operation === "-") {
    //   displayValue += operation;
    //   return;
    // }

    chooseOperation(operation);
    updateDisplay();
  }

  if (type === "percent") {
    displayValue = parseFloat(((historyValue * displayValue) / 100).toPrecision(3));
    updateDisplay();
  }

  if (type === "x-square") {
    history.value = `sqr( ${display.value} )`;
    displayValue = Math.pow(display.value, 2);
    updateDisplay();
  }

  if (type === "sqrt") {
    history.value = `√( ${display.value} )`;
    displayValue = Math.sqrt(display.value).toPrecision(10);
    updateDisplay();
  }

  if (type === "invert") {
    displayValue = parseFloat(display.value) * -1;
    updateDisplay();
  }

  // Clear All
  if (type === "clear") {
    clearAll();
  }

  // Clear last
  else if (type === "clear-last") {
    if (history.value !== "") {
      history.value = "";
      historyValue = "";
      operator = "";
      return;
    }
    displayValue = display.value.slice(0, -1);
    display.value = display.value.slice(0, -1);
  }

  // Equals
  if (type === "equals") {
    if (!displayValue && !historyValue) return;
    lastNumb = displayValue;
    displayValue = calculate();
    addHistory();
    display.value = displayValue;
    history.value = historyValue + " " + operator + " " + lastNumb + " =";
    historyValue = displayValue;
    console.log({ displayValue });
    displayValue = "";

    return;
  }
});

function appendNumber(number) {
  if (displayValue.includes(".")) {
    displayValue = displayValue + number.replace(".", "");
  } else if (display.value === "0" && number === ".") {
    displayValue = number.replace(".", "0.");
  } else if (displayValue.length > 9) {
    return;
  } else {
    displayValue = displayValue + number;
  }
}

function updateDisplay() {
  display.value = displayValue;
  if (operator !== "") {
    history.value = historyValue + " " + operation;
  }
}

function chooseOperation(operation) {
  if (displayValue === "") return;
  if (historyValue !== "") {
    displayValue = calculate();
    // displayValue = displayValue.toFixed();
    console.log({ displayValue });
  }
  historyValue = displayValue;
  operator = operation;
  history.value = displayValue + " " + operation;
  displayValue = "";

  // debugger;
}

function calculate() {
  let a = parseFloat(historyValue);
  let b = parseFloat(displayValue);

  console.log({ a });
  console.log({ b });
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "×") return a * b;
  if (operator === "÷") {
    if (a === 0) {
      clearAll();
      return " Nope ";
    }
  }
  return a / b;
}

function clearAll() {
  display.value = "0";
  displayValue = "";
  history.value = "";
  historyValue = "";
  operator = "";
}

function addHistory() {
  const newResult = document.createElement("li");
  newResult.innerText = `${historyValue} ${operator} ${lastNumb} = ${displayValue}`;
  document.querySelector(".calc__history ul").appendChild(newResult);
}

// Navigation
const primaryNav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".menu-toggle");
const calcHistory = document.querySelector(".calc__history");
const historyIcon = document.querySelector(".history-icon");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

historyIcon.addEventListener("click", () => {
  const visibility = calcHistory.getAttribute("data-visible");

  if (visibility === "false") {
    calcHistory.setAttribute("data-visible", true);
    historyIcon.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    calcHistory.setAttribute("data-visible", false);
    historyIcon.setAttribute("aria-expanded", false);
  }
});

// Close element when clicked outside
document.addEventListener("click", (event) => {
  if (!primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }

  if (!calcHistory.contains(event.target) && !historyIcon.contains(event.target)) {
    calcHistory.setAttribute("data-visible", false);
    historyIcon.setAttribute("aria-expanded", false);
  }
});
