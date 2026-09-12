/* =========================================================
   COMIC PORTFOLIO — Scripts
   ========================================================= */

/* ---------- 1. CURSOR GLOW ---------- */
const glow = document.getElementById("cursorGlow");
let mx = 0, my = 0, gx = 0, gy = 0;

window.addEventListener("mousemove", e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateGlow(){
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;
  glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ---------- 2. SCROLL PROGRESS ---------- */
const scrollBar = document.getElementById("scrollBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (window.scrollY / h) * 100 + "%";
});

/* ---------- 3. NAVBAR SCROLL STATE ---------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/* ---------- 4. TYPEWRITER ---------- */
const phrases = [
  "AI & Data Science Student",
  "Machine Learning Enthusiast",
  "Data Visualization Builder",
  "Problem Solver & Innovator"
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById("typed");

function typeLoop(){
  if(!typedEl) return;
  const current = phrases[pi];
  if(!deleting){
    typedEl.textContent = current.slice(0, ++ci);
    if(ci === current.length){
      deleting = true;
      return setTimeout(typeLoop, 1800);
    }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if(ci === 0){
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 75);
}
setTimeout(typeLoop, 900);

/* ---------- 5. SCROLL REVEAL ---------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if(en.isIntersecting){
      en.target.style.transitionDelay = Math.min(i * 60, 300) + "ms";
      en.target.classList.add("visible");
      revealObs.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

/* ---------- 6. TILT CARDS ---------- */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ---------- 7. ACTIVE NAV ---------- */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if(window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});