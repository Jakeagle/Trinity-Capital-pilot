import { profiles } from './script.js';
import { transactionsPush } from './script.js';

/**********************************************Variables****************************************/
let currentProfile;
let targetProfile;
let profileSend;

const mainApp = document.querySelector('.mainApp');
const signOnSection = document.querySelector('.signOnSection');
const loginPIN = document.querySelector('.login__input--pin--bp');
const loginBTN = document.querySelector('.login__btn--bp');
const inputAmount = document.querySelector('.form__input--amount--bills');
const inputMember = document.querySelector('.frequencyListBills');
const inputBTN = document.querySelector('.form__btn--bills');
const backBTN = document.querySelector('.backBtn');

mainApp.style.display = 'none';

/***********************************************Event LIsteners ********************************/
backBTN.addEventListener('click', function () {
  location.replace('index.html');
});
loginBTN.addEventListener('click', function () {
  let pin = parseInt(loginPIN.value);
  currentProfile = profiles.find(profile => profile.pin === pin);

  mainApp.style.display = 'block';
  signOnSection.style.display = 'none';
  //If succesful, it runs through and sets up the accounts for that profile as selecteable options
  profiles.forEach(profile => {
    //sets DOM element for option
    let option = document.createElement('option');
    // use the account number as the identifier
    option.value = profile.memberName;

    //sets text content for the option
    option.textContent = `${profile.memberName}`;

    //appends content to select box
    inputMember.appendChild(option);
  });
});

inputMember.addEventListener('change', function (e) {
  const selectedOption = e.target.selectedOptions[0];
  targetProfile = selectedOption.value;

  for (let i = 0; i < profiles.length; i++) {
    if (targetProfile === profiles[i].memberName) {
      profileSend = profiles[i];
      console.log(profileSend);
    }
  }
});

inputBTN.addEventListener('click', function () {
  sendFunds();
});

/**************************************************Functions*****************************************/

const sendFunds = function () {
  console.log(currentProfile.memberName === profileSend.memberName);

  if (currentProfile.memberName === profileSend.memberName) {
    alert('You cannot send funds to yourself');
  } else {
    let amount = parseInt(inputAmount.value);

    if (amount <= 0) {
      alert('Cannot use negative number');
    } else if (amount > 0) {
      if (amount > currentProfile.accounts[0].balanceTotal) {
        alert('Insufficient funds');
      } else if (amount <= profileSend.accounts[0].balanceTotal) {
        console.log(profileSend.accounts[0].balanceTotal);
        profileSend.accounts[0].transactions.push(amount);
        profileSend.accounts[0].movementsDates.push(new Date().toISOString());
        currentProfile.accounts[0].transactions.push(-amount);
        currentProfile.accounts[0].movementsDates.push(
          new Date().toISOString()
        );
        transactionsPush();

        alert('Money sent sucesfully');
        location.replace('index.html');
      }

      console.log(amount, profileSend.accounts[0].transactions);
      console.log(amount, currentProfile.accounts[0].transactions);
    }
  }
};
