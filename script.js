/* ===== Nav ===== */
const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ===== Petals ===== */
const petalsBox = document.getElementById('petals');
const PETAL_COLORS = [
  'rgba(214,198,238,.75)',
  'rgba(239,207,219,.75)',
  'rgba(255,255,255,.7)',
  'rgba(183,158,224,.7)'
];
for (let i = 0; i < 14; i++) {
  const p = document.createElement('span');
  p.className = 'petal';
  const size = 9 + Math.random() * 10;
  p.style.width = p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.background = PETAL_COLORS[i % PETAL_COLORS.length];
  p.style.animationDuration = 11 + Math.random() * 12 + 's';
  p.style.animationDelay = -Math.random() * 20 + 's';
  petalsBox.appendChild(p);
}

/* ===== Reveal on scroll ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ===== Lightbox ===== */
const items = Array.from(document.querySelectorAll('.m-item'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCount = document.getElementById('lbCount');
let current = 0;

function openLb(i) {
  current = (i + items.length) % items.length;
  const src = items[current].querySelector('img').src;
  lbImg.src = src;
  lbCount.textContent = (current + 1) + ' / ' + items.length;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

items.forEach((it, i) => it.addEventListener('click', () => openLb(i)));
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); openLb(current - 1); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); openLb(current + 1); });
lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target === lbImg) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') openLb(current - 1);
  if (e.key === 'ArrowLeft') openLb(current + 1);
});

/* ===== Reels ===== */
document.querySelectorAll('.reel-card').forEach(card => {
  const video = card.querySelector('video');
  card.addEventListener('click', () => {
    if (video.paused) {
      document.querySelectorAll('.reel-card video').forEach(v => {
        if (v !== video) { v.pause(); v.closest('.reel-card').classList.remove('playing'); }
      });
      video.play().then(() => card.classList.add('playing')).catch(() => {});
    } else {
      video.pause();
      card.classList.remove('playing');
    }
  });
  video.addEventListener('ended', () => card.classList.remove('playing'));
});
