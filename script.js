document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    const numberButtons = document.querySelectorAll('.number');
    const decimalButton = document.querySelector('.decimal');
    const operatorButtons = document.querySelectorAll('.operator');
    const calculateButton = document.getElementById('calculate');
    const clearButton = document.getElementById('clear');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const convertedAmountDiv = document.getElementById('converted-amount');

    //-------------------------------------------------------------------//
    const expenseConceptInput = document.getElementById('expense-concept');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const totalAmountSpan = document.getElementById('total-amount');
    const expenseListDiv = document.getElementById('expense-list');

    //------------------------------------------------------------------------------
  
    let currentExpression = ''; // Almacenar la expresión actual
    let totalAmount = 0; // Almacenar el monto total de gastos
  
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentExpression += button.value;
        resultInput.value = currentExpression;
      });
    });
  
    decimalButton.addEventListener('click', () => {
      if (!currentExpression.includes('.')) {
        currentExpression += decimalButton.value;
        resultInput.value = currentExpression;
      }
    });
  
    operatorButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentExpression += button.value;
        resultInput.value = currentExpression;
      });
    });
  
    calculateButton.addEventListener('click', () => {
      try {
        const result = eval(currentExpression); // Evaluar la expresión
        resultInput.value = result;
        currentExpression = ''; // Reiniciar la expresión
    //----------------------------------------------//
    expenseAmountInput.value = result;
    //------------------------------------//
      } catch (error) {
        console.log('Error de cálculo:', error);
      }
    });
  
    clearButton.addEventListener('click', () => {
      currentExpression = '';
      resultInput.value = '0';
    });
  
    const API_KEY = 'c6a8958e117de48737e2dbff'; // Reemplaza 'YOUR-API-KEY' con tu propia clave de API
  
    convertButton.addEventListener('click', () => {
      const amount = parseFloat(amountInput.value);
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
  
      // Realizar la solicitud a la API de ExchangeRate-API
      const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.conversion_result === 'error') {
            throw new Error(data.error-type);
          }
          const convertedAmount = data.conversion_result;
          convertedAmountDiv.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
          console.log('Error al realizar la conversión de divisas:', error);
          convertedAmountDiv.innerText = 'Error al realizar la conversión de divisas.';
        });
    });

    // Manejador de evento para el botón de agregar gasto
    addExpenseButton.addEventListener('click', () => {
        const concept = expenseConceptInput.value;
        const amount = parseFloat(expenseAmountInput.value);

        if (concept && amount) {
            // Crear un elemento de gasto y mostrarlo en la lista de gastos
            const expenseItem = document.createElement('div');
            expenseItem.textContent = `${concept}: ${amount.toFixed(2)}`;
            expenseListDiv.appendChild(expenseItem);

            // Actualizar el monto total de gastos
            totalAmount += amount;
            totalAmountSpan.textContent = totalAmount.toFixed(2);

            // Limpiar los campos de concepto y monto
            expenseConceptInput.value = '';
            expenseAmountInput.value = '';

            // Limpiar el resultado en la caja de monto
            resultInput.value = '';
        }
    });
});

