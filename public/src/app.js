// Footer date
window.onload = function() {
    let date = new Date().getFullYear();
    document.getElementById("footer-year").innerHTML = date;
}


//Cookies Banner
const cookieContainer = document.querySelector(".cookie-banner-container");
const cookieButton = document.querySelector(".cookie-button");

cookieButton.addEventListener("click", () => {
    cookieContainer.classList.remove("active");
});

setTimeout( () => {
    cookieContainer.classList.add("active");
}, 3000);

//Set cookie
let cookieName = "Huygensoft";
