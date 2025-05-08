# Odin Calculator
A four-function calculator with js

https://www.theodinproject.com/lessons/foundations-calculator

## Goals
- Functions
    - Add
    - Subtract
    - Multiply
    - Divide
- Buttons
    - Numbers (0-9)
    - Operate (=)
    - Clear (C)
    - Decimal (.)
- Features
    - {number} {operator} {number} ... {operator} {number}
        - calculate the result of the previous expression if a function operator is called next
    - Round decimal places to stay on display
    - Ensure invalid inputs do not break code
    - Clear removes existing entries
    - Divide by zero doesn't break the calculator
    - last operator entered is used in calculation
    - When a result is displayed, a new digit press should start a new calculation, not append to the last number entered
    - Only allow one decimal place per number
    - Show Overflow Error if the number is too large for the display