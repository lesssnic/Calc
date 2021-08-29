    

// Начало задачи
    const mathObj = {
        sum: (a, b) => a + b,                                   //Сложение
        sub: (a, b) => a - b,                                   //Вычитание
        mult:(a, b) => a * b,                                   //Умножение 'a' на 'b'
        div: (a, b) => a / b,                                   //Деление 'a' на 'b'
        rem: (a, b) => a%b,                                     //Остаток от деления 'a' на 'b'
        pow: (a, b) => Math.pow(a, b),                          //Возведение 'a' в степень 'b'
        fact:(a, b) => (b > 1)?(b * mathObj.fact(a, b-1)):1,    //Факториал числа 'b'
        '': () => screen.innerHTML = 'Error'
    }

    const calculate = (firstNumber = 0, operation = 'sum', secondNumber = 0) => {

        if (mathObj.hasOwnProperty(operation.toLowerCase()) && !Number.isNaN(+firstNumber) && !Number.isNaN(+secondNumber)){
            
            return mathObj[operation.toLowerCase()](+firstNumber, +secondNumber)
        }
        return 'Error'
    }
// Конец задачи

    console.log(calculate(4, 'sum', 5));

// Дополнение - Визуальная логика и ввод данных

    let firstNumber = 0;
    let secondNumber = 0;
    let operation = '';
    let screen = document.querySelector('#viewer');
    let firstView = document.querySelector('#firstArgum');
    let operationView = document.querySelector('#operation');

    document.querySelectorAll('.num').forEach((item) => item.addEventListener('click', render));
    document.querySelectorAll('.act').forEach((item) => item.addEventListener('click', action));
    document.querySelectorAll('#equals, #fact').forEach((item) => item.addEventListener('click', equals));
    document.querySelector('#clear').addEventListener('click', clear);
    
    function render() {
        if (this.value === '.' && screen.innerHTML.includes('.')) return 0
        screen.innerHTML += this.value;
    }

    function clear() {
        firstNumber = 0;
        secondNumber = 0;
        operation = '';
        if(this.value === 'clear')screen.innerHTML = '';
        firstView.innerHTML = '';
        operationView.innerHTML = '';

    }

    function action() {
        
        if (!screen.innerHTML && !firstView.innerHTML) return 0;
        if (firstView.innerHTML && operationView.innerHTML) {
            operationView.innerHTML = this.innerHTML;
            operation = this.value;
            return 0;
        }
            firstNumber = +screen.innerHTML;
            operation = this.value;
            firstView.innerHTML = firstNumber;
            operationView.innerHTML = this.innerHTML;
            screen.innerHTML = '';
    }

    function equals() {
        secondNumber = +screen.innerHTML;
        if(this.value =='fact') operation = 'fact'
        screen.innerHTML = calculate(firstNumber, operation, secondNumber);
        clear()
    }