'use strict';

/*******************************************Variables****************************/

const L1 = document.querySelector('.L1');
const L1BackButton = document.getElementById('L1-back-button');
const L1SlideNext = document.getElementById('L1-next-button');
const l1LastSlide = document.getElementById('L1LastSlide');
const transferLoginBtn = document.querySelector('.login__btn--transfer');

if (L1BackButton) {
  L1BackButton.style.display = 'none';
  L1BackButton.addEventListener('click', function () {
    L1.close();
    L1.style.display = 'none';
  });
}

if (transferLoginBtn) {
  transferLoginBtn.addEventListener('click', function () {
    L1.showModal();
  });
}

if (L1SlideNext) {
  L1SlideNext.addEventListener('click', function () {
    if (l1LastSlide.checkVisibility()) {
      L1BackButton.style.display = 'block';
    } else if (!l1LastSlide.checkVisibility()) {
      L1BackButton.style.display = 'none';
    }
  });
}
