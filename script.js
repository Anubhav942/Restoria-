/* =========================================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =========================================================
   FIREBASE IMPORTS
========================================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */
const firebaseConfig = {
  apiKey: "AIzaSyAyP0zfpbm0qC9qwHovrjDdFrDrL9tjuLs",
  authDomain: "restoria-hotel-and-resort.firebaseapp.com",
  projectId: "restoria-hotel-and-resort",
  storageBucket: "restoria-hotel-and-resort.appspot.com",
  messagingSenderId: "461347700800",
  appId: "1:461347700800:web:33b05de746d03d5320dfa5",
  measurementId: "G-CXPQJQTZ85"
};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


/* =========================================================
   BOOKING FORM → FIRESTORE
========================================================= */
const bookingForm = document.getElementById("booking-form");

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;

  const bookingData = {
    name: form.querySelector('input[placeholder="Name"]').value,
    email: form.querySelector('input[placeholder="Email"]').value,
    room: form.querySelector('#rooms').value,
    days: form.querySelector('#days')?.value || "",
    guests: form.querySelector('#guests')?.value || "",
    createdAt: new Date().toISOString()
  };

  try {
    await addDoc(
      collection(db, "RestoriaHotelsAndResorts", "BookingDoc", "bookings"),
      bookingData
    );

    alert("✔ Booking submitted successfully!");
    form.reset();

  } catch (error) {
    console.error("Firestore Error:", error);
    alert("❌ Error submitting booking!");
  }
});


/* =========================================================
   LOGO → SCROLL TO TOP
========================================================= */
document.querySelector(".logo")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =========================================================
   SCROLL FADE-IN ANIMATION
========================================================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});


/* =========================================================
   MOBILE NAVBAR (HAMBURGER)
========================================================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


/* =========================================================
   LOGOUT BUTTON LOGIC
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("restoriaLoggedIn");
    window.location.href = "login.html";
  });
});



document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
