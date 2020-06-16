const buttonsEvent = document.querySelector("#container");
//Constant declaration for the buttons event of clicking the button, targets container class

const calObj = {
    screen: '0',
    inputNum1: null,
    inputNum2: null,
    waitInputNum2: false,
    operator: null,
    solution: null,
    tempNum1: "",
    tempNum2: "",
};
//Object to store inputs throughout the calculation process
function display(screenReadout) {
    calObj.screen = screenReadout;
    document.getElementById("screen").textContent = screenReadout;
}

function addition(num1, num2) {
    return num1 + num2;
}

function subtraction(num1, num2) {
    return num1 - num2;
}

function multiplication(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, oper) {
    let solution = oper(num1, num2);
    calObj.inputNum1 = solution;
    calObj.tempNum2=""
    calObj.solution = solution;
    display(solution);
    
}

function resetCalc() {
    calObj.screen = '0';
    calObj.inputNum1 = null;
    calObj.inputNum2 = null;
    calObj.waitInputNum2 = false;
    calObj.operator = null;
    calObj.solution = null;
    calObj.tempNum1= "",
    calObj.tempNum2= "",
    display(calObj.screen)
    
}
//Functions for carrying out he calculations and resetting the calculator
document.getElementById("screen").textContent = calObj.screen;


buttonsEvent.addEventListener('click', function(e) {
    if ((e.target.classList.contains('numbers')) && calObj.operator === null) {
        calObj.tempNum1+= ""+ e.target.textContent;
        calObj.inputNum1 = Math.floor(calObj.tempNum1)
        display(calObj.inputNum1);
     } else if ((e.target.classList.contains('numbers')) && calObj.operator !== null && calObj.inputNum1 !== null) {
        calObj.tempNum2+= ""+ e.target.textContent;
        calObj.inputNum2 = Math.floor(calObj.tempNum2);
        display(calObj.inputNum2);
        calObj.waitInputNum2 = false;
    } else if ((e.target.classList.contains('operation'))) {
        if (calObj.inputNum1 === null) {
            return;
        } else if (calObj.inputNum1 !== null && calObj.inputNum2 !== null && calObj.waitInputNum2 === false) {
            let operator = e.target.id;
            operate(calObj.inputNum1, calObj.inputNum2, calObj.operator);
            switch (operator) {
                case "addition":
                    calObj.operator = addition;
                    break;
                case "subtraction":
                    calObj.operator = subtraction;
                    break;
                case "multiplication":
                    calObj.operator = multiplication;
                    break;
                case "division":
                    calObj.operator = division;
                    break;
            }
            
            calObj.waitInputNum2 = true;
        } else {
            let operator = e.target.id;
            switch (operator) {
                case "addition":
                    calObj.operator = addition;
                    break;
                case "subtraction":
                    calObj.operator = subtraction;
                    break;
                case "multiplication":
                    calObj.operator = multiplication;
                    break;
                case "division":
                    calObj.operator = division;
                    break;
            }
        }
    } else if ((e.target.classList.contains('equals')) && calObj.inputNum1 !== null && calObj.inputNum2 !== null && calObj.operator !== null) {
        operate(calObj.inputNum1, calObj.inputNum2, calObj.operator)
        calObj.waitInputNum2 = true;

    } else if (e.target.classList.contains('clear')) {
        resetCalc();
    }
});
//The 'click' event for inputting digits into the calculator and choosing the operation and carrying out the calculation.