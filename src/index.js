import './css/fonts.css';
import './css/styles.css';
import CurrencyConverter from './js/scripts/Converter';
import { currencies, currencyName} from './js/scripts/CurrencyCodes';

// Business Logic

async function returnExchange(amount, from, to) {
    const response = await CurrencyConverter.returnExchange(amount, from, to);
    if (response.result) {
        printElements(response, amount, from, to);
    } else {
        printError(response, amount, from, to);   
    }
}

// UI Logic


const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');

function addOptions(select, values) {
    for (let i = 0; i < values.length; i++) {
        const option = document.createElement('option');
        option.value = values[i];
        option.textContent = currencyName[i];
        select.appendChild(option);
    }
}

addOptions(fromSelect, currencies);
addOptions(toSelect, currencies);

function printElements(response, amount, from, to) {
    document.querySelector('#show-response').innerText = `${to} in ${amount} is ${response.conversion_result.toFixed(2)} in ${from}.`;
}

function printError(error) {
    document.querySelector("#show-response").innerText = `The currency you selected is not real! ${error}`;
}

function handleForm(event) {
    event.preventDefault();
    const amount = document.querySelector('#amount').value;
    const from = document.querySelector('#from').value;
    const to = document.querySelector('#to').value;
    document.querySelector('#amount').value = null;
    document.querySelector('#from').value = null;
    document.querySelector('#to').value = null;
    returnExchange(from, to, amount);
}

window.addEventListener("load", function() {
    document.querySelector('form').addEventListener("submit", handleForm);
});