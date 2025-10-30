const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const navLinks = document.querySelectorAll('.nav__link');
const media = document.querySelector('.header__media');
const lang = document.querySelector('.language__current');

function toggleHeaderState() {
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
}
window.addEventListener('scroll', toggleHeaderState);
toggleHeaderState(); 



const list = document.querySelector('.language__list');
const options = document.querySelectorAll('.language__option');
const currentLabel = document.querySelector('.language__label');

lang.addEventListener('click', () => {
  const expanded = lang.getAttribute('aria-expanded');
  if (list.classList.contains('open')) {
    list.classList.remove('open');
    lang.setAttribute('aria-expanded', 'false');
  } else {
    list.classList.add('open');
    lang.setAttribute('aria-expanded', 'true');
  }
});

list.addEventListener('click', (event)=>{
  const clicked=event.target.closest('.language__option');
  if(!clicked) return;
  options.forEach(opt=>opt.classList.remove('is-selected'));
  clicked.classList.add('is-selected');
  const newText=clicked.textContent.trim();
  currentLabel.textContent = newText;
  list.classList.remove('open');
});


const gutterCurrent = document.querySelector('.gutter__current');
const sections = document.querySelectorAll('section'); 
const gutter =document.querySelector('.gutter');
 let count = 1; 
 let activeSection = null;
 window.addEventListener('scroll', () => { 
  sections.forEach((section, index) => { 
    const top = section.offsetTop; 
    const height = section.offsetHeight; 
    const bottom = top + height;
    const scrollPos = window.scrollY + window.innerHeight / 2; 
    if (scrollPos >= top && scrollPos < bottom) { 
      count = index + 1; 
      activeSection = section;
    };
    
    });
gutterCurrent.textContent = count.toString().padStart(2, '0'); 
if (activeSection && activeSection.classList.contains('hero')) {
  gutter.classList.remove('gutter--dark');
} else {
  gutter.classList.add('gutter--dark');
}
});


const btn = document.querySelector('.btn');
const btnText = document.querySelector('.btn__text');

btn.addEventListener('click', () => {
  btnText.classList.toggle('btn__text--gold');
});


const icons = document.querySelectorAll('.icon__social');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('icon__social--gold');
  });
});

const btnTables = document.querySelectorAll('.btn--table');
const modal = document.querySelector('.modal');
const radios = document.querySelectorAll('.modal__radio');
const close = document.querySelector('.modal__close');
for(const btnTable of btnTables){ 
btnTable.addEventListener('click', (event) =>{
   event.preventDefault();
modal.classList.remove('hidden');
const plan = event.target.dataset.plan;
for(radio of radios){
  if(radio.value===plan){
    radio.checked=true;
  }else {
    radio.checked=false;
  }
}
})
close.addEventListener('click',()=>{
  modal.classList.add('hidden');
});
}

