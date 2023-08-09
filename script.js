'use strict';

const mainApp = document.querySelector('.app');

if (mainApp) mainApp.style.display = 'none';

/***************************************************Objects*********************************************************/

const jfAccount1 = {
  id: 1,
  accountHolder: 'Jakob Ferguson',
  currency: 'USD',
  locale: 'en-US',
  transactions: [550, 1200, -200, 25, 25, 155, 1200, -300],
  bills: [],
  payments: [],
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
  bills: [],
  payments: [],
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

const djAccount2 = {
  id: 4,
  accountHolder: 'Darlene Jones',
  currency: 'USD',
  locale: 'en-US',
  transactions: [450, 1900, -100, 780, 55, 150, 10, -1000],
  accountType: 'Savings',
  accountNumber: '1247885477085708',

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
      accountNumberA: '1247885477086903',
      routingNumber: 141257185,
      currency: 'USD',
      locale: 'en-US',
    },
    {
      ...djAccount2,
      type: 'Savings',
      accountNumberA: '1247885477085708',
      routingNumber: 141257185,
      currency: 'USD',
      locale: 'en-US',
    },
  ],
};

/**************************************** JSON Variables **********************************************/

let profilesJsonRetrieve = localStorage.getItem('profiles');
if (!profilesJsonRetrieve) {
  //Sets up profiles to be set to local storage
  const profilesRaw = [profile1, profile2];
  //Sets up profiles as JSON
  const profilesJson = JSON.stringify(profilesRaw);
  //Pushes profiles to Local Storage
  localStorage.setItem('profiles', profilesJson);
  //Pulls profiles out of LS for use
  profilesJsonRetrieve = localStorage.getItem('profiles');
}

//Exports profiles for use in other scripts
export const profiles = JSON.parse(profilesJsonRetrieve);
// log accounts to see if it is an array of objects

/******************************************Variables ***************************************************/

let currentAccount;
let currentProfile;
let currentTime;

//Currency codes for formatting
const currencyCodeMap = {
  840: 'USD',
  978: 'EUR',
  // add more currency codes here as needed
};

const signOnForm = document.querySelector('signOnForm');
const signOnText = document.querySelector('.signOntext');
const loginButton = document.querySelector('.login__btn');
const formDiv = document.querySelector('.formDiv');

const lastUpdated = document.querySelector('.updateDate');
const transActionsDate = document.querySelector('.transactions__date');
const balanceValue = document.querySelector('.balance__value');
const balanceLabel = document.querySelector('.balance__label');
const accNumSwitch = document.querySelector('.form__input--user--switch');
const accPinSwitch = document.querySelector('.form__input--pin--switch');
const accBtnSwitch = document.querySelector('.form__btn--switch');
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

//Used for formatting dates
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};

/*****************************************Event Listeners ******************************************/

//login event listener (used to login to the app)
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
      mainApp.style.display = 'block';
      mainApp.style.opacity = 100;

      if (currentAccount) {
        if (currentAccount.accountType === 'Checking') {
          console.log('Running');
          //Add currentAccount here
          // Update the UI with the first account's information
          updateUI(currentAccount);
          //Starts loop function that displays the current Accounts bills
          displayBills();
          //Starts loop function that displays the current Accounts paychecks
          displayPayments();
        }

        //Displays the "Current Balanace for "x" string
        balanceLabel.textContent = `Current balance for: #${currentAccount.accountNumber.slice(
          -4
        )}`;

        //Displays the "As of" portion with the current date
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
    //The value for the account you want to switch too
    let targetAccount = accNumSwitch.value;
    //Variable that matches the above with the matching account number
    let accountToSwitch = currentProfile.accounts.find(
      //Matches the last for of the account with the targetAccount entry
      account => account.accountNumber.slice(-4) === targetAccount
    );

    if (accountToSwitch) {
      //Updates UI for current balance with switched account
      balanceLabel.textContent = `Current balance for: #${accountToSwitch.accountNumber.slice(
        -4
      )}`;
      //sets current account to the switched account
      currentAccount = accountToSwitch;
      //empties text field
      accNumSwitch.value = '';
      //empties text field
      accPinSwitch.value = '';
      //Updates main site with switched account
      updateUI(accountToSwitch);

      //Updates to the current time
      updateTime();
      //Updates the as of field
      balanceDate.textContent = `As of ${new Intl.DateTimeFormat(
        currentProfile.locale,
        options
      ).format(currentTime)}`;

      //Variable for the loan section
      const loanBox = document.querySelector('.operation--loan');
      //checks for savings accounr

      //takes away loans if savings
      loanBox.style.display = 'none';
      //checks for Checking

      //Shows loan box
      loanBox.style.display = 'inline';
    }
  });
}

//requesting loans

//checks if button exists
if (requestLoanbtn) {
  requestLoanbtn.addEventListener('click', function (e) {
    //prevents default action
    e.preventDefault();

    //Declares the amount as the user entered amount.
    const amount = Math.floor(loanAmount.value);

    //Loops through the accounts
    for (const account of currentProfile.accounts) {
      //checks if the account type is a checking account
      if (account.type === 'Checking') {
        //sets current account to the checking account
        currentAccount = account;
        //checks to see if the amount is greater than 0 and greater than 10% of the last loan
        if (
          amount > 0 &&
          currentAccount.transactions.some(mov => mov >= amount * 0.1)
        ) {
          //pushes loan to the transactions array
          currentAccount.transactions.push(amount);

          //Creates a new date for the new transaction
          currentAccount.movementsDates.push(new Date().toISOString());

          //Pushes new data to local storage
          transactionsPush();
          //updates UI with the new value
          updateUI(currentAccount);
        }
        //clears the input text
        loanAmount.value = '';
      }
    }
  });
}

//Donating money
if (donateBtn) {
  donateBtn.addEventListener('click', function (e) {
    e.preventDefault();
    //How much a user donates
    let donationAmount = Number(donateAmount.value);
    //User Pin
    const pin = parseInt(donatePin.value);
    //Checks account and pushes donation
    if (pin === currentProfile.pin) {
      currentAccount.transactions.push(-donationAmount);

      // Add loan date

      currentAccount.movementsDates.push(new Date().toISOString());

      //Updates local storage
      transactionsPush();
      //Update UI
      updateUI(currentAccount);

      donatePin.value = '';
      donateAmount.value = '';
    }
  });
}

/********************************************Functions *********************************************/
if (mainApp) {
  mainApp.style.opacity = 0;
}

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

//This function updates local storage with any new data (Mainly transactions)
export const transactionsPush = function () {
  localStorage.setItem('profiles', JSON.stringify(profiles));
};

//Displays Currently Logged in profile's accounts sorted in order of checking first, then in order of most recently created.
const displayAccounts = function (currentAccount) {
  const accountContainer = document.querySelector('.accountContainer');
  accountContainer.innerHTML = '';

  //Shows no accounts if there are no accounts int the current profile
  if (currentProfile.accounts.length === 0) {
    const html = `
      <div class="row">
        <p>No accounts found.</p>
      </div>
    `;
    accountContainer.insertAdjacentHTML('afterend', html);
    return;
  }

  //Sort the accounts by type (checking first) and creation date
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

  //Formats the date and display accounts
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

  //selects the transactions HTML element
  const transactionContainer = document.querySelector('.transactions');
  transactionContainer.innerHTML = '';

  //Variable set for the transactions themselves

  movs = currentAccount.transactions;

  //A loop that runs through each transaction in the current account object
  movs.forEach(function (mov, i) {
    //ternerary to determine whether a transaction is a deposit or withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    let date;

    //Sets the date for each transaction according to the date set in the current Account object

    //Sets up the date variable for the transactions
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

//Displays all of the bills a user has set up
export const displayBills = function () {
  console.log(currentAccount.accountType);
  //Simulated time for bills to appear
  let interval;
  //How much the bill actually is
  let amount;
  const transactionContainer = document.querySelector('.transactions');
  if (transactionContainer) {
    transactionContainer.innerHTML = '';
  }

  //Runs through each bill object in the bills array
  if (currentAccount.bills) {
    for (let i = 0; i < currentAccount.bills.length; i++) {
      //Sets interval to the value set in the current bill object
      interval = currentAccount.bills[i].frequency;
      //Sets amount to the value set in the current bill object
      amount = currentAccount.bills[i].amount;

      //Displays the bills using the amount, every interval set above

      setInterval(function () {
        //Pushes amount to the transactions array
        currentProfile.accounts[0].transactions.push(amount);
        //creates a new date for the transaction above
        currentProfile.accounts[0].movementsDates.push(
          new Date().toISOString()
        );

        //Updates Local Storage with new data
        transactionsPush();

        //Displays new data on the webpage
        updateUI(currentAccount);
      }, interval);

      console.log(currentAccount.accountType);
      updateUI(currentAccount);
      return;
    }
  }
};

//Displays all of the payments a user has set up
export const displayPayments = function () {
  console.log(currentAccount.accountType);
  //Simulated time for bills to appear
  let interval;
  //How much the bill actually is
  let amount;
  const transactionContainer = document.querySelector('.transactions');
  if (transactionContainer) {
    transactionContainer.innerHTML = '';
  }

  //Runs through each bill object in the bills array
  if (currentAccount.payments) {
    for (let i = 0; i < currentAccount.payments.length; i++) {
      //Sets interval to the value set in the current bill object
      interval = currentAccount.payments[i].frequency;
      //Sets amount to the value set in the current bill object
      amount = currentAccount.payments[i].amount;

      //Displays the bills using the amount, every interval set above

      setInterval(function () {
        //Pushes amount to the transactions array
        currentProfile.accounts[0].transactions.push(amount);
        //creates a new date for the transaction above
        currentProfile.accounts[0].movementsDates.push(
          new Date().toISOString()
        );

        //Updates Local Storage with new data
        transactionsPush();

        //Displays new data on the webpage
        updateUI(currentAccount);
      }, interval);

      console.log(currentAccount.accountType);
      updateUI(currentAccount);
      return;
    }
  }
};

//formats the transactions dates to the users locale
export const formatMovementDate = function (date, locale) {
  //international time format based on the date given in this fuction
  return new Intl.DateTimeFormat(locale).format(date);
};
//formats currency based on user locale
function formatCur(value, currency, locale) {
  //Sets currency based on locale currency code. (Defaults to USD if no locale can be found)
  const currencyCode = currencyCodeMap[currency] || 'USD';
  //Sets style and code, and formats the transaction
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
}

//Displays the current balance based on the transactions array
export const displayBalance = function (acc) {
  //calculates the balance based on the transaction array
  acc.balance = acc.transactions.reduce((acc, mov) => acc + mov, 0);
  //displays balance
  balanceValue.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//Updates the webpage UI with all of the needed data
export const updateUI = function (acc) {
  //Displays the Transactions data
  displayTransactions(acc);
  //Displays the balance with correct data
  displayBalance(acc);
  //Displays the users accounts
  displayAccounts(acc);
};

const accountCheck = function (type) {};
