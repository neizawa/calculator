const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const percent = document.querySelector(".percent");
const audio = new Audio('sounds/vineboom.mp3');

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
        if (display.textContent.length === 10 && !isOperatorOn) {
            alert("You have reached the limit of numbers!")
            return
        }

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

    if (value[2] === "0" && value[1] === "/") {
        play();
        setTimeout(() => {
            display.textContent = "";
            display.textContent = "🤨"
        }, 500);

        function play() {
            audio.play();
        }
    } else {
        display.textContent = "";
        display.textContent = +parseFloat(operate(value[1], value[0], value[2])).toFixed(2);
        if (display.textContent.length > 10) {
            display.textContent = parseFloat(display.textContent).toExponential(3)
        }
    }
    
    value.length = 0;
    isResultDisplayed = true;
}

clear.addEventListener('click', () => {
    value.length = 0;
    display.textContent = "0";
    isOperatorOn = false;
})

del.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "")
        display.textContent = "0"
})

percent.addEventListener('click', () => {
    display.textContent /= 100;
    if (display.textContent.length > 10) {
        display.textContent = parseFloat(display.textContent).toExponential(3)
    }
})