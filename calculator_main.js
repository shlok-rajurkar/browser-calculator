function operate(first_num, second_num, operator) {
    if (operator === "+") {
        return add(first_num, second_num);
    } else if (operator === "-") {
        return subtract(first_num, second_num);
    } else if (operator === "*") {
        return multiply(first_num, second_num);
    } else if (operator === "/") {
        return divide(first_num, second_num);
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