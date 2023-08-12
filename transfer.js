'use strict';

//import profiles object from App.js
import { profiles } from './script.js';
import { transactionsPush } from './script.js';

/************************************************Variables*************************************************/

const inputPIN = document.querySelector('.login__input--pin--transfer');

const btnPIN = document.querySelector('.login__btn--transfer');

const accountListFrom = document.querySelector('.accountsListFrom');

const accountListToo = document.querySelector('.accountsListToo');

const signOnSection = document.querySelector('.signOnSection');

const amountInput = document.querySelector('.form__input--amount--transfer');

const btnAmount = document.querySelector('.form__btn--transfer');

const mainApp = document.querySelector('.mainSection');

const backBTN = document.querySelector('.backBtn');

let accountSend;

let accountRecieve;

let currentProfile;

let amount;

/************************************************Functions*************************************************/

mainApp.style.display = 'none';
//Logs into the page
const login = function () {
  mainApp.style.display = 'block';
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
  console.log(-amount, amount);
  //Loops through all of the accounts
  currentProfile.accounts.forEach(account => {
    //Checks to see if the account numbers are the same for the user selected account and the accounts in the profile
    if (accountSend === account.accountNumber) {
      if (amount > account.balanceTotal) {
        console.log(account.balanceTotal);
        alert('insufficient funds');
        console.log(amount);
        return;
      } else if (amount <= account.balanceTotal) {
        console.log(account.balanceTotal);
        //removes amount from send account
        account.transactions.push(-amount);
        //add new date for transaction
        account.movementsDates.push(new Date().toISOString());
        currentProfile.accounts.forEach(account => {
          if (accountRecieve === account.accountNumber) {
            console.log(account);
            //pushes amount to receiving account
            account.transactions.push(amount);
            //adds new date for transaction
            account.movementsDates.push(new Date().toISOString());
          }
        });
      }
      console.log(accountSend, accountRecieve);
      if (accountSend === accountRecieve) {
        alert('Cant use the same account');
        amountInput.value = '';
      } else if (amount < 0) {
        alert('Cannot use negative amount');
        console.log(amount);
      } else if (amount > 0) {
        transPush();
      }
    }
  });

  //Updates local Storage with new transactions
};

const transPush = function () {
  console.log(parseInt(amountInput.value));
  transactionsPush();
  amountInput.value = '';
  //Tells user of succesful transaction
  alert('Transfer Succesfull');
  //send user back to main page
  location.replace('app.html');
};

/************************************************Event Listeners*************************************************/

backBTN.addEventListener('click', function () {
  location.replace('index.html');
});

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
