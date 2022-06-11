const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers button");
const operators = document.querySelectorAll(".operators button");
const equals = document.querySelector(".equals");

const value = [];

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
    num1 = parseInt(num1);
    num2 = parseInt(num2);

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
        if (display.textContent === "0") {
            display.textContent = "";
        }

        if (value.length === 1) {
            value.length = 0
            display.textContent = "";
        }
        
        display.textContent += number.textContent;
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        value.push(display.textContent);
        value.push(operator.textContent)
        display.textContent = "0";
    })
});

equals.addEventListener('click', () => {
    let result = 0;
    value.push(display.textContent);
    display.textContent = "";
    for (let i = 1; i < value.length; i += 2) {
        result += operate(value[i], value[(i - 1)], value[(i + 1)]);
    }
    
    value.length = 0;
    value.push(result);
    display.textContent = result;
})