// Footer date
window.onload = function () {
  let date = new Date().getFullYear();
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.innerHTML = date;
  }
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
        
        <link rel="icon" href="/src/images/favicon16.ico" sizes="16x16" type="image/x-icon">
        <link rel="icon" href="/src/images/favicon32.ico" sizes="32x32" type="image/x-icon">
        <link rel="shortcut icon" href="/favicon.ico">

        `;
  }
}


// Footer
class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<footer class="modern-footer">
  <div class="modern-footer-container">
    <div class="modern-footer-brand">
      <div class="modern-footer-logo-layout">
        <img src="/src/images/logo.svg" alt="HuygenSoft" class="modern-footer-logo" />
        <span class="modern-footer-company">HuygenSoft</span>
      </div>
      <p class="modern-footer-description">We engineer custom software for complex systems, specializing in VoIP integrations, smart hardware, cloud backends, and legacy modernization.</p>
      <div class="modern-footer-socials">
        <h4>Follow Us</h4>
        <div class="modern-footer-social-icons">
          <a href="#" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="modern-footer-links">
      <h4 class="modern-footer-heading">Useful Links</h4>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/pages/services.html">Our Services</a></li>
        <li><a href="/pages/about.html">About Us</a></li>
        <li><a href="/pages/privacy-policy.html">Privacy Policy</a></li>
        <li><a href="/pages/contact.html">Contact Us</a></li>
      </ul>
    </div>
  </div>
  <div class="modern-footer-bottom">
    &copy; <span id="footer-year"></span> HuygenSoft. All rights reserved.
  </div>
</footer>
        `;
  }
}

customElements.define('main-analytics', Analytics);
customElements.define('main-favicon', Favicon);

customElements.define('main-footer', Footer);
