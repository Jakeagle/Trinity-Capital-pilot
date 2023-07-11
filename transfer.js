'use strict';

//import profiles object from App.js
import { profiles } from './script.js';

/************************************************Variables*************************************************/

const inputPIN = document.querySelector('.login__input--pin--transfer');

const btnPIN = document.querySelector('.login__btn--transfer');

const accountListFrom = document.querySelector('.accountsListFrom');

const accountListToo = document.querySelector('.accountsListToo');

const signOnSection = document.querySelector('.signOnSection');

const amountInput = document.querySelector('.form__input--amount--transfer');

const btnAmount = document.querySelector('.form__btn--transfer');

let accountSend;

let accountRecieve;

let currentProfile;

let amount;

/************************************************Functions*************************************************/

const login = function () {
  let pin = parseInt(inputPIN.value);
  currentProfile = profiles.find(profile => profile.pin === pin);
  console.log(currentProfile.accounts);
  currentProfile.accounts.forEach(account => {
    let option = document.createElement('option');

    option.value = account.accountNumber; // use the account number as the identifier

    option.textContent = `${
      account.accountType
    }----------${account.accountNumber.slice(-4)}`;

    accountListFrom.appendChild(option);
  });

  currentProfile.accounts.forEach(account => {
    let option = document.createElement('option');

    option.value = account.accountNumber; // use the account number as the identifier

    option.textContent = `${
      account.accountType
    }----------${account.accountNumber.slice(-4)}`;

    accountListToo.appendChild(option);

    signOnSection.style.display = 'none';
  });
};

const transferFunds = function (accounts) {
  amount = parseInt(amountInput.value);
  console.log(amount, accountSend, accountRecieve);
  console.log(currentProfile.accounts);

  currentProfile.accounts.forEach(account => {
    console.log(accountSend);
    if (accountSend != account.accountNumber) {
      return;
    } else if ((accountSend = account.accountNumber)) {
      account.transactions.push(-amount);
      account.movementsDates.push(new Date().toISOString());
      console.log(account.transactions);
    }
  });

  currentProfile.accounts.forEach(account => {
    console.log(accountRecieve);
    if (accountRecieve != account.accountNumber) {
      return;
    } else if ((accountRecieve = account.accountNumber)) {
      account.transactions.push(amount);
      account.movementsDates.push(new Date().toISOString());
      console.log(account.transactions);
    }
  });

  localStorage.setItem('profiles', JSON.stringify(profiles));

  alert('Transfer Succesfull');
  location.replace('index.html');
};

//transferFunds();

/************************************************Event Listeners*************************************************/
btnPIN.addEventListener('click', function () {
  console.log('Click');

  login();
});

accountListFrom.addEventListener('change', function (event) {
  // Get the selected option element
  const selectedOption = event.target.selectedOptions[0];
  // Get the account number from the value property of the selected option
  accountSend = selectedOption.value;
  console.log(accountSend);
});

accountListToo.addEventListener('change', function (event) {
  // Get the selected option element
  const selectedOption = event.target.selectedOptions[0];
  // Get the account number from the value property of the selected option
  accountRecieve = selectedOption.value;
  console.log(accountRecieve);
});

btnAmount.addEventListener('click', function () {
  transferFunds(currentProfile.accounts);
  amountInput.textContent = '';
});
