const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const navLinks = document.querySelectorAll('.nav__link');
const media = document.querySelector('.header__media');
window.addEventListener('scroll', () => {
  if (window.scrollY <= hero.offsetHeight) {
    header.classList.remove('header--white');
    navLinks.forEach(link => link.classList.remove('nav__link--dark'));
    media.classList.add('header__media--hidden');
  } else {
    header.classList.add('header--white');
    navLinks.forEach(link => link.classList.add('nav__link--dark'));
    media.classList.remove('header__media--hidden');
  }
});

