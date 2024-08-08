document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    function updateDisplay(value) {
        display.textContent = value || '0';  // Ensures that '0' is displayed if the value is empty
    }

    function handleNumber(num) {
        currentInput += num;
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '' && op !== '-') return;
        if (previousInput && operator) {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        if (!previousInput || !currentInput || !operator) return;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
        }

        updateDisplay(result);
        previousInput = result.toString();
        currentInput = '';
        operator = '';
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => handleNumber(button.textContent));
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => handleOperator(button.textContent));
    });

    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clear);
});
