let numOne = null;
let operator = null;
let numTwo = null;
let display = "";

createCalculatorInTarget("main")

function createCalculatorInTarget(cssSelector) {
    const container = document.querySelector(cssSelector);
    if (container === null) {
        throw new Error("Calculator Target Container Not Found.");
    }

    const calcContainer = document.createElement("article");
    calcContainer.classList.add("calculator")

    const calcDisplay = document.createElement("p");
    calcDisplay.classList.add("display");
    calcDisplay.textContent = "Hello!";
    calcContainer.appendChild(calcDisplay);

    let buttonSymbols = ["=", ".", "C", "+", "-", "*", "/"];
    for (let i = 0; i < 10; i++) {
        buttonSymbols.push(`${i}`);
    }
    buttonSymbols.forEach(
        (symbol) => {
            const button = document.createElement("button");
            button.classList.add(symbol);
            button.textContent = symbol;
            button.setAttribute("type", "button");
            button.addEventListener("click", (e) => {
                sendInputToCalculator(symbol);
                calcDisplay.textContent = display;
            })
            calcContainer.appendChild(button);
        }
    )


    container.appendChild(calcContainer);
}

function sendInputToCalculator(input) {
    const originalDisplay = display;
    if (input === "=") {
        handleOperate();
    } else if (input === "C") {
        handleClear();
    } else if (input === ".") {
        handleDecimal();
    } else if (/^[-\+\*\/]$/.test(input)) {
        handleOperator(input);
    } else if (/^[0-9]$/.test(input)) {
        handleInteger(Number(input))
    } else {
        throw new Error("Invalid Calculator Input");
    }
    if (originalDisplay === display) {
        display = deriveDisplay();
    }
}

function deriveDisplay(screenSize=12) {
    if (numTwo !== null) {
        return numTwo.padStart(screenSize);
    }
    if (numOne !== null) {
        return numOne.padStart(screenSize);
    }
    return "".padStart(screenSize);
}

function executeOperator(a, op, b) {
    if (typeof a !== 'number' || typeof op !== 'string' || typeof b !== 'number') {
        throw new Error("Cannot Execute Operator");
    }
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            throw new Error("Invalid Operator");
    }
}

function clearCalculator(displayAfterClear = "") {
    numOne = null;
    operator = null;
    numTwo = null;
    display = displayAfterClear;
}

function determineDisplayOutput(num, screenSize=12) {
    if (typeof num !== 'number') {
        return "NaN".padStart(screenSize);
    }
    
    const numString = `${num}`;
    
    if (numString.length > screenSize) {
        if (!numString.includes(".")) {
            return "Overflow".padStart(screenSize);
        }
        return numString.slice(0, screenSize);
    }

    return numString.padStart(screenSize);
}

function handleOperate() {
    if (numOne !== null && operator !== null && numTwo !== null) {
        clearCalculator(determineDisplayOutput(executeOperator(
            Number.parseFloat(numOne),
            operator,
            Number.parseFloat(numTwo)
        )));
    }
}

function handleClear() {
    clearCalculator();
}

function handleDecimal() {
    if (numOne !== null && !numOne.includes('.')) {
        numOne += '.';
        return;
    }

    if (numTwo !== null && !numTwo.includes('.')) {
        numTwo += '.';
        return;
    }
}

function handleOperator(op) {
    if (numOne === null) {
        return;
    }

    if (numTwo !== null) {
        numOne = Number.toString(executeOperator(
            Number.parseFloat(numOne),
            operator,
            Number.parseFloat(numTwo)
        ));
        numTwo = null;
    }
    operator = op;
}

function handleInteger(inputInt, screenSize=12) {
    if (inputInt < 0 || inputInt > 9) {
        throw new Error("Invalid Input Integer")
    }

    if (numOne === null) {
        numOne = `${inputInt}`;
    } else if (operator === null) {
        if (numOne.length < screenSize) {
            numOne += `${inputInt}`;
        }
    } else if (numTwo === null) {
        numTwo = `${inputInt}`;
    } else {
        if (numTwo.length < screenSize) {
            numTwo += `${inputInt}`;
        }
    }
}

// Testing
// testSendInputToCalculator();
// testHandleInteger();
// testOperator("+");
// testMixedOperators(['+', '+', '*', '-', '*', '-', '/', '/']);
// testOperatorOverwrite();
// testDisplayOutput();
// testAddDecimal();
// consoleCalc();

function consoleCalc() {
    let input = prompt("Calc Input:");
    while (input !== "exit") {
        sendInputToCalculator(input);
        console.log({numOne, operator, numTwo});
        console.log(`|${display}|`);
        input = prompt("Calc Input:");
    }
}

function testAddDecimal() {
    console.log({numOne, operator, numTwo});
    sendInputToCalculator('.');
    console.log({numOne, operator, numTwo});
    sendInputToCalculator(3);
    sendInputToCalculator('.');
    sendInputToCalculator(4);
    console.log({numOne, operator, numTwo});
    sendInputToCalculator('.');
    console.log({numOne, operator, numTwo});
    sendInputToCalculator('+');
    console.log({numOne, operator, numTwo});
    sendInputToCalculator(5);
    sendInputToCalculator('.');
    sendInputToCalculator(6);
    console.log({numOne, operator, numTwo});
    sendInputToCalculator('.');
    console.log({numOne, operator, numTwo});
    sendInputToCalculator('=');
    console.log({display});
}

function testDisplayOutput() {
    tests = [
        "awerw",
        "123",
        123,
        123456123456,
        1234561234561,
        -23456123456,
        -234561234561,
        123.456,
        123456.23456,
        123456.234569,
        -23456.23456,
        -23456.234561,
        12345612345.,
        12345612345.1,
        123456123456.,
    ]
    tests.forEach(element => {
        console.log(element);
        console.log(determineDisplayOutput(element));
    });
}

function testOperatorOverwrite() {
    numOne = 5;
    console.log({numOne, operator, numTwo});
    handleOperator('+');
    console.log({numOne, operator, numTwo});
    handleOperator('-');
    console.log({numOne, operator, numTwo});
    handleOperator('*');
    console.log({numOne, operator, numTwo});
    handleOperator('/');
    console.log({numOne, operator, numTwo});
}

function testMixedOperators(operatorList) {
    console.log({numOne, operator, numTwo});
    operatorList.map((op) => {
        handleOperator(op);
        console.log({numOne, operator, numTwo});
        sendInputToCalculator(2);
        console.log({numOne, operator, numTwo});
    })
}

function testOperator(op) {
    console.log({numOne, operator, numTwo})
    handleOperator(op);
    console.log({numOne, operator, numTwo})
    sendInputToCalculator(5);
    console.log({numOne, operator, numTwo})
    handleOperator(op);
    console.log({numOne, operator, numTwo})
    sendInputToCalculator(6);
    console.log({numOne, operator, numTwo})
    handleOperator(op);
    console.log({numOne, operator, numTwo})
}

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