'use strict';

/*******************************************Variables****************************/

const L3 = document.querySelector('.L3');
const L3BackButton = document.getElementById('L3-back-button');
const L3SlideNext = document.getElementById('L3-next-button');
const l3LastSlide = document.getElementById('L3LastSlide');
const bpLoginBtn = document.querySelector('.login__btn--bp');

/********************************************Listeners****************************/

if (bpLoginBtn) {
  bpLoginBtn.addEventListener('click', function () {
    L3.style.display = 'block';
    L3.showModal();
  });
}

if (L3BackButton) {
  L3BackButton.style.display = 'none';
  L3BackButton.addEventListener('click', function () {
    L3.close();
    L3.style.display = 'none';
  });
}

if (L3SlideNext) {
  L3SlideNext.addEventListener('click', function () {
    if (l3LastSlide.checkVisibility()) {
      L3BackButton.style.display = 'block';
    } else if (!l3LastSlide.checkVisibility()) {
      L3BackButton.style.display = 'none';
    }
  });
}
