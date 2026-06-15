const revealItems = document.querySelectorAll(".reveal");
const revealVisibleItems = () => {
  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) {
      return;
    }

    const rect = item.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) {
      item.classList.add("is-visible");
    }
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
    revealObserver.observe(item);
  });

  window.addEventListener("load", revealVisibleItems, { once: true });
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.setTimeout(revealVisibleItems, 120);
  window.setTimeout(revealVisibleItems, 650);
  window.setTimeout(revealVisibleItems, 1200);
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const header = document.querySelector(".site-header");

const syncHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => activeObserver.observe(section));
}
