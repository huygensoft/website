// Footer date
window.onload = function() {
  let date = new Date().getFullYear();
  document.getElementById("footer-year").innerHTML = date;
}

// Google Analytics
class Analytics extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-630H8XK398"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-630H8XK398');
        </script>

        `;
    }
}

// Favicons
class Favicon extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        
        <link rel="icon" href="./src/images/favicon16.ico" sizes="16x16" type="image/x-icon">
        <link rel="icon" href="./src/images/favicon32.ico" sizes="32x32" type="image/x-icon">

        `;
    }
}


// Footer
class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<footer>
  <div class="footer-container minimal-footer">
    <div class="footer-content-center">
      <div class="footer-mail"><a href='mailto:reach@huygensoft.com'>reach@huygensoft.com</a></div>
    </div>
  </div>
</footer>
        `;
    }
}

customElements.define('main-analytics', Analytics);
customElements.define('main-favicon', Favicon);

customElements.define('main-footer', Footer);
