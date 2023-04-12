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

  <!-- for large screen -->
  <div class="footer-container">
      <div class="footer-link-container">
          <div class="footer-flex-item item-1">
            <a href='./index.html'><img src="src/images/logo.svg" alt="company's logo" class='footer-logo'> </a>
          </div>

          <div class="footer-flex-item q-link">
              <h3 class="flex-item-tag">Quick Links</h3>
              <div class="footer-flex-link-container">
                <span class='q-span'><a href="./index.html" class="link">Home</a></span>
                <span class='q-span'><a href="./about.html" class="link">About Us</a></span>
                <span class='q-span'>Our Services</span>
                <span class='q-span'><a href="./contact-page.html" class="link">Contact Us</a></span>
                <span class='q-span'><a href="./privacy.html" class="link">Privacy</a></span>
              </div>
          </div>

          <div class="footer-flex-item item-3">
                <h3 class="flex-item-tag">Services</h3>
                <div class="footer-flex-link-container">
                  <span class='s-span'>software engineering</span>
                  <span class='s-span'>websites development</span>
                  <span class='s-span'>user focused designs</span>
                  <span class='s-span'>business development <br> services</span>
                </div>
          </div>


          <div class="footer-flex-item item-4">
                <h3 class="flex-item-tag ">Address</h3>
                <div class="footer-flex-link-container flex-address">
                  <div class="footer-address"><a href="https://goo.gl/maps/H3ZATeNMD2AstAmd9" target="_blank">1, Providence House, Admiralty way
                     Lekki Phase 1, Lekki, Lagos State</a>
                  </div>
                  
                  <div>
                    <h3 class="footer-contact-info">Contact Information</h3>
                    <span class="footer-telephone"><a href="tel:+2349035883528">Tel : +234-903-588-3528</a></span>
                    <span class="footer-mail"><a href='mailto:reach@huygensoft.com'>reach@huygensoft.com</a></span>
                  </div>
                </div>
          </div>
      </div>

  </div>


  <div class="footer-socials-container">
      <div>
        <p class="copyright">Copyright &copy;<span id="footer-year"></span> | All Rights Reserved</p> 
        <!-- <p>Copyright &copy;<script>document.write(new Date().getFullYear())</script> | All Rights Reserved</p> -->   
      </div>
      <div class="footer-social-icons">
        <!-- <span><a href="#"><img src="./src/images/fb-icon.svg" alt="" class="btn-link"></a></span> -->
        <!-- <span><a href="#"><img src="./src/images/whatsapp-icon.svg" alt="" class="btn-link"></a></span> -->
        <!-- <span><a href="#"><img src="./src/images/instagram-icon.svg" alt="" class="btn-link"></a></span> -->
        <span><a href="https://twitter.com/huygensoft"><img src="./src/images/twitter -icon.svg" alt="" class="btn-link"></a></span>
      </div>
  </div>



  
<!-- ----------------------------------------------------------- -->

  <!-- for mobile -->
  <div class="mobile-footer-container">
      <!-- logo -->
      <div>
        <a href="./index.html" class="link"><img src="./src/images/logo.svg" alt="company's logo"></a>
      </div>

      <!-- quick links & services -->
      <div class="mobile-quick-links">
        <div>
          <h3 class="mobile-flex-item-tag">Quick Links</h3>
          <div class="mobile-footer-flex-link-container">
            <span><a href="./index.html" class="link">Home</a></span>
            <span><a href="./about.html" class="link">About Us</a></span>
            <span>Our Services</span>
            <span><a href="./contact-page.html" class="link">Contact Us</a></span>
            <span><a href="./privacy.html" class="link">Privacy</a></span>
          </div>
        </div>

        <div>
          <h3 class="mobile-flex-item-tag">Services</h3>
              <div class="mobile-footer-flex-link-container">
                <span>software engineering</span>
                <span>websites development</span>
                <span>user focused designs</span>
                <span>business development <br> services</span>
              </div>
        </div>
      </div>

      <!-- address -->
      <div>
        <h3 class="mobile-flex-item-tag ">Address</h3>
            <div class="mobile-footer-address"><a class="link" href="https://goo.gl/maps/H3ZATeNMD2AstAmd9" target="_blank">1, Providence House, Admiralty way
                Lekki Phase 1, Lekki, Lagos State</a>
            </div>
      </div>


      <!-- contact -->
      <div>
        <h3 class="footer-contact-info">Contact Information</h3>
        <span class="footer-telephone"><a href="tel:+2349035883528">Tel : +234-903-588-3528</a></span>
        <span class="footer-mail"><a href='mailto:reach@huygensoft.com'>reach@huygensoft.com</a></span>
      </div>

      <!-- social icons -->
      <div class="mobile-social">
        <!-- <span><a href="#"><img src="./src/images/fb-icon.svg" alt="" class=""></a></span> -->
        <!-- <span><a href="#"><img src="./src/images/whatsapp-icon.svg" alt=""></a></span> -->
        <!-- <span><a href="#"><img src="./src/images/instagram-icon.svg" alt=""></a></span> -->
        <span><a href="https://twitter.com/huygensoft"><img src="./src/images/twitter -icon.svg" alt=""></a></span>
      </div>
  </div>
<!-- mobile footer link container ends -->

<!-- mobile copyright -->
<div class="mobile-copyright">

<p class="copyright">Copyright &copy;<span id="footer-year">2023</span> | All Rights Reserved</p> 
<!-- <p>Copyright &copy;<script>document.write(new Date().getFullYear())</script> | All Rights Reserved</p> --> 

</div>


</footer>




        
        `;
    }
}

customElements.define('main-analytics', Analytics);
customElements.define('main-favicon', Favicon);

customElements.define('main-footer', Footer);
