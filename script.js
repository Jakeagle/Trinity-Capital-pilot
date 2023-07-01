'use strict';

/***************************************************Objects*********************************************************/

const jfAccount1 = {
  id: 1,
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
  id: 2,
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
  id: 3,
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
      created: '12 / 20 / 2001',
    },

    {
      ...jfAccount2,
      type: 'Savings',
      accountNumberA: '3112153745644899',
      routingNumber: 141257185,
      currency: 'USD',
      locale: 'en-US',
      created: '12 / 20 / 2018',
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

/**************************************** JSON Variables **********************************************/

let profilesJsonRetrieve = localStorage.getItem('profiles');
if (!profilesJsonRetrieve) {
  const profilesRaw = [profile1, profile2];
  const profilesJson = JSON.stringify(profilesRaw);
  localStorage.setItem('profiles', profilesJson);
  profilesJsonRetrieve = localStorage.getItem('profiles');
}

const profiles = JSON.parse(profilesJsonRetrieve);
// log accounts to see if it is an array of objects

/******************************************Variables ***************************************************/

let currentAccount;
let currentProfile;
let currentTime;

const currencyCodeMap = {
  840: 'USD',
  978: 'EUR',
  // add more currency codes here as needed
};

const signOnForm = document.querySelector('signOnForm');
const loginUser = document.querySelector(`.login__input--user`);
const loginPIN = document.querySelector('.login__input--pin');
const signOnText = document.querySelector('.signOntext');
const loginButton = document.querySelector('.login__btn');
const formDiv = document.querySelector('.formDiv');
const mainApp = document.querySelector('.app');
const lastUpdated = document.querySelector('.updateDate');
const transActionsDate = document.querySelector('.transactions__date');
const balanceValue = document.querySelector('.balance__value');
const balanceLabel = document.querySelector('.balance__label');
const accNumSwitch = document.querySelector('.form__input--user--switch');
const accPinSwitch = document.querySelector('.form__input--pin--switch');
const accBtnSwitch = document.querySelector('.form__btn--switch');
let listedAccounts = '';
const btnClose = document.querySelector('.form__btn--close');
const userClose = document.querySelector('.form__input--user--close');
const userClosePin = document.querySelector('.form__input--pin--close');
const transactionContainer = document.querySelector('.transactions');
const requestLoanbtn = document.querySelector('.form__btn--loan');
const loanAmount = document.querySelector('.form__input--loan-amount');
const donateBtn = document.querySelector('.form__btn--donate');
const donateAmount = document.querySelector('.form__input--donate--amount');
const donatePin = document.querySelector('.form__input--pin--donate');
const accNumHTML = document.querySelector('.accountNumber');
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

/*****************************************Event Listeners ******************************************/

//login event listener
if (loginButton) {
  loginButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Get the value of the input field
    const loginPIN = document.querySelector('.login__input--pin');
    const pin = parseInt(loginPIN.value);

    // Find the profile with matching PIN
    currentProfile = profiles.find(profile => profile.pin === pin);

    if (currentProfile) {
      // Retrieve saved transactions for current account
      let currentAccount;
      for (const account of currentProfile.accounts) {
        if (account.type === 'Checking') {
          currentAccount = account;
          break;
        }
      }

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

      if (currentAccount) {
        console.log(currentAccount);
        //Add currentAccount here
        // Update the UI with the first account's information

        updateUI(currentAccount);
        balanceLabel.textContent = `Current balance for: #${currentAccount.accountNumber.slice(
          -4
        )}`;
        updateTime();
        balanceDate.textContent = `As of ${new Intl.DateTimeFormat(
          currentProfile.locale,
          options
        ).format(currentTime)}`;
        //Display saved transactions for current account

        displayTransactions(currentAccount);
      } else {
        alert('No checking account found. Please contact customer service.');
      }
    } else {
      alert('Invalid PIN. Please try again.');
    }
  });
}

//Switch accounts
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

//requesting loans
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
          // Add movement
          currentAccount.transactions.push(amount);

          // Add loan date

          currentAccount.movementsDates.push(new Date().toISOString());
          console.log(currentAccount.movementsDates);

          //Update UI
          transactionsPush();
          updateUI(currentAccount);
        }
        loanAmount.value = '';
      }
    }
  });
}

//Donating money

donateBtn.addEventListener('click', function (e) {
  e.preventDefault();
  //How much a user donates
  let donationAmount = Number(donateAmount.value);
  //User Pin
  const pin = parseInt(donatePin.value);
  //Total Balance
  //Sets the current account

  //Sets the saved transactions in local storage

  //Check to see if there are saved transactions and adds the sum accordingly

  //Reduces the amount by the donation amount and updates the UI.
  if (pin === currentProfile.pin) {
    currentAccount.transactions.push(-donationAmount);

    // Add loan date

    currentAccount.movementsDates.push(new Date().toISOString());

    //Update UI

    // console.log(currentAccount.transactions);
    //console.log(currentAccount.movementsDates);
    transactionsPush();
    updateUI(currentAccount);

    donatePin.value = '';
    donateAmount.value = '';
  }
});

/********************************************Functions *********************************************/
mainApp.style.opacity = 0;

//Creates Usernames using the first letters of the first and last name of the user
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

//updates current time
const updateTime = function () {
  currentTime = new Date();
};

//Pushes transactions to profiles objects
const transactionsPush = function () {
  localStorage.setItem('profiles', JSON.stringify(profiles));
};

//Displays Currently Logged in profile's accounts sorted in order of checking first, then in order of most recently created.
const displayAccounts = function (currentAccount) {
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

  //Then format the date and display accounts
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

//Display Transactions
export const displayTransactions = function (currentAccount) {
  let movs;
  console.log(currentAccount);

  //selects the transactions HTML element
  const transactionContainer = document.querySelector('.transactions');
  transactionContainer.innerHTML = '';

  //Variable set for the transactions themselves

  movs = currentAccount.transactions;

  //const movs = currentAccount.transactions;
  console.log(movs);

  //A loop that runs through each transaction in the current account object
  movs.forEach(function (mov, i) {
    //Sets each transaction to local storage

    //ternerary to determine whether a transaction is a deposit or withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    let date;
    let newDates = JSON.parse(
      localStorage.getItem(
        `transactionsDates_${currentAccount.accountHolder} ${currentAccount.accountType}`
      )
    );
    //Sets the date for each transaction according to the date set in the current Account object

    date = new Date(currentAccount.movementsDates[i]);

    //displays date next to transactions
    const displayDate = formatMovementDate(date, currentAccount.locale);
    //Formats transactions for user locale
    const formattedMov = formatCur(
      mov,
      currentAccount.locale,
      currentAccount.currency
    );
    //HTML for transactions
    const html = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${type} col-4">
        <div class="transactionsTypeText"> 
        ${i + 1} ${type}</div>
    </div>
        <div class="transactions__date col-4">${displayDate}</div>
        <div class="transactions__value col-4">${formattedMov}</div>
      </div>
    `;
    //Inserts HTML with required data
    transactionContainer.insertAdjacentHTML('afterbegin', html);
  });
};

//Takes the current transaction date and formats it to mm/dd/yyyy
const formatMovementDate = function (date, locale) {
  // const calcDaysPassed = (date1, date2) =>
  //   Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  // const daysPassed = calcDaysPassed(new Date(), dateStr);

  // if (daysPassed === 0) return 'Today';
  // if (daysPassed === 1) return 'Yesterday';
  // if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};
//formats customer Currency to whatever location they are in
function formatCur(value, currency, locale) {
  const currencyCode = currencyCodeMap[currency] || 'USD'; // default to USD if code not found
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
}

//displays a formatted balance
export const displayBalance = function (acc) {
  acc.balance = acc.transactions.reduce((acc, mov) => acc + mov, 0);

  balanceValue.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//calls display functions to update user UI
const updateUI = function (acc) {
  // Display Transactions
  displayTransactions(acc);

  // Display balance
  displayBalance(acc);

  // Display accounts
  displayAccounts(acc);
};
