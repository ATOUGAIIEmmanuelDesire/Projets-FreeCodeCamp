// Variables de mémoire pour l'opération : "firstNumber operator secondNumber"
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Sélections du DOM
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const backspaceButton = document.getElementById('backspace');

// 1. Fonctions mathématiques de base
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "Erreur : L'univers explose !" : a / b;

// 2. Fonction centrale d'évaluation
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

// 3. Gestion de l'affichage des chiffres
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        resetDisplay();
    }
    display.textContent += number;
}

function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}

// 4. Gestion des opérateurs
operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.dataset-operator));
});

function setOperator(operator) {
    if (currentOperator !== null) evaluateCalcul();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

// 5. Gestion du bouton Égal (=)
equalsButton.addEventListener('click', evaluateCalcul);

function evaluateCalcul() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    
    let result = operate(currentOperator, firstNumber, secondNumber);
    
    // Arrondir si le résultat est un décimal trop long
    if (typeof result === 'number') {
        result = Math.round(result * 1000) / 1000;
    }
    
    display.textContent = result;
    firstNumber = result;
    currentOperator = null;
}

// 6. Bouton CLEAR
clearButton.addEventListener('click', clearCalculator);

function clearCalculator() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
}

// Bonus : Bouton décimal (.) et Backspace
decimalButton.addEventListener('click', () => {
    if (shouldResetDisplay) resetDisplay();
    if (!display.textContent.includes('.')) display.textContent += '.';
});

backspaceButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') display.textContent = '0';
});