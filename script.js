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








const icons = document.querySelectorAll('.icon__social');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('icon__social--gold');
  });
});



const btnTables = document.querySelectorAll('.btn--table,.btn');
const modalForm = document.querySelector('.modal--form');
const radios = document.querySelectorAll('.modal__radio');
const closes = document.querySelectorAll('.modal__close');
for(const btnTable of btnTables){ 
btnTable.addEventListener('click', (event) =>{
   event.preventDefault();
modalForm.classList.remove('hidden');
const plan = event.target.dataset.plan;
for(radio of radios){
  if(radio.value===plan){
    radio.checked=true;
  }else {
    radio.checked=false;
  }
}
})
}

const btnSubmit = document.querySelector('.btn-submit');
const thanksModal = document.querySelector('.modal--thanks');
const modalButtons = document.querySelectorAll('.modal__button');
btnSubmit.addEventListener('click', (event)=>{
  event.preventDefault();
  thanksModal.classList.remove('hidden');
})
 

const modalQuestion = document.querySelector('.modal--question');
const contactBtn = document.querySelector('.contact-form__btn');
contactBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  modalQuestion.classList.remove('hidden');
})

closes.forEach(close => {
  close.addEventListener('click', () => {
   close.closest('.modal').classList.add('hidden');

  });
});

modalButtons.forEach(close=>{
  close.addEventListener('click',()=>{
    thanksModal.classList.add('hidden');
    modalQuestion.classList.add('hidden');
  })
})

const form = document.querySelector('.modal--form form');
const nameInput = form.querySelector('[name="name"]');
const emailInput = form.querySelector('[name="email"]');
const radioButtons = form.querySelectorAll('[name="ticket"]');
checkFormValidity = function() {
if (nameInput.value.trim() &&
 emailInput.validity.valid &&
  Array.from(radioButtons).some(r => r.checked)) {
  btnSubmit.disabled = false;
} else {
  btnSubmit.disabled = true;
}
}
nameInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
radioButtons.forEach(r => r.addEventListener('change', checkFormValidity));
checkFormValidity();

const formQuestion = document.querySelector('.contact-form');
const nameInputQuestion = formQuestion.querySelector('[name="name"]');
const emailInputQuestion = formQuestion.querySelector('[name="email"]');
const questionButton = formQuestion.querySelector('.contact-form__btn')
const textArea = formQuestion.querySelector('[name="message"]')
const checkQuestionValidity = function() {
if (nameInputQuestion.value.trim() &&
 emailInputQuestion.validity.valid &&
textArea.value.trim()) {
  questionButton.disabled = false;
} else {
  questionButton.disabled = true;
}
}
nameInputQuestion.addEventListener('input', checkQuestionValidity);
emailInputQuestion.addEventListener('input', checkQuestionValidity);
textArea.addEventListener('input', checkQuestionValidity);
checkQuestionValidity();