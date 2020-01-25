//Hero title animation

const hdr = document.getElementById('header');
// let lastTitle = document.getElementById('last');
const hamburger = document.querySelector('[data-hamburger-menu]');
const navItems = document.getElementById('navItems');
const scrollArrow = document.querySelector('.scrollArrow');
const iconHero = document.querySelector('.scrollArrow__icon--hero');
const arrowIcon = document.getElementById('heroIcon');
const submitBtn = document.getElementById('submitBtn');
const goToTopBtn = document.getElementById('goToTop');

const heroTitle = document.querySelector('.hero__title');
const heroText = heroTitle.textContent;
const heroLetters = heroText.split('');
heroTitle.textContent = '';


let loadAnimation = setTimeout(function () {

  for (let i = 0; i < heroLetters.length; i++) {

    heroTitle.innerHTML += '<span>' + heroLetters[i] + '</span>'
  }

  // lastTitle.style.opacity = "1";

  // let last = heroText.match(/\s\w+$/i)[0];
  // console.log(last);

  let item = 0;
  let timer = setInterval(onTick, 65);

  function onTick() {

    const span = heroTitle.querySelectorAll('span')[item];
    console.log(span)

    span.classList.add('color');
    item++
    if (item === heroLetters.length) {
      complete();
      return;
    }
  };

  function complete() {
    clearInterval(timer);
    timer = null;
  };
}, 1000);

goToTopBtn.style.display = "none";

//Hamburger menu

hamburger.onclick = () => document.body.classList.toggle('open');
navItems.onclick = () => document.body.classList.remove('open');


//header scroll animation

window.onscroll = function () {


  if (scrollArrow.style.pointerEvents === "none") {
    scrollArrow.style.pointerEvents = "auto"
  }

  if (this.oldScroll < this.scrollY) {
    hdr.classList.add('down');
    arrowIcon.style.opacity = '0';
    scrollArrow.style['pointer-events'] = "none"

  } else {
    hdr.classList.remove('down');
    arrowIcon.style.opacity = '1';
    this.oldScroll = this.scrollY;
    scrollArrow.style['pointer-events'] = "auto";

  }
  //Go to top button

  if ((document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)) {

    goToTopBtn.style.display = "block";

  } else {

    goToTopBtn.style.display = "none";
  }
}

function scrollTop() {

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

goToTopBtn.onclick = scrollTop;

//Form actions
window.onload = function () {
  const contactForm = document.querySelector('form'),
    formReq = contactForm.querySelectorAll("[required]"),
    formStar = contactForm.getElementsByClassName('req'),
    checkPermission = contactForm.querySelector('.permission'),
    checkLabel = contactForm.querySelector('.check'),
    formStatement = contactForm.querySelector('.statement');

  if (checkPermission.checked == true) {
    checkLabel.style.color = "rgb(50, 180, 140)";
  }

  //form submit
  contactForm.onsubmit = function (event) {
    event.preventDefault();

    contactForm.classList.add('is-submitted');
    var error = false;

    for (var i = 0; i < formReq.length; i++) {

      if (formReq[i].checkValidity() != true) {
        error = true;


        for (star of formStar) {
          star.style.color = "red";
        }
        if (checkPermission.checked == true) {
          checkLabel.style.color = "rgb(50, 180, 140)";
        }
      }
    }

    if (!error) {
      // base js send post
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          formStatement.textContent = "Dziękujemy za zgłoszenie!"
          formStatement.classList.remove('error');
          formStatement.classList.add('correct');

          contactForm.classList.remove('is-submitted');
          setInterval(() => formStatement.style.opacity = 0, 3000);
          for (star of formStar) {
            star.style.color = "inherit";
          }
          contactForm.reset();
        }
      };
      xhttp.open("POST", "https://httpstat.us/200", true);
      xhttp.send(new FormData(contactForm));
    } else {
      // console.log('there are some not property validated fields')
      formStatement.textContent = "Wypełnij pola poprawnie"
      formStatement.classList.add('error');
      formStatement.classList.remove('correct');
      setInterval(() => formStatement.style.opacity = 0, 3000);
    }


  }
}