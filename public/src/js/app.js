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