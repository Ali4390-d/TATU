// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
    }
  });
});

// ============ LOCATION TABS (Hero & Locations Sync) ============
const locTabs = document.querySelectorAll('.loc-tab');
const locBtns = document.querySelectorAll('.loc-btn');
const locPanels = document.querySelectorAll('.loc-panel');

function switchLocation(targetId) {
  locPanels.forEach(panel => {
    if (panel.id === targetId) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  locTabs.forEach(tab => {
    if (tab.dataset.target === targetId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  locBtns.forEach(btn => {
    if (btn.dataset.target === targetId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

locTabs.forEach(tab => {
  tab.addEventListener('click', () => switchLocation(tab.dataset.target));
});

locBtns.forEach(btn => {
  btn.addEventListener('click', () => switchLocation(btn.dataset.target));
});

// ============ MENU TABS ============
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanes = document.querySelectorAll('.menu-pane');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    
    menuTabs.forEach(t => t.classList.remove('active'));
    menuPanes.forEach(p => p.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============ GOLDEN SPARKLES CANVAS ============
const sparkleCanvas = document.getElementById('sparkle-canvas');
const ctx = sparkleCanvas.getContext('2d');
let sparkles = [];

function resizeCanvas() {
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Sparkle {
  constructor() {
    this.reset();
    this.y = Math.random() * sparkleCanvas.height;
  }
  reset() {
    this.x = Math.random() * sparkleCanvas.width;
    this.y = -10;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.flicker = Math.random() * 0.05;
  }
  update() {
    this.y += this.speedY;
    this.opacity += (Math.random() - 0.5) * this.flicker;
    if (this.opacity < 0) this.opacity = 0;
    if (this.opacity > 0.6) this.opacity = 0.6;
    if (this.y > sparkleCanvas.height) this.reset();
  }
  draw() {
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initSparkles() {
  for (let i = 0; i < 50; i++) {
    sparkles.push(new Sparkle());
  }
}

function animateSparkles() {
  ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  sparkles.forEach(s => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animateSparkles);
}

initSparkles();
animateSparkles();
