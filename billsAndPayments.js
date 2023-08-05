'use strict';

import { displayBills, profiles } from './script.js';

/**********************************************Variables***********************************************/

const billFrequency = document.querySelector('.frequencyListBills');
const paymentFrequency = document.querySelector('.frequencyListPayments');
const billInput = document.querySelector('.form__input--amount--bills');
const paymentInput = document.querySelector('.form__input--amount--payments');
const mainApp = document.querySelector('.mainApp');
const inputPin = document.querySelector('.login__input--pin--bp');
const loginBTN = document.querySelector('.login__btn--bp');
const signOnSection = document.querySelector('.signOnSection');
const billsBTN = document.querySelector('.form__btn--bills');
const paymentsBTN = document.querySelector('.form__btn--payments');

export let billInterval;
export let payInterval;
let chosenSelect;
let billAmount;
let paymentAmount;
let currentProfile;
let pin;
let currentAccount;

//These three are the time intervals for the bills and payments.
//They are the days of the week x 1000.
//For the demo, they make seconds to represent days
export const week = 1000 * 7;
export const biWeek = 1000 * 14;
export const month = 1000 * 30;

console.log(week);

mainApp.style.display = 'none';

/**********************************************Functions***********************************************/

//Handles login
const login = function () {
  //Get pin from user input
  pin = parseInt(inputPin.value);
  //Matches pin to profiles and logs in.
  currentProfile = profiles.find(profile => profile.pin === pin);

  //loops through accounts in currentProfile
  for (const account of currentProfile.accounts) {
    //Checks for a checking account
    if (account.type === 'Checking') {
      //Sets current account to that checking account
      currentAccount = account;
      //stops the loop
      break;
    }
  }

  //These two turn off the login and turn on the main page
  signOnSection.style.display = 'none';
  mainApp.style.display = 'block';
};

//Function that sets time interval based on user input

const setTime = function (interval) {
  //Checks which select is being used
  if (chosenSelect === billFrequency) {
    //Checks to see if the selected interval is equal to the select value
    if (interval === 'weekly') {
      //sets interval to the matching number milisecond value seen above
      interval = week;
      //Calls function to set transaction with the set interval
      setTransaction(currentAccount, interval);
      //Checks to see if the selected interval is equal to the select value
    } else if (interval === 'bi-weekly') {
      //sets interval to the matching number milisecond value seen above
      interval = biWeek;
      //Calls function to set transaction with the set interval
      setTransaction(currentAccount, interval);
      //Checks to see if the selected interval is equal to the select value
    } else if (interval === 'monthly') {
      //sets interval to the matching number milisecond value seen above
      interval = month;
      //Calls function to set transaction with the set interval
      setTransaction(currentAccount, interval);
    }
    //Runs the same code as the bill frequency above
  } else if (chosenSelect === paymentFrequency) {
    if (interval === 'weekly') {
      interval = week;

      setTransaction(currentAccount, interval);
    } else if (interval === 'bi-weekly') {
      interval = biWeek;
      setTransaction(currentAccount, interval);
    } else if (interval === 'monthly') {
      interval = month;
      setTransaction(currentAccount, interval);
    }
  }
};

//Sets the bill array and objects up for use
const setTransaction = function (acc, time) {
  //sets the bill and payment amounts
  billAmount = parseInt(billInput.value);
  paymentAmount = parseInt(paymentInput.value);

  //checks if select is bill select
  if (chosenSelect === billFrequency) {
    //Creates the bill object
    const newBillFunc = function () {
      let amount = parseInt(-billInput.value);
      console.log(amount);
      //Creates the new bill object in the bills array with the amiunt and frequency
      let newBill = { amount: amount, frequency: time };
      
      //pushes object to the bills array
      acc.bills.push(newBill);
      console.log(acc.bills);
    };

    //calls function
    newBillFunc(time);

    chosenSelect === '';

    //Same code as above for bills
  } else if (chosenSelect === paymentFrequency) {
    const newPayFunc = function () {
      let amount = parseInt(paymentInput.value);
      console.log(amount);
      let newPayment = { amount: amount, frequency: time };
      
      acc.payments.push(newPayment);
      console.log(acc.payments);
    };
    newPayFunc(time);

    chosenSelect === '';
  }
  //updates local storage with new data
  localStorage.setItem('profiles', JSON.stringify(profiles));
};

/**********************************************Event Listeners***********************************************/

//Handles login
loginBTN.addEventListener('click', function () {
  login();
});

//handles bill frequency
billFrequency.addEventListener('change', function (event) {
  //Declares option as user selected item
  const selectedOption = event.target.selectedOptions[0];
  //sets interval to selected option
  billInterval = selectedOption.value;
  //Sets the chosen select box as the bill box
  chosenSelect = billFrequency;
});
//sets amount for bills
billsBTN.addEventListener('click', function () {
  setTime(billInterval);
  billInput.value = '';
  console.log('clicked');
});

//Same code as bills
paymentFrequency.addEventListener('change', function (event) {
  const selectedOption = event.target.selectedOptions[0];
  payInterval = selectedOption.value;
  //console.log(payInterval);
  chosenSelect = paymentFrequency;
});
paymentsBTN.addEventListener('click', function () {
  setTime(payInterval);
  paymentInput.value = '';
  console.log('clicked');
});
