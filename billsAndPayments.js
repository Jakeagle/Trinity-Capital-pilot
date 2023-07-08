'use strict';

import { displayBills, profiles } from './app.js';

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

export const week = 1000 * 7;
export const biWeek = 1000 * 14;
export const month = 1000 * 30;

console.log(week);

mainApp.style.display = 'none';

/**********************************************Functions***********************************************/

const login = function () {
  pin = parseInt(inputPin.value);
  currentProfile = profiles.find(profile => profile.pin === pin);

  for (const account of currentProfile.accounts) {
    if (account.type === 'Checking') {
      currentAccount = account;
      break;
    }
  }

  signOnSection.style.display = 'none';
  mainApp.style.display = 'block';
};

const setTime = function (interval) {
  if (chosenSelect === billFrequency) {
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

const setTransaction = function (acc, time) {
  billAmount = parseInt(billInput.value);
  paymentAmount = parseInt(paymentInput.value);
  let totalValue;
  let truncTime = time / 1000;
  let newBill;
  let newPayment;

  if (chosenSelect === billFrequency) {
    const newBillFunc = function () {
      newBill = acc.bills['bill'] = [];
      acc.bills.push(newBill);
      console.log(acc.bills);
    };
    newBillFunc();

    totalValue = (billAmount * time) / 1000;
    console.log(totalValue);
    for (let i = 0; i < time / 1000; i++) {
      acc.bills.bill.push(-totalValue / truncTime);
      console.log(newBill);
      console.log(acc);
    }

    chosenSelect === '';
  } else if (chosenSelect === paymentFrequency) {
    const newPayFunc = function () {
      newPayment = acc.payments['payment'] = [];
      acc.payments.push(newPayment);
    };
    newPayFunc();

    totalValue = (paymentAmount * time) / 1000;
    console.log(totalValue);
    for (let i = 0; i < time / 1000; i++) {
      acc.payments.payment.push(totalValue / truncTime);
      console.log(newBill);
      console.log(acc);
    }
    chosenSelect === '';
  }
  localStorage.setItem('profiles', JSON.stringify(profiles));

  console.log(acc.newBill, acc.newPay);
};

/**********************************************Event Listeners***********************************************/

loginBTN.addEventListener('click', function () {
  login();
});

billFrequency.addEventListener('change', function (event) {
  const selectedOption = event.target.selectedOptions[0];
  billInterval = selectedOption.value;
  //console.log(billInterval);
  chosenSelect = billFrequency;
});
billsBTN.addEventListener('click', function () {
  setTime(billInterval);
  billInput.value = '';
  console.log('clicked');
});

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
