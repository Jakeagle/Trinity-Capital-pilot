'use strict';

/*******************************************Variables****************************/

const L2 = document.querySelector('.L2');
const L2BackButton = document.getElementById('L2-back-button');
const L2SlideNext = document.getElementById('L2-next-button');
const l2LastSlide = document.getElementById('L2LastSlide');
const bpLoginBtn = document.querySelector('.login__btn--bp');

/********************************************Listeners****************************/

if (bpLoginBtn) {
  bpLoginBtn.addEventListener('click', function () {
    L2.style.display = 'block';
    L2.showModal();
  });
}

if (L2BackButton) {
  L2BackButton.style.display = 'none';
  L2BackButton.addEventListener('click', function () {
    L2.close();
    L2.style.display = 'none';
  });
}

if (L2SlideNext) {
  L2SlideNext.addEventListener('click', function () {
    if (l2LastSlide.checkVisibility()) {
      L2BackButton.style.display = 'block';
    } else if (!l2LastSlide.checkVisibility()) {
      L2BackButton.style.display = 'none';
    }
  });
}
