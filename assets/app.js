    

// Начало задачи
    const mathObj = {
        sum: (a, b) => a + b,                                   //Сложение
        sub: (a, b) => a - b,                                   //Вычитание
        mult:(a, b) => a * b,                                   //Умножение 'a' на 'b'
        div: (a, b) => a / b,                                   //Деление 'a' на 'b'
        rem: (a, b) => a%b,                                     //Остаток от деления 'a' на 'b'
        pow: (a, b) => Math.pow(a, b),                          //Возведение 'a' в степень 'b'
        fact:(a, b) => (b > 1)?(b * mathObj.fact(a, b-1)):1,    //Факториал числа 'b'
        '': () => screen.innerHTML = 'No Data'                    //Если не указано действие ('+','-' и т.п.)
    }
/* Функция калькулятор. Принимает три параметра: firstNumber - первое число, 
    operation - действие(все возможные действия переыислены как методы в mathObj)
    secondNumber - второе число */
    const calculate = (firstNumber = 0, operation = 'sum', secondNumber = 0) => {

        if (mathObj.hasOwnProperty(operation.toLowerCase()) && !Number.isNaN(+firstNumber) && !Number.isNaN(+secondNumber)){  // Валидация чисел и действия
            
            return mathObj[operation.toLowerCase()](+firstNumber, +secondNumber)                     // Математическая операция подсчета через методы в mathObj
        }
        return 'Error'                                                                               // Если не введен первый (firstNumber) либо второй (operation) параметр
    }
// Конец задачи

// Unit test for calculate and mathObj
    (function (){

        console.assert(calculate(2,'sum',3) === 5, "TEST: calculate(2,'sum',3)");
        console.assert(calculate(5,'sub',2) === 3, "TEST: calculate(5,'div',2)");
        console.assert(calculate(2,'mult',2) === 4, "TEST: calculate(2,'mult',2)");
        console.assert(calculate(10,'div',2) === 5, "TEST: calculate(10,'div',2)");
        console.assert(calculate(11,'rem',2) === 1, "TEST: calculate(11,'rem',2)");
        console.assert(calculate(2,'pow',3) === 8, "TEST: calculate(2,'pow',3)");
        console.assert(calculate(0,'fact',3) === 6, "TEST: calculate(0,'fact',3)");
        console.assert(calculate(2,'Err',2) === 'Error', "TEST: calculate(2,'Err',2)");

    })()
// Пример работы функции calculate

    console.log(calculate(4, 'sum', 5));

// Дополнение - Визуальная логика и ввод данных

    let firstNumber = 0;            // Первое число
    let secondNumber = 0;           // Второе число
    let operation = '';             // Действие
    // Поиск в DOM строк для отображения введенных данных и ответа
    let screen = document.querySelector('#viewer');                 // Строка ответа и вводимых данных
    let firstView = document.querySelector('#firstArgum');          // Строка первой переменной, заполняется только после выбора операции
    let operationView = document.querySelector('#operation');       // Строка операции
    // Поиск в DOM кнопок
    document.querySelectorAll('.num').forEach((item) => item.addEventListener('click', render));            // Выбор цифр и точка в массив. Присвоение каждому элементу Event на клик
    document.querySelectorAll('.act').forEach((item) => item.addEventListener('click', action));            // Выбор действий в массив, кроме факториала и равно. Присвоение каждому элементу Event на клик
    document.querySelectorAll('#equals, #fact').forEach((item) => item.addEventListener('click', equals));  // Выбор факторила и равно в массив. Присвоение каждому элементу Event на клик
    document.querySelector('#clear').addEventListener('click', clear);                                      // Выбор очистки С. Присвоение элементу Event на клик
    
    // Функция для отрисовки цифр в div #viewer
    function render() {
        if (this.value === '.' && screen.innerHTML.includes('.')) return 0    // Валидация точки, возможен ввод только одной точки
        screen.innerHTML += this.value;
    }

    // Функция очистки отображенных цифр и обнуления переменных, используется при нажатии "С" и "="
    function clear() {
        firstNumber = 0;
        secondNumber = 0;
        operation = '';
        if(this.value === 'clear')screen.innerHTML = '';          // Только при нажатии кнопки "С" - для обнуления ответа или ошибки
        firstView.innerHTML = '';
        operationView.innerHTML = '';

    }
    // Функция действий, кроме "=" и "!"
    function action() {
        
            if (!screen.innerHTML && !firstView.innerHTML) return 0;     // Нельзя указать действие если не введено первое число
            if (firstView.innerHTML && operationView.innerHTML) {        // Для возможности замены действия если вдруг передумали, проверяется была ли введена первая переменная и предыдущее действие
                operationView.innerHTML = this.innerHTML;
                operation = this.value;
                return 0;
            }
            firstNumber = +screen.innerHTML;                              // Запись первой переменной
            operation = this.value;                                       // Запись операции
            firstView.innerHTML = firstNumber;                            // Отображение первого числа
            operationView.innerHTML = this.innerHTML;                     // Отображение действия
            screen.innerHTML = '';                                        // Очистка поля для ввода второго числа
    }
    // Функция для "=" и "!"
    function equals() {
        secondNumber = +screen.innerHTML;                                       // Запись второй переменной
        if(this.value =='fact') operation = 'fact'                              // Только при нажатии "!", потому что для расчета факториала нужна только одна переменная, сразу выдает ответ
        screen.innerHTML = calculate(firstNumber, operation, secondNumber);     // Расчет и вывод ответа
        clear()                                                                 // очистка переменных и операции, ответ остается в поле для дальнейших операций
    }