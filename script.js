class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }

    compute() {
        let solution;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous)) return;
        if (isNaN(current))
            this.currentOperand = "";


        switch (this.operation) {
            case "+":
                if (this.currentOperand === "") return;
                solution = previous + current;
                break
            case "-":
                if (this.currentOperand === "") return;
                solution = previous - current;
                break
            case "*":
                if (this.currentOperand === "") return;
                solution = previous * current;
                break
            case "/":
                if (this.currentOperand === "") return;
                solution = previous / current;
                break
            case "^1/2":
                solution = Math.sqrt(previous);
                break
            case "^2":
                solution = Math.pow(previous, 2);
                break
            case "^-1":
                solution = 1 / previous;
                break
            case "%":
                solution = (100 * previous) / current;
                break
            case "^":
                solution = Math.pow(previous, current);
                break
            default:
                return;
        }
        this.currentOperand = solution;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null)
            return `${integerDisplay}.${decimalDigits}`;
        else
            return integerDisplay;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else
            this.previousOperandTextElement.innerText = "";

    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector("[data-equals]");
const ACButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

ACButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})