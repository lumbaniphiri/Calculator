document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "0";
    let previousInput = "";
    let operator = "";
    let operatorClicked = false;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (button.classList.contains("operator")) {
                handleOperator(value);
            } else if (button.classList.contains("function")) {
                handleFunction(value);
            } else {
                handleNumber(value);
            }
        });
    });

    function handleNumber(value) {
        if (operatorClicked) {
            currentInput = value; // Start fresh after operator click
            operatorClicked = false;
        } else {
            currentInput = currentInput === "0" ? value : currentInput + value;
        }
        updateDisplay(currentInput);
    }

    function handleOperator(value) {
        if (currentInput !== "") {
            if (previousInput !== "") {
                calculate(); // Compute before setting new operator
            }
            operator = value;
            previousInput = currentInput;
            operatorClicked = true;
        }
    }

    function handleFunction(value) {
        if (value === "AC") {
            resetCalculator();
        } else if (value === "±" && currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay(currentInput);
        } else if (value === "%" && currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        }
    }

    function calculate() {
        if (previousInput && currentInput) {
            let result;
            const num1 = parseFloat(previousInput);
            const num2 = parseFloat(currentInput);

            switch (operator) {
                case "÷":
                    result = num1 / num2;
                    break;
                case "×":
                    result = num1 * num2;
                    break;
                case "−":
                    result = num1 - num2;
                    break;
                case "+":
                    result = num1 + num2;
                    break;
                default:
                    return;
            }

            currentInput = result.toString().slice(0, 10); // Limit output length
            previousInput = "";
            operator = "";
            updateDisplay(currentInput);
        }
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    function resetCalculator() {
        currentInput = "0";
        previousInput = "";
        operator = "";
        updateDisplay(currentInput);
    }

    document.querySelector(".equal").addEventListener("click", calculate);
});