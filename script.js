//hamb menu

const hambButton = document.querySelector('#hamb-button');
var menuHamb = document.querySelector('.hamb-menu');

let isOpen = false;

hambButton.addEventListener('click', () => {

  if (!isOpen) {
    menuHamb.style.display = 'block';
    isOpen = true;
  } else {
    menuHamb.style.display = 'none';
    isOpen = false;
  }
})

//banner

var bannerImg = document.querySelector('#banner-img');
var previous = document.querySelector('.previous-icon');
var next = document.querySelector('.next-icon');

var imgs = [
  'https://loremflickr.com/256/512?random=0',
  'https://loremflickr.com/256/512?random=1',
  'https://loremflickr.com/256/512?random=2',
  'https://loremflickr.com/256/512?random=3',
  'https://loremflickr.com/256/512?random=4',
]

var currentImg = 0;

setInterval(() => {
  if (currentImg < imgs.length) {
    bannerImg.src = imgs[currentImg];
    currentImg++;
  } else {
    currentImg = 0;
    bannerImg.src = imgs[currentImg]
  }
  /* console.log(currentImg); */
}, 5000);

previous.addEventListener('click', () => {
  if (currentImg === 0) {
    currentImg = imgs.length - 1;
    bannerImg.src = imgs[currentImg];
    /* console.log(currentImg); */
  } else {
    currentImg--;
    bannerImg.src = imgs[currentImg];
    /* console.log(currentImg); */
  }
});

next.addEventListener('click', () => {
  if (currentImg < imgs.length) {
    bannerImg.src = imgs[currentImg];
    currentImg++;
    /* console.log(currentImg); */
  } else {
    currentImg = 0;
    bannerImg.src = imgs[currentImg]
    /* console.log(currentImg); */
  }

});

//comments

let comments = document.querySelector('#comments');
let reloadButton = document.querySelector('#reload-comments');

async function Comments() {

  for (let i = 0; i < 3; i++) {
    var request = await fetch('https://api.quotable.io/random');
    var commentsDoc = await request.json();

    var commentText = document.createElement('q');
    commentText.className = 'comment-text';
    commentText.innerHTML = commentsDoc.content;

    var commentAuthor = document.createElement('i', 'p');
    commentAuthor.className = 'comment-author';
    commentAuthor.innerHTML = commentsDoc.author;

    comments.appendChild(commentText);
    comments.appendChild(commentAuthor);

    /* console.log(commentsDoc); */
  }
};

Comments();

reloadButton.addEventListener('click', () => {
  comments.innerHTML = '';
  Comments();
})

// form

const form = document.querySelector('.form');
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const submit = document.querySelector('#submit');

let nameError = document.querySelector('#name-error');
let phoneError = document.querySelector('#phone-error');
let emailError = document.querySelector('#email-error');

name.onblur = () => {
  nameValidate();
}

phone.onblur = () => {
  phoneValidate();
}

email.onblur = () => {
  emailValidate();
}

function nameValidate() {

  const nameTest = name.value;
  const nameTestFirst = nameTest[0];

  const isEmpty = nameTest.length !== 0;
  const isMin = nameTest.length >= 2;
  const isMax = nameTest.length <= 28;
  const isUpper = nameTestFirst !== undefined && nameTestFirst.toUpperCase() === nameTestFirst;

  if (!isEmpty) {
    nameError.innerHTML = 'Digite um nome.';
    name.style.borderColor = 'red';
  } else if (!isMin) {
    nameError.innerHTML = 'Digite um nome com mais de 2 caracteres.';
    name.style.borderColor = 'red';
    return false;
  } else if (!isMax) {
    nameError.innerHTML = 'Digite um nome com menos de 28 caracteres.';
    name.style.borderColor = 'red';
    return false;
  } else if (!isUpper) {
    nameError.innerHTML = 'Digite um nome com a primeira letra maíuscula.';
    name.style.borderColor = 'red';
    return false;
  } else {
    nameError.innerHTML = '';
    name.style.borderColor = null;
  }
  return isEmpty && isMin && isMax && isUpper;
};

function phoneValidate() {
  const phoneTest = phone.value;
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;

  const isPhoneValid = phoneRegex.test(phoneTest);

  if (!isPhoneValid) {
    phoneError.innerHTML = 'Digite um número válido.'
    phone.style.borderColor = 'red';
    return false;
  } else {
    phoneError.innerHTML = '';
    phone.style.borderColor = null;
  }

  return isPhoneValid;
}

function emailValidate() {
  const emailTest = email.value;
  const emailRegex = /^\S+@\S+\.\S+$/;

  const isEmailValid = emailRegex.test(emailTest);

  if (!isEmailValid) {
    emailError.innerHTML = 'Digite um e-mail válido.'
    email.style.borderColor = 'red';
    return false;
  } else {
    emailError.innerHTML = '';
    email.style.borderColor = null;
  }

  return isEmailValid;
}


form.onsubmit = (event) => {

  event.preventDefault();

  nameValidate();

  phoneValidate();

  emailValidate();

  if (nameValidate() && phoneValidate() && emailValidate()) {
    alert('form submit sucess');
  } else {
    alert('form submit fail');
  }

}
