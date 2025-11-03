const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const navLinks = document.querySelectorAll('.nav__link');
const media = document.querySelector('.header__media');
const lang = document.querySelector('.language__current');
const gutter = document.querySelector('.gutter');
const gutterCurrent = document.querySelector('.gutter__current');
const sections = document.querySelectorAll('section');

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

function updateOnScroll() {
  const scrollY = window.scrollY + window.innerHeight / 2; 
  let count = 1;
  let activeSection = null;


  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      count = index + 1;
      activeSection = section;
    }
  });

 
  gutterCurrent.textContent = count.toString().padStart(2, '0');

navLinks.forEach(link => link.classList.remove('active'));

if (activeSection) {
  const activeLink = document.querySelector(`.nav__link[href="#${activeSection.id}"]`);
  if (activeLink) activeLink.classList.add('active');
}

if (activeSection && activeSection.classList.contains('hero')) {

  header.classList.remove('header--white');
  gutter.classList.remove('gutter--dark');
  
 
  navLinks.forEach(link => link.classList.remove('nav__link--dark'));
  media.classList.add('header__media--hidden');
  lang.classList.remove('language__current--dark');
} else {

  header.classList.add('header--white');
  gutter.classList.add('gutter--dark');

  navLinks.forEach(link => link.classList.add('nav__link--dark'));
  media.classList.remove('header__media--hidden');
  lang.classList.add('language__current--dark');
}

ticking = false;
}









navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});


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

const closeList = () =>{
  list.classList.remove('open');
  lang.setAttribute('aria-expanded', 'false')
}
document.addEventListener('click',(e)=>{
  if(!lang.contains(e.target) && !list.contains(e.target)){
    closeList();
  }
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    closeList();
  }
});


const btnTables = document.querySelectorAll('.btn--table,.btn');
const modalForm = document.querySelector('.modal--form');
const radios = document.querySelectorAll('.modal__radio');
const closes = document.querySelectorAll('.modal__close');
const modals = document.querySelectorAll('.modal');
const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
let activeModal = null;
let lastTrigger = null;

const getFocusableElements = (modal) => {
  if (!modal) {
    return [];
  }

  return Array.from(modal.querySelectorAll(focusableSelectors)).filter(
    (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true'
  );
};

const focusFirstElement = (modal) => {
  const focusable = getFocusableElements(modal);

  if (focusable.length > 0) {
    focusable[0].focus();
    return;
  }

  const modalWindow = modal.querySelector('.modal__window');

  if (modalWindow) {
    modalWindow.focus();
  }
};

const openModal = (modal, trigger = document.activeElement) => {
  if (!modal) {
    return;
  }

  lastTrigger = trigger || lastTrigger;
  activeModal = modal;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  focusFirstElement(modal);
};

const closeModal = (modal, { restoreFocus = true } = {}) => {
  if (!modal) {
    return;
  }

  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');

  if (modal === activeModal) {
    activeModal = null;

    if (restoreFocus && lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }
};

document.addEventListener('keydown', (event) => {
  if (!activeModal) {
    return;
  }

  if (event.key === 'Escape') {
    closeModal(activeModal);
    return;
  }

  if (event.key !== 'Tab') {
    return;
  }

  const focusable = getFocusableElements(activeModal);

  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusable[0];
  const lastElement = focusable[focusable.length - 1];
  const currentFocused = document.activeElement;

  if (event.shiftKey) {
    if (currentFocused === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    return;
  }

  if (currentFocused === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

modals.forEach((modal) => {
  const overlay = modal.querySelector('.modal__overlay');

  if (overlay) {
    overlay.addEventListener('click', () => closeModal(modal));
  }
});

for (const btnTable of btnTables) {
  btnTable.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(modalForm, event.currentTarget);

    const plan = event.currentTarget.dataset.plan;

    if (plan) {
      let hasMatch = false;

      radios.forEach((radio) => {
        const isMatch = radio.value === plan;
        radio.checked = isMatch;

        if (isMatch) {
          hasMatch = true;
        }
      });

      if (!hasMatch) {
        radios.forEach((radio) => {
          radio.checked = false;
        });
      }
    }

    if (typeof checkFormValidity === 'function') {
      checkFormValidity();
    }
  });
}

const btnSubmit = document.querySelector('.btn-submit');
const thanksModal = document.querySelector('.modal--thanks');
const modalButtons = document.querySelectorAll('.modal__button');

if (btnSubmit) {
  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    if (btnSubmit.disabled) {
      return;
    }

    closeModal(modalForm, { restoreFocus: false });
    openModal(thanksModal, lastTrigger);
  });
}

const modalQuestion = document.querySelector('.modal--question');
const contactBtn = document.querySelector('.contact-form__btn');

if (contactBtn) {
  contactBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(modalQuestion, contactBtn);
  });
}

closes.forEach((close) => {
  const modal = close.closest('.modal');

  close.addEventListener('click', () => {
    if (!modal) {
      return;
    }

    if (modal === modalForm) {
      closeModal(modalForm);
      return;
    }

    if (modal === thanksModal) {
      closeModal(thanksModal);
      return;
    }

    if (modal === modalQuestion) {
      closeModal(modalQuestion);
    }
  });
});

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');

    if (!modal) {
      return;
    }

    closeModal(modal);
  });
});



const form = document.querySelector('.modal--form form');
const nameInput = form.querySelector('[name="name"]');
const emailInput = form.querySelector('[name="email"]');
const radioButtons = form.querySelectorAll('[name="ticket"]');
const radioGroup = form.querySelector('.modal__options');

function checkFormValidity() {
  if (nameInput.value.trim() === '') {
    nameInput.classList.add('invalid');
  } else {
    nameInput.classList.remove('invalid');
  }

  if (!emailInput.validity.valid) {
    emailInput.classList.add('invalid');
  } else {
    emailInput.classList.remove('invalid');
  }

  if (!Array.from(radioButtons).some((radio) => radio.checked)) {
    radioGroup.classList.add('invalid');
  } else {
    radioGroup.classList.remove('invalid');
  }

  if (
    nameInput.value.trim() &&
    emailInput.validity.valid &&
    Array.from(radioButtons).some((radio) => radio.checked)
  ) {
    if (btnSubmit) {
      btnSubmit.disabled = false;
    }
  } else if (btnSubmit) {
    btnSubmit.disabled = true;
  }
}

nameInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
radioButtons.forEach((radio) => radio.addEventListener('change', checkFormValidity));
checkFormValidity();

const formQuestion = document.querySelector('.contact-form');
const nameInputQuestion = formQuestion.querySelector('[name="name"]');
const emailInputQuestion = formQuestion.querySelector('[name="email"]');
const questionButton = formQuestion.querySelector('.contact-form__btn');
const textArea = formQuestion.querySelector('[name="message"]');

function checkQuestionValidity() {
  if (nameInputQuestion.value.trim() === '') {
    nameInputQuestion.classList.add('invalid');
  } else {
    nameInputQuestion.classList.remove('invalid');
  }

  if (emailInputQuestion.value.trim() !== '' && !emailInputQuestion.validity.valid) {
    emailInputQuestion.classList.add('invalid');
  } else {
    emailInputQuestion.classList.remove('invalid');
  }

  if (textArea.value.trim() === '') {
    textArea.classList.add('invalid');
  } else {
    textArea.classList.remove('invalid');
  }

  if (
    nameInputQuestion.value.trim() &&
    emailInputQuestion.validity.valid &&
    textArea.value.trim()
  ) {
    questionButton.disabled = false;
  } else {
    questionButton.disabled = true;
  }
}

nameInputQuestion.addEventListener('input', checkQuestionValidity);
emailInputQuestion.addEventListener('input', checkQuestionValidity);
textArea.addEventListener('input', checkQuestionValidity);
checkQuestionValidity();

