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
