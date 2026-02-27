// Memory

let display = "";
let displayItem = ""

let firstNumber = "";
let secondNumber = "";
let operator = "";

let activeNumber = "first";

let cacheFirstNumber = "";
let cacheSecondNumber = "";
let cacheOperator = "";

// Main

main();

function main() {
    addNumberButtonHandlers();
    addOperatorButtonHandlers();
    addFunctionButtonHandlers();
}


// UI 

function updateDisplay(displayString) {
    const displayRegion = document.getElementById("result-display");
    const newDisplayText = document.createElement("p");
    newDisplayText.textContent = displayString;
    while (displayRegion.firstChild != null) {
        displayRegion.firstChild.remove();
    }
    displayRegion.appendChild(newDisplayText);
}
// Logic and Events

function addNumberButtonHandlers() {
    if (display.length >= 10) {
        return;
    }
    const buttonRegion = document.querySelector(".number-buttons-wrapper");

    buttonRegion.addEventListener("click", (event) => {
        let target = event.target;
        if (display.length >= 10 && 
            ((displayItem === "first" && operator === "") || displayItem === "second")) {
            return;
        }
        if (target.classList.contains("number-button")) {

            if (target.id === "decimal") {
                if (display.includes(".")) {
                    return;
                }
            }

            if (activeNumber === "first") {
                console.log(activeNumber);

                if (operator !== "") {
                    firstNumber = "";
                }
                operator = "";
                firstNumber += target.textContent;
                display = firstNumber;
                updateDisplay(display);
                displayItem = "first";
                clearCache();

            } else if (activeNumber === "second") {
                console.log(activeNumber);
                secondNumber += target.textContent;
                display = secondNumber;
                updateDisplay(secondNumber);
                displayItem = "second";
                clearCache();
            }
        }
    })
}

function clearCache() {
    cacheFirstNumber = "";
    cacheSecondNumber = ""
    cacheOperator = ""
}

function clearMemory() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function clearAllStorage() {
    clearCache();
    clearMemory();
}

function cacheIsFull() {
    return cacheFirstNumber != "" 
    && cacheSecondNumber != "" 
    && cacheOperator != "";
}

function memoryIsFull() {
    return firstNumber != ""
    && secondNumber != "" &&
    operator != "";
}

function copyMemoryToCache() {
    cacheFirstNumber = firstNumber;
    cacheSecondNumber = secondNumber;
    cacheOperator = operator;
}

function copyCacheToMemory() {
    firstNumber = cacheFirstNumber;
    secondNumber = cacheSecondNumber;
    operator = cacheOperator;
}

function addOperatorButtonHandlers() {
    const buttonRegion = document.querySelector(".operator-buttons-wrapper");

    buttonRegion.addEventListener("click", (event) => {
        if (firstNumber === "") {
            return;
        }
        let target = event.target;
        if (operator != "") {
            runCurrentOperation();
        }
        operator = target.textContent;
        activeNumber = "second";
    })
}

function addFunctionButtonHandlers() {
    const equalsButton = document.getElementById("equals");
    const allClearButton = document.getElementById("all-clear");

    equalsButton.addEventListener("click", () => {
        if (cacheIsFull()) {
            copyCacheToMemory();
            clearCache();
            let result = operate(firstNumber, secondNumber, operator).toFixed(4);
            if (result == "div 0 error" || result == "internal error") {
                clearAllStorage();
                updateDisplay("");
                displayItem = "";
                return;
            }
            if (
                result > 99999999999999999999999
            ) {
                console.log(result);
                clearAllStorage();
                updateDisplay("inf");
                return;
            }
            updateDisplay(result);
            displayItem = "result";

            firstNumber = result;
            copyMemoryToCache();
            activeNumber = "second";
            secondNumber = "";

        } 
        runCurrentOperation();
        activeNumber = "first";
    })

    allClearButton.addEventListener("click", () => {
        clearAllStorage();
        updateDisplay("");
        displayItem = "";
        activeNumber = "first";
    })
}

function runCurrentOperation() {
    if (memoryIsFull()) {
        let result = operate(firstNumber, secondNumber, operator).toFixed(4);
        if (result == "div 0 error" || result == "internal error") {
            clearAllStorage();
            updateDisplay("");
            displayItem = "";
            return;
        }
        if (
            result > 9999999999999999
        ) {
            console.log(result);
            clearAllStorage();
            updateDisplay("inf");
            return;
        }
        updateDisplay(result);
        displayItem = "result";

        firstNumber = result;
        copyMemoryToCache();
        activeNumber = "second";
        secondNumber = "";
    }
}

// Utils

function operate(a, b, op) {
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "/") {
        return divide(a, b);
    } else {
        console.log("Error: " + first_num + "," + second_num + "," + operator);
        return "internal error";
    }
}

function add(first_num, second_num) {
    return first_num + second_num;
}

function subtract(first_num, second_num) {
    return first_num - second_num;
}

function multiply(first_num, second_num) {
    return first_num * second_num;
}

function divide(first_num, second_num) {
    if (second_num === 0) {
        return "div 0 error"
    } else {
        return first_num / second_num;
    }
}