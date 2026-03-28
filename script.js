// ===== Theme Toggle =====
const html = document.documentElement;

// Resume Download Force
document.querySelector('a[download]').addEventListener('click', function(e) {
  e.preventDefault();
  const link = document.createElement('a');
  link.href = './CV/gottamDhanushresumeds.pdf';
  link.download = 'gottamDhanushresumeds.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

const themeToggle = document.getElementById("themeToggle");

function applyTheme(dark) {
  html.classList.toggle("dark", dark);
  themeToggle.classList.toggle("dark-icon", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

applyTheme(localStorage.getItem("theme") === "dark");

themeToggle.addEventListener("click", () => {
  applyTheme(!html.classList.contains("dark"));
});

// ===== Mobile Menu =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerPath = document.getElementById("hamburgerPath");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  hamburgerPath.setAttribute("d", menuOpen ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18");
});

mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    hamburgerPath.setAttribute("d", "M3 6h18M3 12h18M3 18h18");
  });
});

// ===== Intersection Observer (Fade In) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ===== Skills Tree Animation =====
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-tree");
    }
  });
}, { threshold: 0.2 });

if (document.getElementById('skillsTree')) {
  skillsObserver.observe(document.getElementById('skillsTree'));
}
if (document.getElementById('trainingTree')) {
  skillsObserver.observe(document.getElementById('trainingTree'));
};

// ===== Certificate Modal =====
const certModal = document.getElementById('certModal');
const modalCertImg = document.getElementById('modalCertImg');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('[data-cert]').forEach(btn => {
  btn.addEventListener('click', () => {
    const imgSrc = btn.dataset.cert;
    modalCertImg.src = imgSrc;
    certModal.classList.add('active');
  });
});

modalClose.addEventListener('click', () => {
  certModal.classList.remove('active');
});

certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('active')) {
    certModal.classList.remove('active');
  }
});

// ===== Contact Form =====


// ===== Particle Canvas =====
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.30,
    vy: (Math.random() - 0.5) * 0.30,
    size: Math.random() * 0.9 + 0.3,
    baseAlpha: 0.4 + Math.random() * 0.4,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.0008 + Math.random() * 0.0004
  });
}

let time = 0;
function animateParticles() {
  time += 0.016; // ~60fps delta
  ctx.fillStyle = 'rgba(2,3,9,0.4)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    
    // Screen wrap for infinite floating feel
    if (p.x < 0) p.x += canvas.width;
    if (p.x > canvas.width) p.x -= canvas.width;
    if (p.y < 0) p.y += canvas.height;
    if (p.y > canvas.height) p.y -= canvas.height;
    
    // Twinkle effect
    p.alpha = p.baseAlpha + Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.2;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, p.alpha)})`;
    ctx.fill();
  });
  
  requestAnimationFrame(animateParticles);
}
animateParticles();
