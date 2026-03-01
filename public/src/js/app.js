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

/* Testimonials slider data */
const testimonials = [
    {
        client: "Johnny D.",
        project: "DamolaIO LLC Lead Software Engineer",
        date: "Apr 23, 2023",
        rating: 5.0,
        location: "United States",
        feedback: "The Huygensoft team served as lead software engineers on the DamolaIO LLC project. They delivered high‑quality C# solutions and provided architectural guidance throughout the engagement. A consistently reliable, pragmatic partner."
    },
    {
        client: "Johnny D.",
        project: "Walmart.io API code samples to C#",
        date: "Feb 28, 2021",
        rating: 5.0,
        location: "United States",
        feedback: "This company provided some of the best C# work we’ve seen. Technically brilliant, hardworking and pragmatic. When there was a tough problem it was solved quickly."
    },
    {
        client: "Johnny D.",
        project: "Webhook or Polling Print Automation",
        date: "Oct 19, 2020",
        rating: 5.0,
        location: "United States",
        feedback: "A fantastic team behind the scenes. They handled remote hardware development over great distances and delivered spotless .NET code. Highly recommend for any .NET project."
    },
    {
        client: "Gonzalo M.",
        project: "3CX addons",
        date: "Jul 5, 2021",
        rating: 5.0,
        location: "Chile",
        feedback: "The company was attentive, always maintained a positive attitude, and executed the work perfectly within deadlines. Muy recomendado."
    },
    {
        client: "Mario C.",
        project: "RSS Reader using Xamarin.Forms",
        date: "Jun 18, 2021",
        rating: 5.0,
        location: "Portugal",
        feedback: "Very easy to work with. The team communicated clearly and understood requirements, delivering quality work on schedule. 10/10."
    },
    {
        client: "Ted H.",
        project: "Microsoft C# Developer for Hivebox Lockers",
        date: "Jun 10, 2021",
        rating: 5.0,
        location: "United States",
        feedback: "The company was always willing to make adjustments and accommodate changes as they came up. They took time to explain steps and processes and provided thorough documentation and guidance for rebuilding our application."
    },
    {
        client: "Bostjan L.",
        project: "Windows DLL for extracting data from specific webpage",
        date: "Jun 1, 2021",
        rating: 5.0,
        location: "Slovenia",
        feedback: "A great company with excellent skills, very dedicated and forthcoming; we will definitely hire them again for similar work!"
    },
    {
        client: "Ted H.",
        project: "Microsoft Developer for Hivebox Lockers",
        date: "May 25, 2021",
        rating: 5.0,
        location: "United States",
        feedback: "A perfect fit for our project. We didn’t know what we had or where to go with it; the company took control and guided us to a successful application. Even with the location and language barrier, support was always available during working hours."
    },
    {
        client: "Nicolas R.",
        project: "Xamarin expert to generate spinwheel functionality",
        date: "Mar 7, 2021",
        rating: 5.0,
        location: "Dominican Republic",
        feedback: "Fantastic experience; any adjustments were made without question, all in the interest of customer satisfaction. Looking forward to the next engagement."
    },
    {
        client: "Ghislain Borremans",
        project: "UrlVKey popup program",
        date: "Aug 6, 2020",
        rating: 5.0,
        location: "Belgium",
        feedback: "The team developed the UrlVKey popup application for Windows 10; the client was pleased with the end result and the built‑in localisation support."
    },
    {
        client: "Juan Francisco",
        project: "3cx automation socket",
        date: "Oct 18, 2020",
        rating: 5.0,
        location: "Chile",
        feedback: "An excellent company – they fully understood the work, adapted to changing requirements and delivered everything in line with the project. Definitely recommended."
    },
    {
        client: "Ahmed Z.",
        project: "DevExtreme /.Net Developer for a hosted React SPA",
        date: "Sep 28, 2020",
        rating: 5.0,
        location: "United States",
        feedback: "An amazing company, always finding solutions and doing whatever it took to make things work. Resourceful and enjoyable to work with."
    },
    {
        client: "Noorie Y.",
        project: "Messaging App",
        date: "Sep 1, 2020",
        rating: 5.0,
        location: "Bangladesh",
        feedback: "Very good experience working with this company. They did everything to make sure we were happy with the outcome. Hardworking and patient, they also provided very useful input. We will definitely rehire them."
    },
    {
        client: "Aman B.",
        project: "Job Alert Tool Feedback required",
        date: "Jun 24, 2020",
        rating: 5.0,
        location: "India",
        feedback: "A great find on Upwork. The team went above and beyond what was expected to deliver results. We are ecstatic to have found them. Kudos!"
    },
    {
        client: "Girish M.",
        project: "Get paid to solve and review Azure Questions",
        date: "Jun 24, 2020",
        rating: 5.0,
        location: "India",
        feedback: "Did an excellent job. Delivered high-quality work on time and communicated well with minimal direction."
    },
    {
        client: "Ghislain B.",
        project: "CheckUrl: background program for W10",
        date: "Jun 15, 2020",
        rating: 5.0,
        location: "Belgium",
        feedback: "Very nice person to work with. Good result in limited time frame. I will return to him if I need more work done."
    }
];

function renderTestimonial(test, container, mobile = false) {
    const card = document.createElement('div');
    card.className = mobile ? 'm-card' : 'card';
    card.innerHTML = `
        <div class="${mobile ? 'm-card-paragraph' : 'card-paragraph'}">
            <p>“${test.feedback}”</p>
        </div>
        <div class="${mobile ? 'm-card-client-info-container' : 'card-client-info-container'}">
             <div class="${mobile ? 'm-card-client-info' : 'card-client-info'}">
                 <p class="${mobile ? 'm-client-name' : 'client-name'}">${test.client}</p>
                 <p class="card-client-title">${test.project} <span style="font-weight:400; font-size:14px;">(${test.date})</span></p>
                 <p class="card-client-location" style="font-size:14px; color:#666;">${test.location}</p>
                 <p class="card-rating" style="color:gold;">${'★'.repeat(Math.round(test.rating))}</p>
             </div>
         </div>
     `;
     container.appendChild(card);
}

function initTestimonials() {
    const desktopContainer = document.getElementById('testimonial-container');
    const mobileContainer = document.getElementById('testimonial-mobile');
    if (!desktopContainer || !mobileContainer) return;
    let current = 0;
    function update() {
        desktopContainer.innerHTML = '';
        mobileContainer.innerHTML = '';
        renderTestimonial(testimonials[current], desktopContainer, false);
        renderTestimonial(testimonials[current], mobileContainer, true);
    }
    update();
    const left = document.querySelector('.test-nav-left');
    const right = document.querySelector('.test-nav-right');
    if (left && right) {
        left.addEventListener('click', () => {
            current = (current - 1 + testimonials.length) % testimonials.length;
            update();
        });
        right.addEventListener('click', () => {
            current = (current + 1) % testimonials.length;
            update();
        });
    }
}

// run on load or immediately if already past DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
    initTestimonials();
}