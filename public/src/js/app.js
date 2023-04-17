// Mobile Navigation
// Hamburger starts
const hamburger = document.getElementById("bar-container");
const menu = document.querySelector(".nav-menu");
const menuLink = document.querySelectorAll(".menu-link");

hamburger.addEventListener("click", showMenu);

function showMenu() {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
}
menuLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}
// Hamburger ends
// ---------------------------------------------------------------------




// for mobile
// window.onload = function() {
//     let date = new Date().getFullYear();
//     document.getElementById("m-footer-year").innerHTML = date;
// }


// Add Active To Current Page
let links = document



// document.querySelector(`a[href^=' ${location.pathname.split('/'[1])}'] `).className = 'active';
// activeLink[0].classList.add('active');


// (function () {
//     let current = location.pathname.split('/')[1];
//     if (current === '') return;
//     let menuItems = document.querySelectorAll('.nav-menu a');
//     for (let i = 0, len = menuItems.length; i < len; i++) {
//         if (menuItems[i].getAttribute('href').indexOf(current) !== -1) {
//             menuItems[i].className += 'is-active';
//         }
//     }
// })();


// let navContainer = document.getElementById('navs');
// let btns =navContainer.getElementsByClassName('top-link');
// for (let i = 0; i < btns; i++) {
//     btns[i].addEventListener('click', function() {
//         let current = document.getElementsByClassName('active');
//         current[0].className = current[0].className.replace(" active", '');
//         this.className += ' active';
//     });
// }