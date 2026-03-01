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
        project: "Lead Software Engineer",
        date: "Apr 23, 2023",
        rating: 5.0,
        location: "United States",
        feedback: "The Huygensoft team served as lead software engineers on the project. They delivered high‑quality C# solutions and provided architectural guidance throughout the engagement. A consistently reliable, pragmatic partner."
    },
    {
        client: "Johnny D.",
        project: "Enterprise API Migration to C#",
        date: "Feb 28, 2021",
        rating: 5.0,
        location: "United States",
        feedback: "The team provided some of the best C# work we’ve seen. They are technically brilliant, hardworking, and pragmatic. Tough problems were solved quickly and efficiently."
    },
    {
        client: "Johnny D.",
        project: "Print Automation Service",
        date: "Oct 19, 2020",
        rating: 5.0,
        location: "United States",
        feedback: "A fantastic team behind the scenes. They handled remote hardware integration seamlessly and delivered spotless .NET code. Highly recommended for any complex .NET project."
    },
    {
        client: "Gonzalo M.",
        project: "3CX Addons",
        date: "Jul 5, 2021",
        rating: 5.0,
        location: "Chile",
        feedback: "They were highly attentive, maintained a positive attitude throughout the engagement, and executed the work perfectly within our strict deadlines. Muy recomendado."
    },
    {
        client: "Mario C.",
        project: "RSS Reader using Xamarin.Forms",
        date: "Jun 18, 2021",
        rating: 5.0,
        location: "Portugal",
        feedback: "Very easy to work with. The team communicated clearly, understood our complex requirements immediately, and delivered exceptional quality work on schedule. 10/10."
    },
    {
        client: "Ted H.",
        project: "Smart Locker Kiosk Application",
        date: "Jun 10, 2021",
        rating: 5.0,
        location: "United States",
        feedback: "The developers were always willing to make adjustments and accommodate evolving changes. They took the time to explain their processes and provided thorough documentation for rebuilding our application."
    },
    {
        client: "Bostjan L.",
        project: "Custom Web Data Extraction DLL",
        date: "Jun 1, 2021",
        rating: 5.0,
        location: "Slovenia",
        feedback: "A great engineering partner with excellent skills. They were very dedicated and proactive; we will definitely hire them again for similar integration work!"
    },
    {
        client: "Ted H.",
        project: "Smart Locker Backend Integration",
        date: "May 25, 2021",
        rating: 5.0,
        location: "United States",
        feedback: "A perfect fit for our project. We didn’t know exactly what we needed initially; their team took control and guided us to a highly successful application. Technical support was always readily available."
    },
    {
        client: "Nicolas R.",
        project: "Cross-Platform Mobile Feature Development",
        date: "Mar 7, 2021",
        rating: 5.0,
        location: "Dominican Republic",
        feedback: "Fantastic experience; any adjustments were made without question, all in the interest of customer satisfaction. Looking forward to the next engagement."
    },
    {
        client: "Ghislain B.",
        project: "Custom Windows Utility Development",
        date: "Aug 6, 2020",
        rating: 5.0,
        location: "Belgium",
        feedback: "They developed a flawless custom utility application for Windows 10. We were incredibly pleased with the end result, performance, and the built-in localization support."
    },
    {
        client: "Juan F.",
        project: "3CX Automation Socket Integration",
        date: "Oct 18, 2020",
        rating: 5.0,
        location: "Chile",
        feedback: "An excellent technical partner. They fully understood the scope, adapted quickly to changing requirements, and delivered everything precisely in line with the project goals. Definitely recommended."
    },
    {
        client: "Ahmed Z.",
        project: "React SPA & .NET Backend Architecture",
        date: "Sep 28, 2020",
        rating: 5.0,
        location: "United States",
        feedback: "An amazing group of professionals, always finding innovative solutions and doing whatever it took to make complex integrations work smoothly. Resourceful and enjoyable to collaborate with."
    },
    {
        client: "Noorie Y.",
        project: "Real-time Messaging Application",
        date: "Sep 1, 2020",
        rating: 5.0,
        location: "Bangladesh",
        feedback: "A very positive experience working with this team. They did everything to ensure we were happy with the outcome. Hardworking and patient, they also provided highly valuable architectural input. We will definitely rehire them."
    },
    {
        client: "Aman B.",
        project: "Automated Job Alert Tool Verification",
        date: "Jun 24, 2020",
        rating: 5.0,
        location: "India",
        feedback: "A tremendous asset to our project. The team went above and beyond expectations to deliver exceptional results. We are ecstatic to have found such reliable technical partners. Kudos!"
    },
    {
        client: "Girish M.",
        project: "Azure Architecture Review & Mentorship",
        date: "Jun 24, 2020",
        rating: 5.0,
        location: "India",
        feedback: "They did an excellent job, delivering high-quality architectural guidance on time. They communicated exceptionally well and required very minimal direction."
    },
    {
        client: "Ghislain B.",
        project: "Windows 10 Background Service Utility",
        date: "Jun 15, 2020",
        rating: 5.0,
        location: "Belgium",
        feedback: "Very professional and easy to work with. They produced a great result within a very limited time frame. I will certainly return to them for future development needs."
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