const screenSize = 12;
const maximumNumber = 10**screenSize-1;
let numOne = null;
let operator = null;
let numTwo = null;

function sendInputToCalculator(input) {
    if (input === "=") {
        handleOperate();
    } else if (input === "C") {
        handleClear();
    } else if (input === ".") {
        handleDecimal();
    } else if (input === "+") {
        handleAdd();
    } else if (input === "-") {
        handleSubtract();
    } else if (input === "*") {
        handleMultiply();
    } else if (input === "/") {
        handleDivide();
    } else if (/^[0-9]$/.test(input)) {
        handleInteger(Number(input))
    } else {
        throw new Error("Invalid Calculator Input");
    }
}

function handleOperate() {
    console.log("Operate =");
}

function handleClear() {
    console.log("Clear C");
}

function handleDecimal() {
    console.log("Decimal .");
}

function handleAdd() {
    console.log("Add +");
}

function handleSubtract() {
    console.log("Subtract -");
}

function handleMultiply() {
    console.log("Multiply *");
}

function handleDivide() {
    console.log("Divide /");
}

function handleInteger(inputInt) {
    if (inputInt < 0 || inputInt > 9) {
        throw new Error("Invalid Input Integer")
    }

    if (numOne === null) {
        numOne = inputInt;
    } else if (operator === null) {
        numOne *= 10;
        numOne += inputInt;
    } else if (numTwo === null) {
        numTwo = inputInt;
    } else {
        numTwo *= 10;
        numTwo += inputInt;
    }
}

// Testing
// testSendInputToCalculator();
testHandleInteger();

function testHandleInteger() {
    console.log({numOne, operator, numTwo});
    handleInteger(1);
    console.log({numOne, operator, numTwo});
    handleInteger(2);
    console.log({numOne, operator, numTwo});
    handleInteger(3);
    console.log({numOne, operator, numTwo});
    operator = "+";
    console.log({numOne, operator, numTwo});
    handleInteger(4);
    console.log({numOne, operator, numTwo});
    handleInteger(5);
    console.log({numOne, operator, numTwo});
    handleInteger(6);
    console.log({numOne, operator, numTwo});
}

function testSendInputToCalculator() {
    sendInputToCalculator('=');
    sendInputToCalculator('C');
    sendInputToCalculator('.');
    sendInputToCalculator('+');
    sendInputToCalculator('-');
    sendInputToCalculator('*');
    sendInputToCalculator('/');
    sendInputToCalculator('0');
    sendInputToCalculator('1');
    sendInputToCalculator('2');
    sendInputToCalculator('3');
    sendInputToCalculator('4');
    sendInputToCalculator('5');
    sendInputToCalculator('6');
    sendInputToCalculator('7');
    sendInputToCalculator('8');
    sendInputToCalculator('9');
    try {
        sendInputToCalculator('23');
    } catch (error) {
        console.log('23 is invalid input');
    }
}