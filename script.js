('use strict');

//example account

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

const accounts = [jfAccount1, jfAccount2, djAccount1];
const profiles = [profile1, profile2];

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.memberName
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(profiles);

//SignOn

let currentAccount, timer;

const signOnForm = document.getElementById('signOnForm');
const loginUser = document.querySelector(`.login__input--user`);
const loginPIN = document.getElementById('.login__input--pin');
const signOnText = document.getElementById('.signOntext');
const loginButton = document.querySelector('.login__btn');
const formDiv = document.getElementById('.formDiv');
const mainApp = document.querySelector('.app');
const lastUpdated = document.querySelector('.updateDate');
const transActionsDate = document.querySelector('.transactions__date');

let currentProfile;
let currentTime;

const updateTime = function () {
  currentTime = new Date();
};

const requestLoanbtn = document.querySelector('.form__btn--loan');
const loanAmount = document.querySelector('.form__input--loan-amount');
const accNumHTML = document.querySelector('.accountNumber');

mainApp.style.opacity = 0;
// Listen for form submission

if (loginButton) {
  loginButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Get the value of the input field
    const loginPIN = document.querySelector('.login__input--pin');
    const pin = parseInt(loginPIN.value);

    // Find the profile with matching PIN
    currentProfile = profiles.find(profile => profile.pin === pin);

    if (currentProfile) {
      // Display welcome message
      const signOnText = document.querySelector('.signOntext');
      signOnText.textContent = `Welcome Back ${
        currentProfile.memberName.split(' ')[0]
      }`;

      // Hide login form and display main app
      const formDiv = document.querySelector('.formDiv');
      const mainApp = document.querySelector('.app');
      formDiv.style.display = 'none';
      mainApp.style.opacity = 100;

      // Loop through the user's accounts and display the first account's information
      let currentAccount;
      for (const account of currentProfile.accounts) {
        if (account.type === 'Checking') {
          currentAccount = account;
          balanceLabel.textContent = `Current balance for: #${account.accountNumber.slice(
            -4
          )}`;
          updateTime();

          balanceDate.textContent = `As of ${new Intl.DateTimeFormat(
            currentProfile.locale,
            options
          ).format(currentTime)}`;

          break;
        }
      }
      // Update the UI with the first account's information
      updateUI(currentAccount);
    } else {
      alert('Invalid PIN. Please try again.');
    }
  });
}
const transferPageSwitch = document.querySelector('.transferBox');

const balanceValue = document.querySelector('.balance__value');
const balanceLabel = document.querySelector('.balance__label');

const displayAccounts = function () {
  const accountContainer = document.querySelector('.accountContainer');
  accountContainer.innerHTML = '';

  // add the code here
  if (currentProfile.accounts.length === 0) {
    const html = `
      <div class="row">
        <p>No accounts found.</p>
      </div>
    `;
    accountContainer.insertAdjacentHTML('afterend', html);
    return;
  }

  currentProfile.accounts.sort((a, b) => {
    // First, sort by account type
    if (a.accountType < b.accountType) return -1;
    if (a.accountType > b.accountType) return 1;

    // If account types are the same, sort by creation date
    const aDates = a.movementsDates || [];
    const bDates = b.movementsDates || [];
    if (aDates.length === 0 && bDates.length === 0) return 0;
    if (aDates.length === 0) return -1;
    if (bDates.length === 0) return 1;
    const aDate = new Date(aDates[0]);
    const bDate = new Date(bDates[0]);
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;

    return 0;
  });

  currentProfile.accounts.forEach(function (accnt) {
    let totalMovements = accnt.transactions.reduce(
      (sum, curr) => sum + curr,
      0
    );

    let balance = formatCur(
      currentProfile.locale,

      currentProfile.currency
    );

    let lastTransactionDate = new Date(
      accnt.movementsDates[accnt.movementsDates.length - 1]
    ).toLocaleDateString(currentProfile.locale);

    const html = `
      <div class="row accountsRow">
        <div class="col accountType">${accnt.accountType}</div>
        <div class="col accountNumber">${accnt.accountNumber.slice(-4)}</div>
        <div class="col updateDate">${lastTransactionDate}</div>
      </div>
    `;

    accountContainer.insertAdjacentHTML('beforeEnd', html);
  });
};

const accNumSwitch = document.querySelector('.form__input--user--switch');
const accPinSwitch = document.querySelector('.form__input--pin--switch');
const accBtnSwitch = document.querySelector('.form__btn--switch');
let listedAccounts = '';

if (accBtnSwitch) {
  accBtnSwitch.addEventListener('click', function (e) {
    e.preventDefault();
    let targetAccount = accNumSwitch.value;
    let accountToSwitch = currentProfile.accounts.find(
      account => account.accountNumber.slice(-4) === targetAccount
    );

    if (accountToSwitch) {
      balanceLabel.textContent = `Current balance for: #${accountToSwitch.accountNumber.slice(
        -4
      )}`;
      currentAccount = accountToSwitch;
      accNumSwitch.value = '';
      accPinSwitch.value = '';
      updateUI(accountToSwitch);
      updateTime();
      balanceDate.textContent = `As of ${new Intl.DateTimeFormat(
        currentProfile.locale,
        options
      ).format(currentTime)}`;

      const loanBox = document.querySelector('.operation--loan');
      if (currentAccount.accountType === 'Savings') {
        loanBox.style.display = 'none';
        console.log('savings');
        console.log(currentAccount);
      } else if (currentAccount.accountType === 'Checking') {
        loanBox.style.display = 'inline';
        console.log('checking');
      }

      console.log(currentTime);
    }
  });
}

if (requestLoanbtn) {
  requestLoanbtn.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(loanAmount.value);

    for (const account of currentProfile.accounts) {
      if (account.type === 'Checking') {
        currentAccount = account;
        if (
          amount > 0 &&
          currentAccount.transactions.some(mov => mov >= amount * 0.1)
        ) {
          setTimeout(function () {
            // Add movement
            currentAccount.transactions.push(amount);

            // Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            // Update UI
            updateUI(currentAccount);

            // Reset timer
          });
        }
        loanAmount.value = '';
      }
    }
  });
}

const btnClose = document.querySelector('.form__btn--close');
const userClose = document.querySelector('.form__input--user--close');
const userClosePin = document.querySelector('.form__input--pin--close');
const wholeApp = document.querySelector('.wholeApp');

if (btnClose) {
  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (
      currentAccount &&
      userClose.value === currentAccount.username &&
      +userClosePin.value === currentAccount.pin
    ) {
      mainApp.style.display = 'none';

      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );
      accounts.splice(index, 1);
      currentAccount = accounts[0] || profile1.accounts[0]; // switch to the next account or the first account in the list
      mainApp.style.display = 'inline';
      updateUI(currentAccount);
    }
  });
}

const transactionContainer = document.querySelector('.transactions');

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const currencyCodeMap = {
  840: 'USD',
  978: 'EUR',
  // add more currency codes here as needed
};

function formatCur(value, currency, locale) {
  const currencyCode = currencyCodeMap[currency] || 'USD'; // default to USD if code not found
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
}

const balanceDate = document.querySelector(`.balance__date`);
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};
export const displayBalance = function (acc) {
  acc.balance = acc.transactions.reduce((acc, mov) => acc + mov, 0);
  balanceValue.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//Display Accounts

//Display Transactions
export const displayTransactions = function (acc, sort = false) {
  transactionContainer.innerHTML = '';

  const movs = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="transactions__date">${displayDate}</div>
        <div class="transactions__value">${formattedMov}</div>
      </div>
    `;

    transactionContainer.insertAdjacentHTML('afterbegin', html);
  });
};
const updateUI = function (acc) {
  // Display movements

  displayTransactions(acc);

  // Display balance
  displayBalance(acc);

  // Display accounts
  displayAccounts(acc);
};

