const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers button");
const operators = document.querySelectorAll(".operators button");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

const value = [];
let isOperatorOn = false;
let isResultDisplayed = false;
let isDecimalOn = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (number.textContent === "." && display.textContent.includes(".")) {
            return;
        }

        if (display.textContent === "0" && !(number.textContent === ".")|| display.textContent === "🤨") {
            display.textContent = "";
        }

        if (isOperatorOn || isResultDisplayed) {
            isOperatorOn = false;
            isResultDisplayed = false;
            display.textContent = "";
        }

        display.textContent += number.textContent;
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (isOperatorOn) {
            value.pop();
            value.push(operator.textContent)
            return;
        }

        value.push(display.textContent);
        if (value.length === 3) {
            solveEquation();
            value.push(display.textContent);
        }

        value.push(operator.textContent)
        isOperatorOn = true;
    })
});

equals.addEventListener('click', solveEquation);

function solveEquation() {
    if (value.length < 2) {
        return;
    }

    value.push(display.textContent);
    display.textContent = "";

    if (value[2] === "0" && value[1] === "/") {
        display.textContent = "🤨";
    } else {
        display.textContent = +parseFloat(operate(value[1], value[0], value[2])).toFixed(2);
    }
    
    value.length = 0;
    isResultDisplayed = true;
}

clear.addEventListener('click', () => {
    value.length = 0;
    display.textContent = "0";
    isOperatorOn = false;
})