// ===============================
// ELEMENTS
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const toast = document.getElementById("toast");
const backToTop = document.getElementById("backToTop");

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const authModal = document.getElementById("authModal");
const authForm = document.getElementById("authForm");

// ===============================
// TOAST FUNCTION
// ===============================
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ===============================
// MOBILE MENU
// ===============================
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ===============================
// THEME TOGGLE
// ===============================
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
    showToast("Light mode enabled");
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
    showToast("Dark mode enabled");
  }
});

// ===============================
// LOGIN MODAL
// ===============================
openModalBtn.addEventListener("click", () => {
  authModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  authModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === authModal) {
    authModal.style.display = "none";
  }
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("authName").value;

  showToast(`Welcome, ${name}! Login successful`);
  authModal.style.display = "none";
  authForm.reset();
});

// ===============================
// BOOK NOW BUTTONS
// ===============================
document.querySelectorAll(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    showToast("Ride booked successfully 🚗");
  });
});

// ===============================
// FILTER BUTTONS
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const rideCards = document.querySelectorAll(".ride-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    rideCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || filter === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    showToast(`Showing ${filter} rides`);
  });
});

// ===============================
// SEARCH RIDE FORM
// ===============================
const searchForm = document.getElementById("searchForm");
const searchResult = document.getElementById("searchResult");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const from = document.getElementById("fromLocation").value;
  const to = document.getElementById("toLocation").value;
  const date = document.getElementById("travelDate").value;

  searchResult.style.display = "block";
  searchResult.style.background = "#082f49";
  searchResult.style.color = "#bae6fd";
  searchResult.innerHTML = `
    Ride found from <strong>${from}</strong> to <strong>${to}</strong> on <strong>${date}</strong> 🚗<br><br>
    Estimated fare: <strong>₹120</strong><br>
    Seats available: <strong>3</strong><br>
    Driver rating: <strong>4.8⭐</strong>
  `;

  showToast("Ride search completed");
  searchForm.reset();
});

// ===============================
// OFFER RIDE FORM
// ===============================
const offerForm = document.getElementById("offerForm");
const offerResult = document.getElementById("offerResult");

offerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("driverName").value;
  const from = document.getElementById("offerFrom").value;
  const to = document.getElementById("offerTo").value;
  const seats = document.getElementById("seats").value;

  offerResult.style.display = "block";
  offerResult.style.background = "#052e16";
  offerResult.style.color = "#bbf7d0";
  offerResult.innerHTML = `
    Ride successfully offered by <strong>${name}</strong> ✅<br><br>
    Route: <strong>${from}</strong> → <strong>${to}</strong><br>
    Available Seats: <strong>${seats}</strong>
  `;

  showToast("Ride offered successfully");
  offerForm.reset();
});

// ===============================
// FARE CALCULATOR
// ===============================
const fareForm = document.getElementById("fareForm");
const fareResult = document.getElementById("fareResult");

fareForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const distance = parseFloat(document.getElementById("distance").value);
  const fuelCost = parseFloat(document.getElementById("fuelCost").value);
  const passengers = parseInt(document.getElementById("passengers").value);

  if (passengers <= 0) {
    showToast("Passengers must be greater than 0");
    return;
  }

  const totalCost = distance * fuelCost;
  const perPerson = totalCost / passengers;

  fareResult.style.display = "block";
  fareResult.style.background = "#1e1b4b";
  fareResult.style.color = "#c4b5fd";
  fareResult.innerHTML = `
    Total trip cost: <strong>₹${totalCost.toFixed(2)}</strong><br><br>
    Cost per person: <strong>₹${perPerson.toFixed(2)}</strong>
  `;

  showToast("Fare calculated successfully");
  fareForm.reset();
});

// ===============================
// FAQ ACCORDION
// ===============================
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    document.querySelectorAll(".faq-answer").forEach((item) => {
      if (item !== answer) {
        item.style.maxHeight = null;
      }
    });

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ===============================
// NEWSLETTER FORM
// ===============================
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Subscribed successfully 🎉");
  newsletterForm.reset();
});

// ===============================
// CONTACT FORM
// ===============================
const contactForm = document.getElementById("contactForm");
const contactResult = document.getElementById("contactResult");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contactName").value;

  contactResult.style.display = "block";
  contactResult.style.background = "#3f1d0d";
  contactResult.style.color = "#fed7aa";
  contactResult.innerHTML = `
    Thank you, <strong>${name}</strong>! Your message has been sent successfully 📩
  `;

  showToast("Message sent successfully");
  contactForm.reset();
});

// ===============================
// BACK TO TOP BUTTON
// ===============================
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===============================
// COUNTER ANIMATION
// ===============================
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function runCounters() {
  if (counterStarted) return;

  const heroSection = document.querySelector(".hero");
  const heroTop = heroSection.getBoundingClientRect().top;

  if (heroTop < window.innerHeight * 0.8) {
    counterStarted = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = Math.ceil(target / 80);

      const updateCounter = () => {
        count += increment;

        if (count < target) {
          counter.textContent = count;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", runCounters);
window.addEventListener("load", runCounters);
