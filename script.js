'use strict';

//example account
const profile1 = {
  memberName: 'Jakob Ferguson',
  sex: 'male',
  numberOfAccounts: 3,
};
const account1 = {
  accountHolder: 'Jakob Ferguson',
  transactions: [550, 1200, -200, 25, 25, 155],
  accountType: 'Checking',
  accountNumber: 4585120945465872,
  pin: 4564,
};

const account2 = {
  accountHolder: 'Shanea Kelly',
  transactions: [550, 1200, -200, 25, 25, 155],
  accountType: 'Checking',
  accountNumber: 4585680971024512,
  pin: 1231,
};

const accounts = [account1, account2];

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.accountHolder
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

//SignOn

let currentAccount, timer;

const signOnText = document.querySelector('.signOntext');
const loginUser = document.querySelector('.login__input--user');
const loginPIN = document.querySelector('.login__input--pin');
const loginButton = document.querySelector('.login__btn');
const formDiv = document.querySelector(`.formDiv`);
const mainApp = document.querySelector(`.app`);

mainApp.style.opacity = 0;

loginButton.addEventListener('click', function (e) {
  currentAccount = accounts.find(acc => acc.username === loginUser.value);
  console.log(currentAccount);

  if (currentAccount?.pin === +loginPIN.value) {
    signOnText.textContent = `Welcome Back ${
      currentAccount.accountHolder.split(' ')[0]
    }`;
    formDiv.style.display = 'none';
    mainApp.style.opacity = 100;
  }
});
