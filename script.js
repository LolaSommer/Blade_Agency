const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const navLinks = document.querySelectorAll('.nav__link');
const media = document.querySelector('.header__media');
const lang = document.querySelector('.language__current');

window.addEventListener('scroll', () => {
  if (window.scrollY <= hero.offsetHeight) {
    header.classList.remove('header--white');
    navLinks.forEach(link => link.classList.remove('nav__link--dark'));
    media.classList.add('header__media--hidden');
    lang.classList.remove('language__current--dark');
  } else {
    header.classList.add('header--white');
    navLinks.forEach(link => link.classList.add('nav__link--dark'));
    media.classList.remove('header__media--hidden');
    lang.classList.add('language__current--dark');
   
  }
});

const current = document.querySelector('.language__current');
const list = document.querySelector('.language__list');
const options = document.querySelectorAll('.language__option');
current.addEventListener('click', () => {
  list.classList.toggle('open');
});
list.addEventListener('click', (event)=>{
  const clicked=event.target.closest('.language__option');
  if(!clicked) return;
  options.forEach(opt=>opt.classList.remove('is-selected'));
  clicked.classList.add('is-selected');
  const newText=clicked.textContent.trim();
  current.textContent=newText;
  list.classList.remove('open');
});


