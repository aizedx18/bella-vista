
// =============================
// MOBILE NAVBAR
// =============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});

// Close menu after clicking a navigation link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


// =============================
// 
// =============================
// RESERVATION FORM
// =============================

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
    initialCountry: "us",
    separateDialCode: true,
    loadUtils: () => import(
        "https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.8/dist/js/utils.js"
    )
});

const reservationForm = document.querySelector("#reservation-form");
const formMessage = document.querySelector("#form-message");

reservationForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    try {

        await iti.promise;

        if (!iti.isValidNumber()) {
            formMessage.textContent =
                "Please enter a valid international phone number.";
            return;
        }

        const customerName = document.querySelector("#name").value;
        const customerEmail = document.querySelector("#email").value;
        const customerPhone = iti.getNumber();
        const reservationDate = document.querySelector("#date").value;
        const guests = document.querySelector("#guests").value;

        formMessage.textContent =
            `Thank you, ${customerName}! Your reservation request for ${guests} guest(s) on ${reservationDate} has been received. We will contact you at ${customerEmail} or ${customerPhone}.`;

        reservationForm.reset();

        iti.setNumber("");

    } catch (error) {

        console.error("Phone validation error:", error);

        formMessage.textContent =
            "Phone validation could not load. Please refresh and try again.";

    }

});




const dateInput = document.getElementById("date");

const today = new Date().toISOString().split("T")[0];

dateInput.setAttribute("min", today);