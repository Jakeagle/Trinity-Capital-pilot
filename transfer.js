'use strict';

//import profiles object from App.js
import { profiles } from './app.js';

//Variables
const inputPIN = document.querySelector('.login__input--pin--transfer');

const btnPIN = document.querySelector('.login__btn--transfer');

let currentProfile;

/************************************************Functions*************************************************/

const login = function () {
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
};
/************************************************Event Listeners*************************************************/
btnPIN.addEventListener('click', function () {
  console.log('Click');
  let pin = ParseInt(inputPIN.value);
  currentProfile = profiles.find(profile => profile.pin === pin);
  login();
});
