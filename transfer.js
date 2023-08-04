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

//Logs into the page
const login = function () {
  //gets the pin from the user typed value;
  let pin = parseInt(inputPIN.value);
  //Checks the profile against the User entered pin
  currentProfile = profiles.find(profile => profile.pin === pin);
  //If succesful, it runs through and sets up the accounts for that profile as selecteable options
  currentProfile.accounts.forEach(account => {
    //sets DOM element for option
    let option = document.createElement('option');
    // use the account number as the identifier
    option.value = account.accountNumber;

    //sets text content for the option
    option.textContent = `${
      account.accountType
    }----------${account.accountNumber.slice(-4)}`;

    //appends content to select box
    accountListFrom.appendChild(option);
  });

  //repeats process from above
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

//Handles math for transfer
const transferFunds = function (accounts) {
  //gets the amount from HTML element
  amount = parseInt(amountInput.value);

  //Loops through all of the accounts
  currentProfile.accounts.forEach(account => {
    //Checks to see if the account numbers are the same for the user selected account and the accounts in the profile
    if (accountSend != account.accountNumber) {
      return;
    } else if ((accountSend = account.accountNumber)) {
      //removes amount from send account
      account.transactions.push(-amount);
      //add new date for transaction
      account.movementsDates.push(new Date().toISOString());
    }
  });

  //Loops through all of the accounts
  currentProfile.accounts.forEach(account => {
    //Checks to see if the account numbers are the same for the user selected account and the accounts in the profile
    console.log(accountRecieve);
    if (accountRecieve != account.accountNumber) {
      return;
    } else if ((accountRecieve = account.accountNumber)) {
      //pushes amount to receiving account
      account.transactions.push(amount);
      //adds new date for transaction
      account.movementsDates.push(new Date().toISOString());
    }
  });

  //Updates local Storage with new transactions
  localStorage.setItem('profiles', JSON.stringify(profiles));

  //Tells user of succesful transaction
  alert('Transfer Succesfull');
  //send user back to main page
  location.replace('index.html');
};

/************************************************Event Listeners*************************************************/

//Button that handles user login
btnPIN.addEventListener('click', function () {
  console.log('Click');
  login();
});

//Handles selecting the from account
accountListFrom.addEventListener('change', function (event) {
  // Get the selected option element
  const selectedOption = event.target.selectedOptions[0];
  // Get the account number from the value property of the selected option
  accountSend = selectedOption.value;
});

//handles selecting too account
accountListToo.addEventListener('change', function (event) {
  // Get the selected option element
  const selectedOption = event.target.selectedOptions[0];
  // Get the account number from the value property of the selected option
  accountRecieve = selectedOption.value;
  console.log(accountRecieve);
});

//handles getting amount
btnAmount.addEventListener('click', function () {
  transferFunds(currentProfile.accounts);
  amountInput.textContent = '';
});
