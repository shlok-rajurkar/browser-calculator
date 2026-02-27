// Memory

let display = "";

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
        if (display.length >= 10) {
            return;
        }
        if (target.classList.contains("number-button")) {

            if (activeNumber === "first") {
                console.log(activeNumber);

                if (operator !== "") {
                    firstNumber = "";
                }
                operator = "";
                firstNumber += target.textContent;
                display = firstNumber;
                updateDisplay(display);
                clearCache();

            } else if (activeNumber === "second") {
                console.log(activeNumber);
                secondNumber += target.textContent;
                display = secondNumber;
                updateDisplay(secondNumber);
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
            let result = operate(firstNumber, secondNumber, operator);
            if (result == "div 0 error" || result == "internal error") {
                clearAllStorage();
                updateDisplay("");
                return;
            }
            updateDisplay(result);

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
        activeNumber = "first";
    })
}

function runCurrentOperation() {
    if (memoryIsFull()) {
        let result = operate(firstNumber, secondNumber, operator);
        if (result == "div 0 error" || result == "internal error") {
            clearAllStorage();
            updateDisplay("");
            return;
        }
        updateDisplay(result);

        firstNumber = result;
        copyMemoryToCache();
        activeNumber = "second";
        secondNumber = "";
    }
}

// Utils

function operate(a, b, op) {
    a = Number.parseInt(a);
    b = Number.parseInt(b);
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "/") {
        return divide(a, b);
    } else {
        console.log("Error: " + a + "," + b + "," + op);
        return "internal error";
    }
}

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
    if (b === 0) {
        return "div 0 error"
    } else {
        return a / b;
    }
}