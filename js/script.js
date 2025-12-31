// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger
  const spans = navToggle.querySelectorAll("span");
  spans[0].style.transform = navMenu.classList.contains("active")
    ? "rotate(45deg) translate(5px, 5px)"
    : "none";
  spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
  spans[2].style.transform = navMenu.classList.contains("active")
    ? "rotate(-45deg) translate(7px, -6px)"
    : "none";
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 17, 40, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(10, 17, 40, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

// Contact Form Handler
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  console.log("Form submitted:", data);

  // Show success message
  showMessage(
    "Thank you for your message! We will get back to you soon.",
    "success"
  );

  // Reset form
  contactForm.reset();
});

// Newsletter Form Handler
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = newsletterForm.querySelector('input[type="email"]').value;

  console.log("Newsletter subscription:", email);

  // Show success message
  showMessage(
    "Thank you for subscribing! Check your email for your 10% discount code.",
    "success"
  );

  // Reset form
  newsletterForm.reset();
});

// Message notification function
function showMessage(message, type) {
  // Remove any existing messages
  const existingMsg = document.querySelector(".notification-message");
  if (existingMsg) {
    existingMsg.remove();
  }

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `notification-message ${type}`;
  messageDiv.textContent = message;

  // Add styles
  messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4caf50" : "#f44336"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;

  document.body.appendChild(messageDiv);

  // Remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".cta-card, .event-card, .faq-item, .info-item")
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");

  if (hero && scrolled <= window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});

// Add hover effect to event cards
document.querySelectorAll(".event-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Countdown timer for Memorial Day (May 23, 2026)
function updateCountdown() {
  const eventDate = new Date("May 23, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // You can display this countdown somewhere on the page if needed
    console.log(
      `Countdown: ${days}d ${hours}h ${minutes}m until Memorial Day 2026`
    );
  }
}

// Update countdown every minute
updateCountdown();
setInterval(updateCountdown, 60000);

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add real-time validation to email inputs
document.querySelectorAll('input[type="email"]').forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      this.style.borderColor = "#f44336";
      showMessage("Please enter a valid email address", "error");
    } else {
      this.style.borderColor = "#ddd";
    }
  });
});

// Loading animation (optional - for when page loads)
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

console.log("Not Forgotten - Memorial Day Tribute Website Loaded Successfully");
