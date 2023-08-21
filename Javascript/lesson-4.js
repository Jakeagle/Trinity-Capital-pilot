'use strict';

/*******************************************Variables****************************/

const L4 = document.querySelector('.L4');
const L4BackButton = document.getElementById('L4-back-button');
const L4SlideNext = document.getElementById('L4-next-button');
const l4LastSlide = document.getElementById('L4LastSlide');
const bpLoginBtn = document.querySelector('.login__btn--bp');

/********************************************Listeners****************************/

if (bpLoginBtn) {
  bpLoginBtn.addEventListener('click', function () {
    L4.style.display = 'block';
    L4.showModal();
  });
}

if (L4BackButton) {
  L4BackButton.style.display = 'none';
  L4BackButton.addEventListener('click', function () {
    L4.close();
    L4.style.display = 'none';
  });
}

if (L4SlideNext) {
  L4SlideNext.addEventListener('click', function () {
    if (l4LastSlide.checkVisibility()) {
      L4BackButton.style.display = 'block';
    } else if (!l4LastSlide.checkVisibility()) {
      L4BackButton.style.display = 'none';
    }
  });
}
