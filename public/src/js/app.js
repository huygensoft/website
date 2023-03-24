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



// Footer date
window.onload = function() {
    let date = new Date().getFullYear();
    document.getElementById("footer-year").innerHTML = date;
}


//Cookies Banner
const cookieContainer = document.querySelector("#cookie");
const cookieButton = document.querySelector(".cookie-button");

// Set cookie
setCookie = (cName, cValue, expDays) => {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

// Get cookie 
getCookie = (cName) => {
    const name  = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    let value;
    cArr.forEach(val => {
        if(val.indexOf(name) === 0) value = val.substring(name.length);
    })

    return value;
}


// Cookie Button clicked
cookieButton.addEventListener("click", () => {
    cookieContainer.style.display = "none";

    setCookie("cookie", true, 30);
});


// 
cookieMessage = () => {
    if(!getCookie("cookie")) 
    document.querySelector("#cookie").style.display = "block";
}

window.addEventListener("load", cookieMessage);
