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
<footer>
  <div class="footer-container minimal-footer" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background-color: var(--primary-color); color: var(--text-white);">
    <div class="footer-content-left" style="display: flex; gap: 20px;">
      <a href="/index.html" style="color: var(--text-white); text-decoration: none;">Home</a>
      <a href="/pages/about.html" style="color: var(--text-white); text-decoration: none;">About Us</a>
    </div>
    <div class="footer-content-center">
      <div class="footer-mail"><a href='/pages/contact.html' style="color: var(--Logo-orange, #F55F1D); text-decoration: none;">Contact Us</a></div>
    </div>
    <div class="footer-content-right" style="display: flex; gap: 15px;">
      <a href="https://www.linkedin.com/company/83504608" target="_blank" style="color: var(--text-white); text-decoration: none;">LinkedIn</a>
      <a href="https://x.com/huygensoft" target="_blank" style="color: var(--text-white); text-decoration: none;">Twitter</a>
    </div>
  </div>
  <div style="text-align: center; padding: 10px; background-color: var(--footer-end-color); color: var(--text-font-color); font-size: 14px;">
    &copy; <span id="footer-year"></span> HuygenSoft. All rights reserved.
  </div>
</footer>
        `;
  }
}

customElements.define('main-analytics', Analytics);
customElements.define('main-favicon', Favicon);

customElements.define('main-footer', Footer);
