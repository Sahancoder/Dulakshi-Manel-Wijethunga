// ===== Mobile menu =====
var menuToggle = document.getElementById("menu-toggle");
var mainNav = document.getElementById("main-nav");

function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu after a link is chosen, or when Escape is pressed
mainNav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        closeMenu();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// ===== Task 1: Welcome message =====
var welcomeMessage = document.getElementById("welcome-message");
welcomeMessage.textContent = "Welcome to My Personal Website!";
welcomeMessage.hidden = false;

// Hide the message automatically after 5 seconds
setTimeout(function () {
    welcomeMessage.hidden = true;
}, 5000);

// ===== Task 2: Click Me button =====
var clickMeButton = document.getElementById("click-me-button");
var clickMeMessage = document.getElementById("click-me-message");

clickMeButton.addEventListener("click", function () {
    clickMeMessage.textContent = "Thank you for visiting my website!";
});

// ===== Task 3: Current date (uses the visitor's local date) =====
var today = new Date();
var currentDateElement = document.getElementById("current-date");
currentDateElement.textContent = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});
currentDateElement.setAttribute("datetime", today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0"));

// Footer year
document.getElementById("footer-year").textContent = today.getFullYear();

// ===== Task 4: Contact form validation =====
var contactForm = document.getElementById("contact-form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var messageInput = document.getElementById("message");
var formSuccess = document.getElementById("form-success");

function showError(input, text) {
    document.getElementById(input.id + "-error").textContent = text;
    input.classList.add("input-invalid");
    input.setAttribute("aria-invalid", "true");
}

function clearError(input) {
    document.getElementById(input.id + "-error").textContent = "";
    input.classList.remove("input-invalid");
    input.removeAttribute("aria-invalid");
}

function isValidEmail(email) {
    // Simple check: text, one @, text, a dot, text
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formSuccess.textContent = "";

    var nameValue = nameInput.value.trim();
    var emailValue = emailInput.value.trim();
    var messageValue = messageInput.value.trim();
    var firstInvalidField = null;

    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);

    if (nameValue === "") {
        showError(nameInput, "Warning: Please enter your name.");
        firstInvalidField = firstInvalidField || nameInput;
    }

    if (emailValue === "") {
        showError(emailInput, "Warning: Please enter your email address.");
        firstInvalidField = firstInvalidField || emailInput;
    } else if (!isValidEmail(emailValue)) {
        showError(emailInput, "Please enter a valid email address, for example name@example.com.");
        firstInvalidField = firstInvalidField || emailInput;
    }

    if (messageValue === "") {
        showError(messageInput, "Please enter your message.");
        firstInvalidField = firstInvalidField || messageInput;
    }

    if (firstInvalidField) {
        firstInvalidField.focus();
        return;
    }

    // Demonstration only: nothing is sent anywhere
    formSuccess.textContent = "Demo only: your form is valid. This is a frontend demonstration, so no message was actually sent.";
    contactForm.reset();
});

// Remove an error as soon as the user starts correcting the field
[nameInput, emailInput, messageInput].forEach(function (field) {
    field.addEventListener("input", function () {
        clearError(field);
    });
});
