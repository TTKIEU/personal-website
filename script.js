// ------------------------------
// MOBILE MENU
// ------------------------------

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


// ------------------------------
// DARK MODE
// ------------------------------

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀";

}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeButton.textContent = isDark ? "☀" : "☾";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

});


// ------------------------------
// SCROLL REVEAL
// ------------------------------

const revealElements = document.querySelectorAll(
    ".experience-card, .project-card, .skill-group, .intro-grid"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    observer.observe(element);

});


// ------------------------------
// SLIGHT PROJECT CARD TILT
// ------------------------------

const projectCards = document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        // Disable effect on smaller screens
        if (window.innerWidth < 900) {
            return;
        }

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -1.5;

        const rotateY =
            ((x - centerX) / centerX) * 1.5;

        card.style.transform =
            `translateY(-8px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});
// ------------------------------
// PHIM DEMO CAROUSEL
// ------------------------------

const phimCarousel = document.querySelector(".phim-carousel");

if (phimCarousel) {

    const slides =
        phimCarousel.querySelectorAll(".carousel-slide");

    const previousButton =
        phimCarousel.querySelector(".carousel-prev");

    const nextButton =
        phimCarousel.querySelector(".carousel-next");

    const dotsContainer =
        phimCarousel.querySelector(".carousel-dots");

    let currentSlide = 0;


    // Create navigation dots
    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Go to screenshot ${index + 1}`
        );

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", event => {

            event.stopPropagation();

            currentSlide = index;

            showSlide(currentSlide);

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(".carousel-dot");


    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");

        dots[index].classList.add("active");

    }


    nextButton.addEventListener("click", event => {

        event.stopPropagation();

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);

    });


    previousButton.addEventListener("click", event => {

        event.stopPropagation();

        currentSlide =
            (currentSlide - 1 + slides.length)
            % slides.length;

        showSlide(currentSlide);

    });

}