const expertCards = document.querySelectorAll('.expert-card');

if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  expertCards.forEach((card) => card.classList.add('is-visible'));
} else {
  const expertObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const cardIndex = [...expertCards].indexOf(entry.target);
      window.setTimeout(() => entry.target.classList.add('is-visible'), cardIndex * 90);
      expertObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  expertCards.forEach((card) => expertObserver.observe(card));
}
const grid = document.querySelector('.experts__grid');
const next = document.querySelector('.experts-next');
const prev = document.querySelector('.experts-prev');

let current = 0;
const visibleCards = 5;

next.addEventListener('click', () => {
    if (current < expertCards.length - visibleCards) {
        current++;
        grid.style.transform = `translateX(-${current * 20}%)`;
    }
});

prev.addEventListener('click', () => {
    if (current > 0) {
        current--;
        grid.style.transform = `translateX(-${current * 20}%)`;
    }
});
