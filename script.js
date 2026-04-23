// =========================================
// PRELOADER
// =========================================
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }, 2200);
});

// =========================================
// CUSTOM CURSOR
// =========================================
const cursorGlow = document.getElementById("cursorGlow");
const cursorDot = document.getElementById("cursorDot");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => {
  cursorDot.style.width = "14px";
  cursorDot.style.height = "14px";
});

document.addEventListener("mouseup", () => {
  cursorDot.style.width = "8px";
  cursorDot.style.height = "8px";
});

// =========================================
// SCROLL PROGRESS
// =========================================
window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
});

// =========================================
// THEME TOGGLE
// =========================================
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// =========================================
// HAMBURGER MENU
// =========================================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// =========================================
// TYPING EFFECT
// =========================================
const words = [
  "HTML Developer",
  "CSS Stylist",
  "JavaScript Coder",
  "Python Programmer",
  "C / C++ Enthusiast",
  "Backend Developer",
  "UI/UX Designer",
];
let wordIndex = 0,
  charIndex = 0,
  isDeleting = false;

function typeWriter() {
  const current = words[wordIndex];
  const el = document.getElementById("typingText");
  if (!el) return;

  if (isDeleting) {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeWriter, isDeleting ? 60 : 100);
}

setTimeout(typeWriter, 2500);

// =========================================
// REVEAL ON SCROLL
// =========================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

revealEls.forEach((el) => revealObserver.observe(el));

// =========================================
// COUNTER ANIMATION
// =========================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (target > 1 ? "+" : "st");
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".counter")
  .forEach((el) => counterObserver.observe(el));

// =========================================
// SKILL BARS ANIMATION
// =========================================
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".skill-bar-fill");
        bars.forEach((bar) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + "%";
          }, 200);
        });
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll(".skills-group")
  .forEach((el) => skillBarObserver.observe(el));

// Also trigger for github section skill bars
document
  .querySelectorAll(".github-contrib")
  .forEach((el) => skillBarObserver.observe(el));

// =========================================
// GITHUB CONTRIBUTION GRID
// =========================================
function generateContribGrid() {
  const grid = document.getElementById("contribGrid");
  if (!grid) return;
  const cells = 52 * 7;

  for (let i = 0; i < cells; i++) {
    const cell = document.createElement("div");
    cell.className = "contrib-cell";
    const r = Math.random();
    if (r > 0.85) cell.classList.add("level-4");
    else if (r > 0.7) cell.classList.add("level-3");
    else if (r > 0.5) cell.classList.add("level-2");
    else if (r > 0.3) cell.classList.add("level-1");
    grid.appendChild(cell);
  }
}

generateContribGrid();

// =========================================
// CONTACT FORM
// =========================================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector(".submit-btn");
  btn.textContent = "⏳ Sending...";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "✅ Sent!";
    btn.style.background = "linear-gradient(135deg, #00C851, #007E33)";
    document.getElementById("formSuccess").style.display = "block";
    this.reset();
    setTimeout(() => {
      btn.textContent = "🚀 Send Message";
      btn.style.background = "";
      btn.disabled = false;
      document.getElementById("formSuccess").style.display = "none";
    }, 4000);
  }, 1500);
});

// =========================================
// 3D CARD TILT
// =========================================
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// =========================================
// SMOOTH SCROLL
// =========================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
