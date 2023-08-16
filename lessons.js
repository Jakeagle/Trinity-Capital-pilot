const t1LastSlide = document.getElementById('t1LastSlide');
const loginButton = document.querySelector('.login__btn');
const slideNext = document.querySelector('.carousel-control-next-icon');
const backButton = document.querySelector('.backBox');
const tutorialBtn = document.querySelector('.tutorialBtn');
const T1 = document.querySelector('.T1');

tutorialBtn.style.display = 'none';
backButton.style.display = 'none';

console.log(t1LastSlide.checkVisibility());

/******************************************Event Listeners *************************************/
loginButton.addEventListener('click', function () {
  console.log(t1LastSlide.checkVisibility());
});

slideNext.addEventListener('click', function () {
  if (t1LastSlide.checkVisibility()) {
    backButton.style.display = 'block';
    tutorialBtn.style.display = 'block';
  } else if (!t1LastSlide.checkVisibility()) {
    backButton.style.display = 'none';
  }
});

tutorialBtn.addEventListener('click', function () {
  T1.showModal();
});
