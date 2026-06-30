// ── Reveal animation ─────────────────────────────────────────────
// Reveal all cards (with a slight stagger) when the section enters view.
// We observe the SECTION, not each card, because off-screen carousel
// cards would otherwise never trigger and stay invisible.
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

// ── Carousel ─────────────────────────────────────────────────────
const grid = document.querySelector('.experts__grid');
const cards = grid ? Array.from(grid.querySelectorAll('.expert-card')) : [];
const prevBtn = document.querySelector('.experts-prev');
const nextBtn = document.querySelector('.experts-next');

if (grid && cards.length) {
  let index = 0;

  function visibleCount() {
    const w = window.innerWidth;
    if (w <= 700) return 1;
    if (w <= 1050) return 3;
    return 5;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCount());
  }

  // Distance from one card's left edge to the next (card width + gap),
  // measured live so it stays correct at any screen size.
  function stepSize() {
    if (cards.length < 2) return 0;
    const a = cards[0].getBoundingClientRect().left;
    const b = cards[1].getBoundingClientRect().left;
    return b - a; // transform-invariant: both shift together
  }

  function update() {
    if (index > maxIndex()) index = maxIndex();
    if (index < 0) index = 0;
    grid.style.transform = `translateX(-${index * stepSize()}px)`;
    if (prevBtn) prevBtn.disabled = index <= 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (index < maxIndex()) { index++; update(); }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (index > 0) { index--; update(); }
    });
  }

  // Recalculate on resize (debounced).
  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(update, 120);
  });

  // Initial position (and again after images load, so widths are final).
  update();
  window.addEventListener('load', update);
}
