class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

        <style>
            footer {
                height: 38rem;
                /* display: flex;
                flex-direction: column;
                justify-content: space-between; */
                color: var(--text-white);
            }
            .footer-container {
                padding: 86px 121px;
                background: var(--primary-second);
            }
            .footer-link-container {
                /* border: 1px solid white; */
                display: flex;
                height: 25rem;
            }
            .footer-flex-item {
                /* border: 1px solid white; */
                width: 28%;
                
            }
            .flex-item-tag {
                font-weight: 700;
                font-size: 27px;
            }
            .q-link {
                width: 23%;
            }
            .footer-flex-link-container {
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                justify-content: space-between;
                height: 13rem;
                font-weight: 400;
                font-size: 16px;
                text-transform: capitalize;
                letter-spacing: 0.6px;
            }
            .footer-flex-link-container span {
                height: 3rem;
            }
            .footer-contact-info {
                margin-bottom: 15px;
                font-size: 22px;
            }
            .footer-socials-container {
                background: var(--footer-end-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 121px;
                height: 70px;
            }
            .footer-social-icons {
                text-align-last: justify;
                width: 13%;
            }
            .flex-address {
                height: 13rem;
            }
            .footer-address a, .footer-telephone a {
                text-decoration: none;
                color: white;
            }
            .footer-address a:hover , .footer-telephone a:hover {
                text-decoration: underline;
                color: var(--accent-color);
            }
            
            /* mobile footer */
            .mobile-footer-container, .mobile-copyright {
                display: none;
            }

            @media screen and (min-width: 320px) and (max-width: 767px) {
                footer {
                    height: 55rem;
                    
            }
            .footer-container, .footer-socials-container {
                display: none;
            }
            
            .mobile-footer-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    background: var(--primary-second);
                    height: 51rem;
                    padding: 52px 21px;
                }
                .mobile-quick-links {
                    display: flex;
                    justify-content: space-between;
                }
                .mobile-flex-item-tag {
                    font-size: 23px;
                }
                .mobile-quick-links span {
                    font-size: 0.8rem;
                    height: 2rem;
                    color: var(--text-font-color);
                }
                .mobile-footer-flex-link-container {
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;
                    justify-content: space-between;
                    height: 10rem;
                    font-weight: 400;
                    font-size: 16px;
                    text-transform: capitalize;
                    letter-spacing: 0.6px;
                }
                .mobile-flex-item-tag {
                    font-weight: 700;
                    font-size: 25px;
                }
                .mobile-footer-address {
                    margin-top: 10px;
                }
                /* .mobile-footer-address a {
                    text-decoration: none;
                    color: var(--text-font-color);
                }
                .mobile-footer-address a:hover {
                    opacity: 0.5;
                } */
                .mobile-social {
                    display: flex;
                    justify-content: space-between;
                    width: 46%;
                }
            
                .mobile-copyright {
                    background-color: var(--footer-end-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 70px;
                }
                .copyright {
                    font-size: 0.9rem;
                }
            
            }
            
        </style>
       
<!-- --------------------------------------------------------------------  -->
        <!--   the footer -->
<footer>

  <!-- for large screen -->
  <div class="footer-container">
      <div class="footer-link-container">
          <div class="footer-flex-item">
            <img src="./src/images/logo.svg" alt="company's logo">
          </div>

          <div class="footer-flex-item q-link">
              <h3 class="flex-item-tag">Quick Links</h3>
              <div class="footer-flex-link-container">
                <span><a href="./index.html" class="link">Home</a></span>
                <span><a href="./about.html" class="link">About Us</a></span>
                <span>Our Services</span>
                <span><a href="./contact-page.html" class="link">Contact Us</a></span>
                <span><a href="./privacy.html" class="link">Privacy</a></span>
              </div>
          </div>

          <div class="footer-flex-item">
                <h3 class="flex-item-tag">Services</h3>
                <div class="footer-flex-link-container">
                  <span>software engineering</span>
                  <span>websites development</span>
                  <span>user focused designs</span>
                  <span>business development <br> services</span>
                </div>
          </div>


          <div class="footer-flex-item">
                <h3 class="flex-item-tag ">Address</h3>
                <div class="footer-flex-link-container flex-address">
                  <div class="footer-address"><a href="https://goo.gl/maps/H3ZATeNMD2AstAmd9" target="_blank">1, Providence House, Admiralty way
                     Lekki Phase 1, Lekki, Lagos State</a>
                  </div>
                  
                  <div>
                    <h3 class="footer-contact-info">Contact Information</h3>
                    <span class="footer-telephone"><a href="tel:+2349035883528">Tel : +234-903-588-3528</a></span>
                    <span>support@huygensoft.com</span>
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
        <span><a href="#"><img src="./src/images/fb-icon.svg" alt="" class="btn-link"></a></span>
        <span><a href="#"><img src="./src/images/whatsapp-icon.svg" alt="" class="btn-link"></a></span>
        <span><a href="#"><img src="./src/images/instagram-icon.svg" alt="" class="btn-link"></a></span>
        <span><a href="https://twitter.com/huygensoft"><img src="./src/images/twitter -icon.svg" alt="" class="btn-link"></a></span>
      </div>
  </div>



  
// ------------------------------------------------------------------

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
        <span>support@huygensoft.com</span>
      </div>

      <!-- social icons -->
      <div class="mobile-social">
        <span><a href="#"><img src="./src/images/fb-icon.svg" alt="" class=""></a></span>
        <span><a href="#"><img src="./src/images/whatsapp-icon.svg" alt=""></a></span>
        <span><a href="#"><img src="./src/images/instagram-icon.svg" alt=""></a></span>
        <span><a href="https://twitter.com/huygensoft"><img src="./src/images/twitter -icon.svg" alt=""></a></span>
      </div>
  </div>
<!-- mobile footer link container ends -->

<!-- mobile copyright -->
<div class="mobile-copyright">
<p class="copyright">Copyright &copy;<span id="footer-year"></span> | All Rights Reserved</p>
</div>


</footer>




        
        `;
    }
}

customElements.define('main-footer', Footer);