const hdr = document.getElementById('header');
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

//Hero title animation
document.addEventListener('DOMContentLoaded', () => {

  for (let i = 0; i < heroLetters.length; i++) {

    heroTitle.innerHTML += '<span>' + heroLetters[i] + '</span>'
  }

  let item = 0;
  let timer = setInterval(onTick, 65);

  function onTick() {

    const span = heroTitle.querySelectorAll('span')[item];
    span.classList.add('color');
    item++
    if (item === heroLetters.length) {
      showArrow();
      complete();
      return;
    }
  };

  function showArrow() {
    iconHero.style.opacity = '1'
  }

  function complete() {
    clearInterval(timer);
    timer = null;
  };

  goToTopBtn.style.display = "none";
})


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

form_mod = this.document.querySelector('.form'),
  form_el = form_mod.querySelector('form'),
  form_req = form_mod.querySelectorAll('[required]');

form_el.onsubmit = function (event) {
  event.preventDefault();

  form_el.classList.add('is-submitted');
  var isError = false;

  for (var i = 0; i < form_req.length; i++) {
    if (form_req[i].checkValidity() != true) {
      isError = true;
    }
  }

  if (!isError) {
    // send post
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert('form send');

        form_el.classList.remove('is-submitted');
        form_el.reset();
      }
    };
    xhttp.open("POST", "https://httpstat.us/200", true);
    xhttp.send(new FormData(form_el));
  } else {
    console.log('there are some not property validated fields')
  }

}

// FOOTER DATE

let copyrights = document.getElementById('copyrights');

function updateYear(el) {
  const date = new Date();
  const year = date.getFullYear();
  el.textContent = year;
};

updateYear(copyrights);