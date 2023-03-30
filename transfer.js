import { displayBalance } from './script.js';
import { displayTransactions } from './script.js';

('use strict');
const jfAccount1 = {
  accountHolder: 'Jakob Ferguson',
  currency: 'USD',
  locale: 'en-US',
  transactions: [550, 1200, -200, 25, 25, 155, 1200, -300],
  accountType: 'Checking',
  accountNumber: '4585120945465872',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const jfAccount2 = {
  accountHolder: 'Jakob Ferguson',
  currency: 'USD',
  locale: 'en-US',
  transactions: [700, 100, 2100, 25, 25, 155, -300, 500],
  accountType: 'Savings',
  accountNumber: '3112153745644899',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-12T10:51:36.790Z',
  ],
};

const djAccount1 = {
  accountHolder: 'Darlene Jones',
  currency: 'USD',
  locale: 'en-US',
  transactions: [450, 1900, -100, 55, 5, 105, 1000, -500],
  accountType: 'Checking',
  accountNumber: '1247885477086903',

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const profile1 = {
  memberName: 'Jakob Ferguson',
  sex: 'male',
  pin: 4564,
  numberOfAccounts: 3,
  accounts: [
    {
      ...jfAccount1,
      type: 'Checking',
      accountNumberA: '4585120945465872',
      routingNumber: 141257185,
      currency: 'USD',
      locale: 'en-US',
      created: 12 / 20 / 2001,
    },

    {
      ...jfAccount2,
      type: 'Savings',
      accountNumberA: '3112153745644899',
      routingNumber: 141257185,
      currency: 'USD',
      locale: 'en-US',
      created: 12 / 20 / 2018,
    },
  ],
};
const profile2 = {
  memberName: 'Darlene Jones',
  pin: 1231,
  sex: 'female',
  numberOfAccounts: 3,
  accounts: [
    {
      ...djAccount1,
      type: 'Checking',
      accountNumber: '1247885477086903',
      routingNumber: 141257185,
      currency: 'USD',
      locale: 'en-US',
    },
  ],
};

let accountListFrom = document.querySelector('.accountsListFrom');
let accountListTo = document.querySelector('.accountsListTo');
let transferButton = document.querySelector('.form__btn--transfer');
let amount = document.querySelector('.form__input--user--transfer');
let accountFrom = '';
let accountTo = '';
let currentProfile;
let currentAccount;
const signOnSection = document.querySelector('.signOnSection');

const accounts = [jfAccount1, jfAccount2, djAccount1];
const profiles = [profile1, profile2];
const transferPinBtn = document.querySelector('.login__btn--transfer');

transferPinBtn.addEventListener('click', function () {
  const transferPinInput = document.querySelector(
    '.login__input--pin--transfer'
  );
  const transferPin = parseInt(transferPinInput.value);
  currentProfile = profiles.find(profile => profile.pin === transferPin);

  for (let i = 0; i < currentProfile.accounts.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${
      currentProfile.accounts[i].accountType
    }----------${currentProfile.accounts[i].accountNumberA.slice(-4)}`;

    accountListFrom.appendChild(option);
  }
  for (let i = 0; i < currentProfile.accounts.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${
      currentProfile.accounts[i].accountType
    }----------${currentProfile.accounts[i].accountNumberA.slice(-4)}`;

    accountListTo.appendChild(option);
    signOnSection.style.display = 'none';
  }
});

const selectAccountFrom = document.querySelector('.accountsListFrom');
const selectAccountTo = document.querySelector('.accountsListTo');
let selectedAccountNumberFrom = '';
let selectedAccountNumberTo = '';

selectAccountFrom.addEventListener('change', function (event) {
  // Get the selected option element
  const selectedOption = event.target.selectedOptions[0];
  // Get the account number from the value property of the selected option
  selectedAccountNumberFrom = selectedOption.value;
  console.log(selectedAccountNumberFrom);
  return selectedAccountNumberFrom;
});

selectAccountTo.addEventListener('change', function (event) {
  // Get the selected option element
  const selectedOption = event.target.selectedOptions[0];
  // Get the account number from the value property of the selected option
  selectedAccountNumberTo = selectedOption.value;
  console.log(selectedAccountNumberTo);
  return selectedAccountNumberTo;
});

transferButton.addEventListener(
  'click',
  function (accountListFrom, accountListTo) {
    let amount = document.querySelector('.form__input--amount--transfer');
    // Get the account numbers from the select tags
    const fromAccountNumber = accountListFrom.value;
    const toAccountNumber = accountListTo.value;

    // Find the accounts in the accounts array
    const fromAccount = accounts.find(
      account => account.accountNumber === fromAccountNumber
    );
    const toAccount = accounts.find(
      account => account.accountNumber === toAccountNumber
    );

    // Get the transfer amount
    const transferAmount = parseFloat(amount.value);

    // Subtract the transfer amount from the balance of the from account
    fromAccount.balance -= transferAmount;

    // Add the transfer amount to the balance of the to account
    toAccount.balance += transferAmount;

    // Display the updated balances
    displayBalance(fromAccount);
    displayBalance(toAccount);

    // Add the transaction to the transaction arrays of both accounts
    const now = new Date();
    fromAccount.transactions.push(-transferAmount);
    fromAccount.movementsDates.push(now.toISOString());
    toAccount.transactions.push(transferAmount);
    toAccount.movementsDates.push(now.toISOString());

    // Display the updated transactions
    displayTransactions(fromAccount);
    displayTransactions(toAccount);
  }
);
