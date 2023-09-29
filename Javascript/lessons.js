'use strict';

import { profiles, transactionsPush } from './script.js';

/***********************************************************Variables***********************/
const loginButton = document.querySelector('.login__btn');
const tutorialBtn = document.querySelector('.tutorialBtn');
const Lesson1Btn = document.querySelector('.lesson1Btn');
const Lesson2Btn = document.querySelector('.lesson2Btn');
const Lesson3Btn = document.querySelector('.lesson3Btn');
const Lesson4Btn = document.querySelector('.lesson4Btn');
const pilotFeedback = document.querySelector('.feedbackButton');
const feedBackModal = document.querySelector('.feedbackPrompt');
const clearStorage = document.querySelector('.clearStorage');
const closeBtn = document.querySelector('.closeBtn');

//Modals
const T1 = document.querySelector('.T1');

T1.style.display = 'none';

feedBackModal.style.display = 'none';
//back buttons
const backButton = document.querySelector('.backBox');

//Slide Buttons
const slideNext = document.querySelector('.carousel-control-next-icon');

//Last Slides
const t1LastSlide = document.getElementById('t1LastSlide');

//Hidden elements
if (tutorialBtn) {
  tutorialBtn.style.display = 'none';
}

if (backButton) {
  backButton.style.display = 'none';
}

/******************************************Tutorial *************************************/

if (loginButton) {
  loginButton.addEventListener('click', function () {
    T1.style.display = 'inline';
    T1.showModal();
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', function () {
    T1.close();
    T1.style.display = 'none';

    transactionsPush();
  });
}

if (slideNext) {
  slideNext.addEventListener('click', function () {
    if (T1) {
      if (t1LastSlide.checkVisibility()) {
        backButton.style.display = 'block';
        tutorialBtn.style.display = 'block';
      } else if (!t1LastSlide.checkVisibility()) {
        backButton.style.display = 'none';
      }
    }
  });
}

if (tutorialBtn) {
  tutorialBtn.addEventListener('click', function () {
    T1.style.display = 'block';
    T1.showModal();
  });
}

/***********************************************Lesson Buttons **************************/
if (Lesson1Btn) {
  Lesson1Btn.addEventListener('click', function () {
    location.replace('transfer.html');
  });
}

if (Lesson2Btn) {
  Lesson2Btn.addEventListener('click', function () {
    location.replace('billandpayments.html');
  });
}

if (Lesson3Btn) {
  Lesson3Btn.addEventListener('click', function () {
    location.replace('deposit.html');
  });
}

if (Lesson4Btn) {
  Lesson4Btn.addEventListener('click', function () {
    location.replace('sendMoney.html');
  });
}
/*******************************************Feedback and storage************************************/
if (pilotFeedback) {
  pilotFeedback.addEventListener('click', function () {
    feedBackModal.showModal();
  });
}

if (clearStorage) {
  clearStorage.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
    alert('Data cleared');
    location.reload();
  });
}
