// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  cursorFollower.style.left = `${e.clientX}px`;
  cursorFollower.style.top = `${e.clientY}px`;
});

document.addEventListener("mousedown", () => {
  cursor.style.transform = "scale(0.8)";
  cursorFollower.style.transform = "scale(0.8)";
});

document.addEventListener("mouseup", () => {
  cursor.style.transform = "scale(1)";
  cursorFollower.style.transform = "scale(1)";
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Typing animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Web Developer", "Network Engineer", "Freelancer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from(".hero-content", {
  duration: 1,
  y: 100,
  opacity: 0,
  ease: "power4.out",
});

gsap.from(".hero-image", {
  duration: 1,
  x: 100,
  opacity: 0,
  ease: "power4.out",
  delay: 0.5,
});

// About section animations
gsap.from(".about-content", {
  scrollTrigger: {
    trigger: ".about",
    start: "top center",
  },
  duration: 1,
  y: 100,
  opacity: 0,
  ease: "power4.out",
});

// Skills section animations
gsap.from(".skill-card", {
  scrollTrigger: {
    trigger: ".skills",
    start: "top center",
  },
  duration: 0.8,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: "power4.out",
});

// Projects section animations
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects",
    start: "top center",
  },
  duration: 0.8,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: "power4.out",
});

// Contact section animations
gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top center",
  },
  duration: 1,
  x: -100,
  opacity: 0,
  ease: "power4.out",
});

gsap.from(".contact-info", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top center",
  },
  duration: 1,
  x: 100,
  opacity: 0,
  ease: "power4.out",
  delay: 0.5,
});

// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  hamburger.classList.toggle("active");
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
        hamburger.classList.remove("active");
      }
    }
  });
});

// Form validation and submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Here you would typically send the data to a server
  console.log("Form submitted:", data);

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// Progress bar animation
const progressBars = document.querySelectorAll(".progress");
const animateProgress = () => {
  progressBars.forEach((progress) => {
    const value = progress.getAttribute("data-progress");
    progress.style.width = "0";
    setTimeout(() => {
      progress.style.width = value + "%";
    }, 200);
  });
};

// Animate progress bars when skills section is in view
ScrollTrigger.create({
  trigger: ".skills",
  start: "top center",
  onEnter: animateProgress,
});

// Counter animation for stats
const stats = document.querySelectorAll(".stat-item");
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute("data-value"));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.querySelector(".number").textContent = Math.floor(current) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.querySelector(".number").textContent = target + "+";
    }
  };

  updateCounter();
};

// Animate counters when stats section is in view
ScrollTrigger.create({
  trigger: ".stats",
  start: "top center",
  onEnter: () => {
    stats.forEach(animateCounter);
  },
});

// Floating elements parallax effect
const floatingElements = document.querySelectorAll(".floating-element");
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  floatingElements.forEach((element) => {
    const speed = element.getAttribute("data-speed");
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Scroll to top button
const scrollToTop = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTop.classList.add("visible");
  } else {
    scrollToTop.classList.remove("visible");
  }
});

scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form input animations
const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });
});

// Project card hover effect
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.querySelector(".project-overlay").style.opacity = "1";
  });

  card.addEventListener("mouseleave", () => {
    card.querySelector(".project-overlay").style.opacity = "0";
  });
});

// Add active class to current navigation link
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });
});
