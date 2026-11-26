const header = document.querySelector(".site-header");
const nav = document.querySelector("#nav");
const toggle = document.querySelector(".nav-toggle");

function setMenu(open) {
  if (!nav || !toggle) return;
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  document.body.classList.toggle("no-scroll", open);
}

toggle?.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    toggle.focus();
  }
});

window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const faqTriggers = document.querySelectorAll(".faq__trigger");

faqTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));

    faqTriggers.forEach((other) => {
      if (other === trigger) return;
      const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
      other.setAttribute("aria-expanded", "false");
      if (otherPanel) otherPanel.hidden = true;
    });

    trigger.setAttribute("aria-expanded", String(!isOpen));
    if (panel) panel.hidden = isOpen;
  });
});

const pdpList = [...document.querySelectorAll(".pdp[data-product]")];

if (pdpList.length) {
  const key = new URLSearchParams(location.search).get("p");
  const active = pdpList.find((item) => item.dataset.product === key) || pdpList[0];

  pdpList.forEach((item) => {
    item.hidden = item !== active;
  });

  const name = active.dataset.name;
  document.title = `${name} — Seraya`;

  const crumb = document.querySelector("[data-crumb]");
  if (crumb) crumb.textContent = name;

  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", active.querySelector(".lead")?.textContent.trim() ?? name);

  const crossCards = [...document.querySelectorAll("[data-cross]")];
  if (crossCards.length) {
    const picks = crossCards.filter((card) => card.dataset.cross !== active.dataset.product).slice(0, 3);
    crossCards.forEach((card) => {
      card.hidden = !picks.includes(card);
    });
    picks.at(-1)?.classList.add("product--end");
  }
}

/* Reveal on scroll fallback for browsers without scroll-driven animations. */
const revealTargets =
  ".section-head, .benefit, .value, .product, .testimonial, .promo__copy, .promo__badge, .faq__item, .cta-card, .pdp__media, .pdp__info > *, .pdp__detail > *, .pdp__block--wide, .pdp__disclaimer";

if (!CSS.supports("animation-timeline: view()") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px" }
  );

  document.querySelectorAll(revealTargets).forEach((element) => {
    element.dataset.reveal = "";
    observer.observe(element);
  });
}
