/* ── Drawer ── */
const ham     = document.getElementById('ham');
const drawer  = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

function openD() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  ham.classList.add('open');
}
function closeD() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  ham.classList.remove('open');
}

/* ── Typewriter ── */
const words = [
  'Python Programmer',
  'Front-end Developer',
  'Back-end Developer',
  'UI/UX Designer',
  'Web Developer'
];
let wi = 0, ci = 0, del = false;
const twEl = document.getElementById('tw');

(function type() {
  const w = words[wi];
  if (!del) {
    twEl.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(type, 1900); return; }
  } else {
    twEl.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, del ? 46 : 84);
})();

/* ── Marquee ── */
const techs = [
  { n: 'Python',     s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { n: 'React',      s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { n: 'TypeScript', s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { n: 'JavaScript', s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { n: 'HTML5',      s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { n: 'CSS3',       s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { n: 'MongoDB',    s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { n: 'Prisma',     s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
  { n: 'Next.js',    s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { n: 'Node.js',    s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { n: 'C++',        s: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
];

const mq   = document.getElementById('mqt');
const html = techs.map(t =>
  `<div class="mq-item"><img src="${t.s}" alt="${t.n}" title="${t.n}" loading="lazy"/></div>`
).join('');
mq.innerHTML = html + html; // duplicate for seamless loop

/* ── Scroll reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (x.isIntersecting) {
      x.target.classList.add('in');
      obs.unobserve(x.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => obs.observe(el));

/* ── Contact form ── */
function sendForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fsb');
  btn.textContent = '✓ Sent!';
  btn.style.background = '#1DB954';
  setTimeout(() => {
    btn.textContent = 'Subscribe now';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
