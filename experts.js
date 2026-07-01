// ── Reveal animation ─────────────────────────────────────────────
// Reveal all cards (with a slight stagger) when the section enters view.
// We observe the SECTION, not each card, because off-screen cards in the
// swipe row would otherwise never trigger and stay invisible.
const expertsSection = document.querySelector('.experts');
const expertCards = document.querySelectorAll('.expert-card');

function revealAll() {
  expertCards.forEach((card, i) => {
    window.setTimeout(() => card.classList.add('is-visible'), i * 80);
  });
}

if (!('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !expertsSection) {
  expertCards.forEach((card) => card.classList.add('is-visible'));
} else {
  const sectionObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealAll();
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  sectionObserver.observe(expertsSection);
}

// ── Swipe ────────────────────────────────────────────────────────
// Touch and trackpad swipe are handled natively by the browser
// (overflow-x + scroll-snap in the CSS). This adds click-and-drag so
// mouse users on desktop can swipe the row too.
const viewport = document.querySelector('.experts__viewport');

if (viewport) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return; // touch/pen scroll natively
    isDown = true;
    startX = e.clientX;
    startScroll = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    viewport.scrollLeft = startScroll - (e.clientX - startX);
  });

  function endDrag() {
    if (!isDown) return;
    isDown = false;
    viewport.classList.remove('is-dragging'); // re-enables snap -> settles
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);
}
