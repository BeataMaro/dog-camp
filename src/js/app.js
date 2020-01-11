const hdr = document.getElementById('header');
const hamburger = document.querySelector('[data-hamburger-menu]');
const arrowIcon = document.querySelector('.arrow-icon');
const submitBtn = document.getElementById('submitBtn');


hamburger.onclick = () => document.body.classList.toggle('open');


//header scroll animation

window.onscroll = function (e) {

  console.log(window.scrollY);
  if (this.oldScroll < this.scrollY) {
    console.log('down');
    hdr.classList.add('down');

    arrowIcon.style.display = 'none';

  } else {
    console.log('up');
    hdr.classList.remove('down');
    arrowIcon.style.display = 'block';
    this.oldScroll = this.scrollY;

  }
}
//Form
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