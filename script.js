import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from './cookie.js'
generateCookie("user", userObj)

let slideIndex = 1;
showSlides(slideIndex);


// Next/previous controls
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")

prev.addEventListener('click', () => {
    plusSlides(-1)
})

next.addEventListener('click', () => {
    plusSlides(1)
})

const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")

first.addEventListener('click', () => {
    currentSlide(1)
})

second.addEventListener('click', () => {
    currentSlide(2)
})

third.addEventListener('click', () => {
    currentSlide(3)
})

function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


const link1 = document.getElementById("1")
const link2 = document.getElementById("2")
const link3 = document.getElementById("3")

link1.addEventListener('click', () =>{
    updateClicked(13)
})

link2.addEventListener('click', () =>{
    updateClicked(7)
})

link3.addEventListener('click', () =>{
    updateClicked(19)
})

function updateClicked(imgid){
    const currData = getUserDataFromCookie("user");
    currData.clicked = imgid;
    updateUserDataInCookie("user", currData);
    console.log(getCookie("user"))
}

// autoSlide();

// function autoSlide() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}
//   slides[slideIndex-1].style.display = "block";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }