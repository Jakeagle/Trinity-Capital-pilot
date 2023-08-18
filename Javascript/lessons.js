'use strict';

import { profiles, transactionsPush } from './script.js';

/***********************************************************Variables***********************/
const loginButton = document.querySelector('.login__btn');
const tutorialBtn = document.querySelector('.tutorialBtn');
const Lesson1Btn = document.querySelector('.lesson1Btn');

const closeBtn = document.querySelector('.closeBtn');

//Modals
const T1 = document.querySelector('.T1');

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

/*******************************************Lesson 1************************************/
