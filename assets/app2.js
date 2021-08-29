

    const calculate = (firstOperand, secondOperand, operation) => {
        //Check for valid operators (operator must bu one of ['sub', 'mult', 'sum','div'], method "includes" can help you)
        //Check that first and second operand is a numbers (isNaN operator can help you)
        let result = 0;
        if ((operation.includes('sum')||operation.includes('sub')||operation.includes('mult')||operation.includes('div')) && !isNaN(+firstOperand) && !isNaN(+secondOperand)) {
            switch (operation) {
            case 'sum':
            result = firstOperand + secondOperand;
            break;
            case 'sub':
            result = firstOperand - secondOperand;
            break;
            case 'mult':
            result = firstOperand * secondOperand;
            break;
            case 'div':
            result = firstOperand / secondOperand;
            break;
            }
        }
        return result;
        }

    console.log(calculate(4,8,'div'));