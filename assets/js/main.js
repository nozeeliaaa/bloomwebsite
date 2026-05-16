/* ─── Nav toggle ─────────────────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-links');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

  document.addEventListener('click', e => {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* ─── Footer year ────────────────────────────────────────────────────────── */
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

/* ─── Contact form ───────────────────────────────────────────────────────── */
const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = document.querySelector('[data-form-status]');

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message
    ].join('\n');
    const mailto = `mailto:bloomhelpdesk1@gmail.com?subject=${encodeURIComponent('New Bloom Website Enquiry')}&body=${encodeURIComponent(body)}`;

    contactStatus.className = 'form-status success';
    contactStatus.textContent = 'Opening your email app with the message ready to send.';
    window.location.href = mailto;
  });
}

/* ─── Scroll-reveal ──────────────────────────────────────────────────────── */
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealItems.forEach(item => revealObserver.observe(item));

/* ─── Stat counter animation ─────────────────────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  if (isNaN(target)) return;
  const duration = 1200;
  const step     = 16;
  let   current  = 0;
  const increment = target / (duration / step);
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, step);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}
