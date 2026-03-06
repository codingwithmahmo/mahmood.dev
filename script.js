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
  updateCarouselColors();
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
// Each entry has: name, svg (raw SVG/img string), color (brand color for light), darkColor (for dark mode)
const techStack = [
  {
    name: 'Next.js',
    color: '#000000',
    darkColor: '#ffffff',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="26" height="26" alt="Next.js" loading="lazy">`
  },
  {
    name: 'Node.js',
    color: '#339933',
    darkColor: '#6abf47',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="26" height="26" alt="Node.js" loading="lazy">`
  },
  {
    name: 'JavaScript',
    color: '#f0db4f',
    darkColor: '#f0db4f',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="26" height="26" alt="JavaScript" loading="lazy">`
  },
  {
    name: 'HTML',
    color: '#e34c26',
    darkColor: '#f06529',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="26" height="26" alt="HTML5" loading="lazy">`
  },
  {
    name: 'CSS',
    color: '#264de4',
    darkColor: '#4a90e2',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="26" height="26" alt="CSS3" loading="lazy">`
  },
  {
    name: 'Python',
    color: '#3572A5',
    darkColor: '#4b9cd3',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="26" height="26" alt="Python" loading="lazy">`
  },
  {
    name: 'Django',
    color: '#092e20',
    darkColor: '#44b78b',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" width="26" height="26" alt="Django" loading="lazy">`
  },
  {
    name: 'Tailwind',
    color: '#38bdf8',
    darkColor: '#38bdf8',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="26" height="26" alt="Tailwind CSS" loading="lazy">`
  },
  {
    name: 'Bootstrap',
    color: '#7952b3',
    darkColor: '#a882ff',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" width="26" height="26" alt="Bootstrap" loading="lazy">`
  },
  {
    name: 'Prisma',
    color: '#0c344b',
    darkColor: '#a8d8ea',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="26" height="26" alt="Prisma" loading="lazy">`
  },
  {
    name: 'TensorFlow',
    color: '#ff6f00',
    darkColor: '#ff9a3c',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" width="26" height="26" alt="TensorFlow" loading="lazy">`
  },
  {
    name: 'TypeScript',
    color: '#3178c6',
    darkColor: '#5ba0ef',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="26" height="26" alt="TypeScript" loading="lazy">`
  },
  {
    name: 'React',
    color: '#61dafb',
    darkColor: '#61dafb',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="26" height="26" alt="React" loading="lazy">`
  },
  {
    name: 'Figma',
    color: '#a259ff',
    darkColor: '#c084fc',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" width="26" height="26" alt="Figma" loading="lazy">`
  },
  {
    name: 'MongoDB',
    color: '#47a248',
    darkColor: '#6abf69',
    svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" width="26" height="26" alt="MongoDB" loading="lazy">`
  },
];

// Split into two rows — slightly different orders for variety
const row1 = techStack;
const row2 = [...techStack.slice(7), ...techStack.slice(0, 7)];

function buildCarouselRow(trackEl, items) {
  const all = [...items, ...items];
  all.forEach(tech => {
    const pill = document.createElement('div');
    pill.className = 'stack-pill';
    pill.setAttribute('data-color', tech.color);
    pill.setAttribute('data-dark-color', tech.darkColor);

    const iconWrap = document.createElement('span');
    iconWrap.className = 'pill-icon svg-icon';
    iconWrap.innerHTML = tech.svg;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    iconWrap.style.color = isDark ? tech.darkColor : tech.color;

    const nameEl = document.createElement('span');
    nameEl.className   = 'pill-name';
    nameEl.textContent = tech.name;

    pill.appendChild(iconWrap);
    pill.appendChild(nameEl);
    trackEl.appendChild(pill);
  });
}

function updateCarouselColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.stack-pill').forEach(pill => {
    const icon = pill.querySelector('.svg-icon');
    if (!icon) return;
    icon.style.color = isDark
      ? pill.getAttribute('data-dark-color')
      : pill.getAttribute('data-color');
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