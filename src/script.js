
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");

let activeInput = num1;
let lastOperation = "+";

num1.addEventListener("focus", function () {
    activeInput = num1;
});

num2.addEventListener("focus", function () {
    activeInput = num2;
});

const numbers = document.querySelectorAll("[data-num]");

numbers.forEach(function (button) {
    button.addEventListener("click", function () {
        const digit = button.dataset.num;

        if (digit === "." &&
            (activeInput.value.includes(".") ||
             activeInput.value.includes(","))) {
            return;
        }

        activeInput.value += digit;
    });
});

function isValid(text) {
    const value = text.trim().replace(",", ".");

    if (value === "") {
        return false;
    }

    let dots = 0;
    let digits = 0;

    for (let i = 0; i < value.length; i++) {
        const c = value[i];

        if (c >= "0" && c <= "9") {
            digits++;
        } else if (c === ".") {
            dots++;

            if (dots > 1) {
                return false;
            }
        } else if (c === "-" && i === 0) {
            continue;
        } else {
            return false;
        }
    }

    return digits > 0 && Number.isFinite(Number(value));
}

function calculate(operation) {
    const first = num1.value.trim();
    const second = num2.value.trim();

    if (first === "" || second === "") {
        result.textContent = "Заповніть обидва поля!";
        return;
    }

    if (!isValid(first) || !isValid(second)) {
        result.textContent = "Неправильні дані!";
        return;
    }

    const a = Number(first.replace(",", "."));
    const b = Number(second.replace(",", "."));

    let answer;

    if (operation === "+") {
        answer = a + b;
    } else if (operation === "-") {
        answer = a - b;
    } else if (operation === "*") {
        answer = a * b;
    } else if (operation === "/") {
        if (b === 0) {
            result.textContent = "На нуль ділити не можна!";
            return;
        }

        answer = a / b;

        if (!Number.isInteger(answer)) {
            answer = Number(answer.toFixed(2));
        }
    }

    if (!Number.isFinite(answer)) {
        result.textContent = "Помилка обчислення!";
        return;
    }

    result.textContent = answer;
}

const operations = document.querySelectorAll(".operation");

operations.forEach(function (button) {
    button.addEventListener("click", function () {
        lastOperation = button.dataset.op;
        calculate(lastOperation);
    });
});

document.getElementById("equal").addEventListener("click", function () {
    calculate(lastOperation);
});

document.getElementById("clear").addEventListener("click", function () {
    num1.value = "";
    num2.value = "";
    result.textContent = "0";
    activeInput = num1;
    lastOperation = "+";
});

document.getElementById("back").addEventListener("click", function () {
    activeInput.value = activeInput.value.slice(0, -1);
});

document.getElementById("sign").addEventListener("click", function () {
    if (activeInput.value.startsWith("-")) {
        activeInput.value = activeInput.value.slice(1);
    } else {
        activeInput.value = "-" + activeInput.value;
    }
});

document.getElementById("switch").addEventListener("click", function () {
    if (activeInput === num1) {
        activeInput = num2;
    } else {
        activeInput = num1;
    }

    activeInput.focus();
});
