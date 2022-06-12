const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const percent = document.querySelector(".percent");
const audio = new Audio('sounds/vineboom.mp3');
const value = [];

display.textContent = '0'
let isOperatorOn = false;
let isResultDisplayed = false;

clear.addEventListener('click', clearDisplay)
del.addEventListener('click', useDeleteButton)
percent.addEventListener('click', usePercentButton)
equals.addEventListener('click', evaluate);
numbers.forEach(number => {
    number.addEventListener('click', () => addNumber(number.textContent));
});
operators.forEach(operator => {
    operator.addEventListener('click', () => useOperator(operator.textContent))
});
window.addEventListener('keydown', useKeyboard)

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

function addNumber(number) {
    // If there are more than 10 symbols in display, returns in order to not break calculator
    if (display.textContent.length === 10 && !isOperatorOn) {
        alert("You have reached the limit of numbers!")
        return
    }

    // If there is already a decimal, returns 
    if (number === "." && display.textContent.includes(".")) {
        return;
    }

    // If there is only zero or NaN, removes symbol
    if (display.textContent === "0" && !(number === ".")|| display.textContent === "🤨") {
        display.textContent = "";
    }

    // If operator mode is active and result displayed,
    // clears display
    if (isOperatorOn || isResultDisplayed) {
        isOperatorOn = false;
        isResultDisplayed = false;
        display.textContent = "";
    }

    display.textContent += number;
}

function useOperator(operator) {
    // If operator mode is active, returns
    if (isOperatorOn) {
        value.pop();
        value.push(operator)
        return;
    }

    // Solves equation, if there are two numbers
    value.push(display.textContent);
    if (value.length === 3) {
        evaluate();
        value.push(display.textContent);
    }

    value.push(operator)
    isOperatorOn = true;
}

function evaluate() {
    // If there is only one number, returns
    if (value.length < 2) {
        return;
    }

    value.push(display.textContent);

    // You divided by zero, didn't you?
    if (value[2] === "0" && value[1] === "/") {
        play();
        display.textContent = "";
        display.textContent = "🤨"

        function play() {
            audio.play();
        }
    }

    // Displays result, if it is to long then it
    // converts to exponential
    else {
        display.textContent = "";
        display.textContent = Math.round((operate(value[1], value[0], value[2])) * 1000) / 1000;
        if (display.textContent.length > 10) {
            display.textContent = parseFloat(display.textContent).toExponential(3)
        }
    }
    
    value.length = 0;
    isResultDisplayed = true;
}

function clearDisplay() {
    value.length = 0;
    display.textContent = "0";
    isOperatorOn = false;
}

function useDeleteButton() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "")
        display.textContent = "0"
}

function usePercentButton() {
    display.textContent /= 100;
    if (display.textContent.length > 10) {
        display.textContent = parseFloat(display.textContent).toExponential(3)
    }
}

function useKeyboard(e) {
    if(e.key >= 0 && e.key <= 9) addNumber(e.key);
    if(e.key === "*" || e.key === "/" || e.key === "+" || e.key === "-" ) useOperator(e.key);
    if(e.key === "Backspace") useDeleteButton();
    if(e.key === "Enter") evaluate();
    if(e.key === "Escape") clearDisplay();
    if(e.key === "%") usePercentButton();
}