(() => {
  const I = window.SUPPORT_FIGMA?.I;
  if (!I) return;
  document.querySelectorAll("[data-sup-a]").forEach((el) => {
    const k = el.getAttribute("data-sup-a");
    if (I[k]) el.src = I[k];
  });
})();

const $ = (s) => document.querySelector(s);

const navToggle = $("#navToggle");
const siteNav = $("#siteNav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const o = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(o));
  });
}

const y = $("#y");
if (y) y.textContent = String(new Date().getFullYear());
