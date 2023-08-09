'use strict';

import { profiles } from './app.js';
import { transactionsPush } from './app.js';

/**************************************************Variables ***********************************************/

const mainForm = $('.depositForm');

const name = $('.nameInput');

const amount = $('.amountInput');

const date = $('.dateInput');

const wordedAmount = $('.wordedAmountInput');

const signature = $('.sigInput');

const submit = $('.submitBtn');

const mainApp = $('.mainApp');

const signOnSection = $('.signOnSection');

const inputPIN = $('.login__input--pin--bp');

const inputBTN = $('.login__btn--bp');

let currentProfile;

mainApp.css('display', 'none');

/******************************************************Event listeners **************************************/
submit.click(function (e) {
  e.preventDefault();
  checkAll(currentProfile);
});

inputBTN.click(function () {
  let PIN = parseInt(inputPIN.val());

  //Matches pin to profiles and logs in.
  currentProfile = profiles.find(profile => profile.pin === PIN);
  mainApp.css('display', 'block');
  signOnSection.css('display', 'none');
  //loops through accounts in currentProfile
});

/********************************************************Functions *****************************************/

const checkAll = function () {
  let dateComplete = false;
  const userDate = new Date(date.val());
  const currentDate = new Date();
  let nameComplete = false;
  let prfUser = name.val();
  let userSig = signature.val();
  let sigComplete = false;
  let amountComplete = false;
  let userAmount = amount.val();

  console.log(userDate);
  console.log(currentDate);

  if (userDate > currentDate) {
    alert('Cannot use a date in the future. Please Try Again');
  } else if (userDate <= currentDate) {
    dateComplete = true;
  }

  if (prfUser !== currentProfile.memberName) {
    alert('You must enter the name on your account');
  } else if (prfUser === currentProfile.memberName) {
    nameComplete = true;
  }

  currentProfile.sig = currentProfile.memberName
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');

  console.log(currentProfile.sig);

  if (userSig !== currentProfile.sig) {
    alert(
      'Your signature is the first and last initial of the name on your account'
    );
  } else if (userSig === currentProfile.sig) {
    sigComplete = true;
  }
  if (userAmount > 10000) {
    alert('The Maximum deposit amount per day is $10000');
  } else if (userAmount <= 10000) {
    amountComplete = true;
  }

  if (nameComplete && sigComplete && dateComplete && amountComplete) {
    loanAdd();
  }
};

const loanAdd = function () {
  console.log('Ran');

  let userLoan = parseInt(amount.val());
  currentProfile.accounts[0].transactions.push(userLoan);
  currentProfile.accounts[0].movementsDates.push(new Date().toISOString());
  transactionsPush();
  console.log('complete', userLoan);
  alert(' Succesfull');
  //send user back to main page
  location.replace('app.html');
};
