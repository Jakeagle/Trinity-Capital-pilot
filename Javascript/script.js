'use strict';

/********************************************Modal control*************************************/
const mainApp = document.querySelector('.mainApp');
const loginBox = document.querySelector('.signOnBox');
const mobileLoginBox = document.querySelector('.mobileSignOnBox');
const billsModal = document.querySelector('.billsAndPaymentsModal');
const billsModalBTN = document.querySelector('.billsModalBTN');
const closeBillModal = document.querySelector('.closeBills');

billsModalBTN.addEventListener('click', function () {
  billsModal.showModal();
});

closeBillModal.addEventListener('click', function () {
  billsModal.close();
});

window.screen.width <= 1300 ? mobileLoginBox.showModal() : loginBox.showModal();

if (mainApp) mainApp.style.display = 'none';

/***********************************************************Server Listeners**********************************************/

export const socket = io('https://trinitycapitaltestserver-2.azurewebsites.net');

console.log('User connected:' + socket.id);
socket.on('checkingAccountUpdate', updatedChecking => {
  // Access the checkingAccount data from updatedUserProfile
  const checkingAccount = updatedChecking;
  console.log(checkingAccount, 'This is working');

  // Call your existing updateUI function with the updated checking account data
  displayBalance(checkingAccount);
  displayTransactions(checkingAccount);
});

socket.on('donationChecking', updatedDonCheck => {
  const checkingAccount = updatedDonCheck;
  console.log(checkingAccount, 'This is working');

  // Call your existing updateUI function with the updated checking account data
  displayBalance(checkingAccount);
  displayTransactions(checkingAccount);
});

socket.on('donationSaving', updatedDonSav => {
  const savingsAccount = updatedDonSav;
  console.log(savingsAccount, 'This is working');

  // Call your existing updateUI function with the updated checking account data
  displayBalance(savingsAccount);
  displayTransactions(savingsAccount);
});

/***********************************************************Server Functions**********************************************/
const testServerProfiles = 'https://trinitycapitaltestserver-2.azurewebsites.net/profiles';

const loanURL = 'https://trinitycapitaltestserver-2.azurewebsites.net/loans';

const donationURL = 'https://trinitycapitaltestserver-2.azurewebsites.net/donations';

const donationSavingsURL = 'https://trinitycapitaltestserver-2.azurewebsites.net/donationsSavings';

// Store the received profiles in a global variable or a state variable if you're using a front-end framework
let Profiles = [];

export async function getInfoProfiles() {
  try {
    const res = await fetch(testServerProfiles, {
      method: 'GET',
    });

    if (res.ok) {
      Profiles = await res.json();

      // Log the initial profiles
      console.log(Profiles);

      // Now, listen for updates from the Socket.IO server
      socket.on('profiles', updatedProfiles => {
        // Update your UI with the updated profiles
        console.log('Received updated profiles:', updatedProfiles);

        // For example, you can update a list of profiles
        // Assuming you have a function to update the UI
      });
      return Profiles;
    } else {
      console.error('Failed to fetch profiles:', res.statusText);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function loanPush() {
  const res = await fetch(loanURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parcel: [currentProfile, parseInt(loanAmount.value)],
    }),
  });
  console.log(currentProfile);
}

async function donationPush() {
  const res = await fetch(donationURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parcel: [currentAccount, parseInt(donateAmount.value)],
    }),
  });
}

async function donationPushSavings() {
  const res = await fetch(donationSavingsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parcel: [currentAccount, parseInt(donateAmount.value)],
    }),
  });
}

export let profiles = await getInfoProfiles();
console.log(profiles);

/******************************************Variables ***************************************************/

export let currentAccount;
export let currentProfile;
let currentTime;
let accPIN;
let accUser;
//Currency codes for formatting
const currencyCodeMap = {
  840: 'USD',
  978: 'EUR',
  // add more currency codes here as needed
};

const closeT1 = document.querySelector('.closeBtn');
const signOnForm = document.querySelector('signOnForm');
const signOnText = document.querySelector('.signOntext');
const loginButton = document.querySelector('.login__btn');
const mobileLoginButton = document.querySelector('.mobileLoginBtn');

const formDiv = document.querySelector('.formDiv');
export let balance;

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
const balanceDate = document.querySelector(`.dateText`);
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
    const loginPIN = document.querySelector('.login__input--pin');
    const loginText = document.querySelector('.login__input--user');
    loginFunc(loginPIN, loginText, loginBox);
    // Get the value of the input field
  });
}

if (mobileLoginButton) {
  mobileLoginButton.addEventListener('click', function (event) {
    event.preventDefault();
    const mobileLoginPIN = document.querySelector('.mobile_login__input--pin');
    const mobileLoginText = document.querySelector(
      '.mobile_login__input--user'
    );
    loginFunc(mobileLoginPIN, mobileLoginText, mobileLoginBox);
    console.log('running');
  });
}

const loginFunc = function (PIN, user, screen) {
  const pin = parseInt(PIN.value);

  for (let i = 0; i < profiles.length; i++) {
    console.log(profiles[i].userName);
    if (user.value === profiles[i].userName && pin === profiles[i].pin) {
      currentProfile = profiles[i];
    } else if (user.value === profiles[i].userName && pin !== profiles[i].pin) {
      alert('incorrect PIN');
    } else if (user.value !== profiles[i].userName && pin === profiles[i].pin) {
      alert('incorrect Username');
    }
  }

  if (currentProfile) {
    console.log(currentProfile);
    // Retrieve saved transactions for current account

    screen.close();

    const signOnSection = document.querySelector('.signOnSection');

    signOnSection.style.display = 'none';
    console.log(currentProfile);

    // Display welcome message
    const signOnText = document.querySelector('.signOnText');
    signOnText.textContent = currentProfile.memberName.split(' ')[0];

    // Hide login form and display main app
    const formDiv = document.querySelector('.formDiv');
    const mainApp = document.querySelector('.mainApp');

    mainApp.style.display = 'flex';
    mainApp.style.opacity = 100;

    currentAccount = currentProfile.checkingAccount;
    if (currentAccount) {
      console.log(currentAccount);
      //Add currentAccount here
      // Update the UI with the first account's information
      updateUI(currentAccount);
      //Starts loop function that displays the current Accounts bills

      //Displays the "Current Balanace for "x" string
      // balanceLabel.textContent = `Current balance for: #${currentAccount.accountNumber.slice(
      //   -4
      // )}`;

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
  }
};

//Switch accounts
if (accBtnSwitch) {
  accBtnSwitch.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(currentAccount);
    //The value for the account you want to switch too
    let targetAccount = accNumSwitch.value;
    accPIN = parseInt(accPinSwitch.value);
    //Variable that matches the above with the matching account number
    let accountToSwitch;

    if (accPIN === currentProfile.pin) {
      if (
        targetAccount === currentProfile.checkingAccount.accountNumber.slice(-4)
      ) {
        currentAccount = currentProfile.checkingAccount;
        balanceLabel.textContent = `Current Balance for: #${currentAccount.accountNumber.slice(
          -4
        )}`;
        updateUI(currentAccount);
      } else if (
        targetAccount === currentProfile.savingsAccount.accountNumber.slice(-4)
      ) {
        currentAccount = currentProfile.savingsAccount;
        balanceLabel.textContent = `Current Balance for: #${currentAccount.accountNumber.slice(
          -4
        )}`;
        updateUI(currentAccount);
      }
    } else {
      alert('Incorrect PIN');
    }

    //Variable for the loan section
    const loanBox = document.querySelector('.operation--loan');
    //checks for savings accounr

    if (currentAccount.accountType === 'Savings') {
      loanBox.style.display = 'none';
    }
    //takes away loans if savings
    else if (currentAccount.accountType === 'Checking') {
      loanBox.style.display = 'inline';
    }

    accNumSwitch.value = '';
    accPinSwitch.value = '';
  });
}

//requesting loans

//checks if button exists
if (requestLoanbtn) {
  requestLoanbtn.addEventListener('click', function (e) {
    //prevents default action
    e.preventDefault();

    loanPush();

    loanAmount.value = '';

    //Declares the amount as the user entered amount.
  });
}

//Donating money
if (donateBtn) {
  donateBtn.addEventListener('click', function (e) {
    e.preventDefault();
    //How much a user donates

    if (currentAccount.accountType === 'Checking') {
      donationPush();
    } else if (currentAccount.accountType === 'Savings') {
      donationPushSavings();
    }

    donatePin.value = '';
    donateAmount.value = '';
  });
}

/********************************************Functions *********************************************/
if (mainApp) {
  mainApp.style.opacity = 0;
}

const createUsername = function (prfs) {
  for (let i = 0; i < prfs.length; i++) {
    console.log(prfs[i].memberName);
    prfs[i].userName = prfs[i].memberName
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  }
};
createUsername(profiles);

//createUsername(profiles);
//updates current time
const updateTime = function () {
  currentTime = new Date();
};

//This function updates local storage with any new data (Mainly transactions)

//Displays Currently Logged in profile's accounts sorted in order of checking first, then in order of most recently created.
const displayAccounts = function (currentAccount) {
  const accountContainer = document.querySelector('.accountContainer');
  accountContainer.innerHTML = '';

  //Shows no accounts if there are no accounts int the current profile

  //Sort the accounts by type (checking first) and creation date

  let balance = formatCur(
    currentProfile.locale,

    currentProfile.currency
  );

  let lastTransactionDate = new Date(
    currentProfile.checkingAccount.movementsDates[
      currentProfile.checkingAccount.movementsDates.length - 1
    ]
  ).toLocaleDateString(currentProfile.locale);

  let lastTransactionDateSavings = new Date(
    currentProfile.savingsAccount.movementsDates[
      currentProfile.savingsAccount.movementsDates.length - 1
    ]
  ).toLocaleDateString(currentProfile.locale);

  const html = [
    `
        <div class="row accountsRow">
          <div class="col accountType">${
            currentProfile.checkingAccount.accountType
          }</div>
          <div class="col accountNumber">${currentProfile.checkingAccount.accountNumber.slice(
            -4
          )}</div>
          <div class="col updateDate">${lastTransactionDate}</div>
        </div>
      
      <div class="row accountsRow">
        <div class="col accountType">${
          currentProfile.savingsAccount.accountType
        }</div>
        <div class="col accountNumber">${currentProfile.savingsAccount.accountNumber.slice(
          -4
        )}</div>
        <div class="col updateDate">${lastTransactionDateSavings}</div>
      </div>
      `,
  ];

  accountContainer.insertAdjacentHTML('beforeEnd', html);
};

//Display Transactions
export const displayTransactions = function (currentAccount) {
  let movs;

  //selects the transactions HTML element
  const transactionContainer = document.querySelector('.transactionsColumn');
  transactionContainer.innerHTML = '';

  //Variable set for the transactions themselves

  movs = currentAccount.transactions;

  //A loop that runs through each transaction in the current account object
  movs.forEach(function (mov, i) {
    //ternerary to determine whether a transaction is a deposit or withdrawal

    let date;

    //Sets the date for each transaction according to the date set in the current Account object

    //Sets up the date variable for the transactions
    date = new Date(currentAccount.movementsDates[i]);

    //displays date next to transactions
    const displayDate = formatMovementDate(date, currentAccount.locale);
    //Formats transactions for user locale
    const formattedMov = formatCur(
      mov.amount,
      currentAccount.locale,
      currentAccount.currency
    );
    let transType;
    let transName = mov.Name;

    let movIcon;

    if (mov.Category === 'car-note') {
      movIcon = `<i class="fa-solid fa-car transImg"></i>`;
    }
    if (mov.Category === 'rent') {
      movIcon = `<i class="fa-solid fa-house transImg"></i>`;
    }
    if (mov.Category === 'car-insurance') {
      movIcon = `<i class="fa-solid fa-car-burst transImg"></i>`;
    }
    if (mov.Category === 'home-insurance') {
      movIcon = `<i class="fa-solid fa-house-crack transImg"></i>`;
    }
    if (mov.Category === 'food') {
      movIcon = `<i class="fa-solid fa-utensils transImg"></i>`;
    }
    if (mov.Category === 'electric') {
      movIcon = `<i class="fa-solid fa-bolt transImg"></i>`;
    }

    if (mov.Category === 'gas') {
      movIcon = `<i class="fa-solid fa-fire-flame-simple transImg"></i>`;
    }

    if (mov.Category === 'water') {
      movIcon = `<i class="fa-solid fa-droplet transImg"></i>`;
    }

    if (mov.Category === 'trash-collection') {
      movIcon = `<i class="fa-solid fa-dumpster transImg"></i>`;
    }

    if (mov.Category === 'phone-bill') {
      movIcon = `<i class="fa-solid fa-phone transImg"></i>`;
    }

    if (mov.Category === 'internet') {
      movIcon = `<i class="fa-solid fa-wifi transImg"></i>`;
    }

    if (mov.Category === 'custom-expense') {
      movIcon = `<i class="fa-solid fa-screwdriver-wrench transImg"></i>`;
    }

    if (mov.Category === 'paycheck') {
      movIcon = `<i class="fa-solid fa-dollar-sign transImg dollarSignImg"></i>`;
    }
    //HTML for transactions
    if (mov.amount < 0) {
      transType = 'negTrans';
    } else if (mov.amount > 0) {
      transType = 'posTrans';
    }
    const html = `<div class="transaction row">
                    <div class="transIcon col-4">
                      ${movIcon}
                    </div>
                    <div class="transNameAndDate col">
                      <p class="transName">${transName} (${mov.Category})</p>
                      <p class="transDate">${displayDate}</p>
                    </div>
                    <div class="transAmount col">
                      <p class="transAmountText ${transType}">${formattedMov}</p>
                    </div>
                  </div>`;
    //Inserts HTML with required data
    transactionContainer.insertAdjacentHTML('afterbegin', html);
    displayBillList(currentAccount);
  });
};

export const displayBillList = function (currentAccount) {
  let bills;

  //selects the transactions HTML element
  const billListContainer = document.querySelector('.bills');
  billListContainer.innerHTML = '';

  //Variable set for the transactions themselves

  bills = currentAccount.bills;

  //A loop that runs through each transaction in the current account object
  bills.forEach(function (bill, i) {
    //ternerary to determine whether a transaction is a deposit or withdrawal

    let currentDate;
    let advancedDate;

    //Sets the date for each transaction according to the date set in the current Account object

    //Sets up the date variable for the transactions
    currentDate = new Date();

    if (bill.interval === 'weekly') {
      advancedDate = currentDate.setUTCDate(currentDate.getUTCDate() + 7);
    }

    if (bill.interval === 'bi-weekly') {
      advancedDate = currentDate.setUTCDate(currentDate.getUTCDate() + 14);
    }

    if (bill.interval === 'monthly') {
      advancedDate = currentDate.setUTCDate(currentDate.getUTCDate() + 30);
    }

    if (bill.interval === 'yearly') {
      advancedDate = currentDate.setUTCDate(currentDate.getUTCDate() + 365);
    }

    //displays date next to transactions
    const displayDate = formatMovementDate(advancedDate, currentAccount.locale);
    console.log(displayDate);
    //Formats transactions for user locale
    const formattedMov = formatCur(
      bill.amount,
      currentAccount.locale,
      currentAccount.currency
    );
    let transType;
    let transName = bill.Name;

    let billIcon;

    if (bill.Category === 'car-note') {
      billIcon = `<i class="fa-solid fa-car "></i>`;
    }
    if (bill.Category === 'rent') {
      billIcon = `<i class="fa-solid fa-house "></i>`;
    }
    if (bill.Category === 'car-insurance') {
      billIcon = `<i class="fa-solid fa-car-burst "></i>`;
    }
    if (bill.Category === 'home-insurance') {
      billIcon = `<i class="fa-solid fa-house-crack "></i>`;
    }
    if (bill.Category === 'food') {
      billIcon = `<i class="fa-solid fa-utensils "></i>`;
    }
    if (bill.Category === 'electric') {
      billIcon = `<i class="fa-solid fa-bolt "></i>`;
    }

    if (bill.Category === 'gas') {
      billIcon = `<i class="fa-solid fa-fire-flame-simple "></i>`;
    }

    if (bill.Category === 'water') {
      billIcon = `<i class="fa-solid fa-droplet "></i>`;
    }

    if (bill.Category === 'trash-collection') {
      billIcon = `<i class="fa-solid fa-dumpster "></i>`;
    }

    if (bill.Category === 'phone-bill') {
      billIcon = `<i class="fa-solid fa-phone "></i>`;
    }

    if (bill.Category === 'internet') {
      billIcon = `<i class="fa-solid fa-wifi wifiIcon "></i>`;
    }

    if (bill.Category === 'custom-expense') {
      billIcon = `<i class="fa-solid fa-screwdriver-wrench billListCustom "></i>`;
    }

    if (bill.Category === 'paycheck') {
      billIcon = `<i class="fa-solid fa-dollar-sign  "></i>`;
    }
    //HTML for transactions

    const html = `<div class="billsRow row">
    <div class="icon col-4">
      ${billIcon}
    </div>
    <div class="billName col">
      <p class="billText">${bill.Name}($${bill.amount})</p>
    </div>
    <div class="col billDate">
      <p>Reoccurs: ${displayDate}</p>
    </div>
  </div>`;
    //Inserts HTML with required data
    billListContainer.insertAdjacentHTML('afterbegin', html);
  });
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

  //displays balance
  balanceValue.textContent = formatCur(
    acc.balanceTotal,
    acc.locale,
    acc.currency
  );
};

//Updates the webpage UI with all of the needed data
export const updateUI = function (acc) {
  //Displays the Transactions data
  displayTransactions(acc);
  //Displays the balance with correct data
  displayBalance(acc);
  //Displays the users bill list
  displayBillList(acc);
};
