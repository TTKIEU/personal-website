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


// ============================================
// PROJECT CAROUSELS
// ============================================

const carousels = document.querySelectorAll(
    ".phim-carousel, .project-carousel"
);

carousels.forEach(carousel => {

    const slides =
        carousel.querySelectorAll(".carousel-slide");

    const previousButton =
        carousel.querySelector(".carousel-prev");

    const nextButton =
        carousel.querySelector(".carousel-next");

    const dotsContainer =
        carousel.querySelector(".carousel-dots");


    if (slides.length === 0 || !dotsContainer) {
        return;
    }


    let currentSlide = 0;


    // Clear any existing dots
    dotsContainer.innerHTML = "";


    // IMPORTANT:
    // Remove active from every slide before initializing
    slides.forEach(slide => {
        slide.classList.remove("active");
    });


    // Create dots
    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );


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


    // ========================================
    // FORCE CAROUSEL TO START AT FIRST IMAGE
    // ========================================

    currentSlide = 0;
    showSlide(0);


    // NEXT
    if (nextButton) {

        nextButton.addEventListener("click", event => {

            event.stopPropagation();

            currentSlide =
                (currentSlide + 1) %
                slides.length;

            showSlide(currentSlide);

        });

    }


    // PREVIOUS
    if (previousButton) {

        previousButton.addEventListener("click", event => {

            event.stopPropagation();

            currentSlide =
                (
                    currentSlide
                    - 1
                    + slides.length
                )
                %
                slides.length;

            showSlide(currentSlide);

        });

    }

});


const projectCards =
    document.querySelectorAll(
        ".project-card:not(.phim-card)"
    );

projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

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

// ============================================
// HERO TYPING ANIMATION
// ============================================

const typedTitle =
    document.getElementById("typedTitle");

const typedDescription =
    document.getElementById("typedDescription");

const heroButtons =
    document.querySelector(".hero-buttons-delayed");


function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}


async function typeText(element, text, speed) {

    element.textContent = "";

    /* Make visible only AFTER text has been cleared */
    element.style.visibility = "visible";

    element.classList.add("typing-cursor");


    for (let i = 0; i < text.length; i++) {

        element.textContent += text[i];

        await sleep(speed);

    }


    element.classList.remove("typing-cursor");
}


async function startTypingAnimation() {

    if (!typedTitle || !typedDescription) {
        return;
    }


    /*
        Save paragraph before clearing anything.
    */

    const descriptionText =
        typedDescription.textContent
            .replace(/\s+/g, " ")
            .trim();


    /*
        Clear paragraph immediately while hidden.
        This prevents the flash.
    */

    typedDescription.textContent = "";


    // ========================================
    // TYPE "HEY, I'M "
    // ========================================

    typedTitle.innerHTML = "";

    typedTitle.classList.add(
        "typing-cursor"
    );


    const firstPart = "Hey, I'm ";


    for (let i = 0; i < firstPart.length; i++) {

        typedTitle.append(
            firstPart[i]
        );

        await sleep(70);

    }


    // ========================================
    // TYPE "TAYLIN!"
    // ========================================

    const nameSpan =
        document.createElement("span");

    nameSpan.classList.add(
        "highlight"
    );

    typedTitle.appendChild(
        nameSpan
    );


    const name = "Taylin!";


    for (let i = 0; i < name.length; i++) {

        nameSpan.textContent +=
            name[i];

        await sleep(70);

    }


    typedTitle.classList.remove(
        "typing-cursor"
    );


    // Small pause after title

    await sleep(350);


    // ========================================
    // TYPE DESCRIPTION
    // ========================================

    await typeText(
        typedDescription,
        descriptionText,
        18
    );


    // Small pause

    await sleep(250);


    // ========================================
    // REVEAL BUTTONS
    // ========================================

    if (heroButtons) {

        heroButtons.classList.add(
            "show"
        );

    }

}


startTypingAnimation();