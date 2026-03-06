/* ══════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════ */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ══════════════════════════════════════════
   NAVBAR — SCROLL + ACTIVE LINKS
══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  const sections  = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 130;

  sections.forEach(section => {
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ══════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

/* ══════════════════════════════════════════
   TECH STACK — INFINITE CAROUSEL
══════════════════════════════════════════ */
const techStack = [
  { name: 'NextJS',      icon: '▲',   mono: true },
  { name: 'NodeJS',      icon: '🟢',  mono: false },
  { name: 'JavaScript',  icon: 'JS',  mono: true },
  { name: 'HTML',        icon: '🌐',  mono: false },
  { name: 'CSS',         icon: '🎨',  mono: false },
  { name: 'Python',      icon: '🐍',  mono: false },
  { name: 'Django',      icon: '🎸',  mono: false },
  { name: 'TailwindCSS', icon: '💨',  mono: false },
  { name: 'Bootstrap',   icon: 'B',   mono: true },
  { name: 'Prisma',      icon: '◈',   mono: true },
  { name: 'TensorFlow',  icon: '🧠',  mono: false },
  { name: 'TypeScript',  icon: 'TS',  mono: true },
  { name: 'React',       icon: '⚛',   mono: false },
  { name: 'Figma',       icon: '✏️',  mono: false },
  { name: 'MongoDB',     icon: '🍃',  mono: false },
];

// Split into two rows — slightly different orders for variety
const row1 = techStack;
const row2 = [...techStack.slice(7), ...techStack.slice(0, 7)];

function buildCarouselRow(trackEl, items) {
  // Duplicate items for seamless infinite loop
  const all = [...items, ...items];
  all.forEach(tech => {
    const pill = document.createElement('div');
    pill.className = 'stack-pill';

    const iconEl  = document.createElement('span');
    iconEl.className = tech.mono ? 'pill-icon mono-icon' : 'pill-icon';
    iconEl.textContent = tech.icon;

    const nameEl  = document.createElement('span');
    nameEl.className  = 'pill-name';
    nameEl.textContent = tech.name;

    pill.appendChild(iconEl);
    pill.appendChild(nameEl);
    trackEl.appendChild(pill);
  });
}

const track1 = document.getElementById('track1');
const track2 = document.getElementById('track2');

buildCarouselRow(track1, row1);
buildCarouselRow(track2, row2);

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger by sibling index
      const siblings = Array.from(entry.target.parentElement.children);
      const idx      = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function handleContactSubmit() {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const success = document.getElementById('formSuccess');
  const btn     = document.querySelector('.contact-submit-btn');

  if (!name || !email || !message) {
    btn.style.animation = 'none';
    void btn.offsetWidth; // reflow
    btn.style.animation = 'shake 0.4s ease';
    setTimeout(() => btn.style.animation = '', 450);
    return;
  }

  btn.innerHTML  = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled   = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
    success.classList.add('show');
    document.getElementById('contactName').value    = '';
    document.getElementById('contactEmail').value   = '';
    document.getElementById('contactMessage').value = '';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
      success.classList.remove('show');
    }, 4000);
  }, 1600);
}

// Inject shake keyframe
const ks = document.createElement('style');
ks.textContent = `
@keyframes shake{
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-7px)}
  40%{transform:translateX(7px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}`;
document.head.appendChild(ks);

/* ══════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});