const nav = document.getElementById("siteNav");
const toggle = document.getElementById("navToggle");
const toast = document.getElementById("toast");
const year = document.getElementById("y");

if (year) year.textContent = String(new Date().getFullYear());

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const o = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(o));
  });
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".icon-btn").forEach((b) => {
  b.addEventListener("click", () => showToast("搜索 / 账户（演示）"));
});

const HOME_ARROW_SVG =
  '<svg class="home-ui-icon home-ui-icon--arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

const HOME_SCENE_SVG = {
  all: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M6 17V11l2-4h8l2 4v6"/></svg>',
  commute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 12h16"/><path d="M4 12l4-4M4 12l4 4"/><circle cx="18" cy="12" r="2"/></svg>',
  outdoor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3l2 4h5l-4 3 1.5 5L12 13l-4.5 2 1.5-5-4-3h5z"/><path d="M6 20h12"/></svg>',
  indoor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/></svg>',
  travel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2"/></svg>',
  care: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z"/></svg>',
  sport: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>',
};

function bindHomeAssets() {
  const data = window.HOME_FIGMA;
  if (!data?.A) return;
  document.querySelectorAll("[data-home-a]").forEach((el) => {
    const key = el.getAttribute("data-home-a");
    const src = data.A[key];
    if (src && el.tagName === "IMG") el.src = src;
  });
  document.querySelectorAll("[data-home-arrow]").forEach((el) => {
    el.innerHTML = HOME_ARROW_SVG;
  });
}

function renderHomeScenes() {
  const root = document.getElementById("homeSceneScroll");
  const data = window.HOME_FIGMA;
  if (!root || !data?.categories) return;
  root.innerHTML = data.categories
    .map(
      (c) => `
    <button type="button" class="home-scene-pill${c.active ? " is-active" : ""}" role="tab" aria-selected="${c.active ? "true" : "false"}" data-scene-id="${c.id}">
      <span class="home-scene-pill__text">
        <strong>${c.label}</strong>
        <span class="home-scene-pill__sub">${c.sub}</span>
      </span>
      <span class="home-scene-pill__ico" aria-hidden="true">${HOME_SCENE_SVG[c.id] || HOME_SCENE_SVG.all}</span>
    </button>`
    )
    .join("");
  root.querySelectorAll(".home-scene-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".home-scene-pill").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
    });
  });
}

function renderHomeSolutions() {
  const root = document.getElementById("homeSolGrid");
  const data = window.HOME_FIGMA;
  if (!root || !data?.solutions) return;
  root.innerHTML = data.solutions
    .map(
      (s) => `
    <a class="home-sol-card" href="./customize.html#3d">
      <div class="home-sol-card__media">
        <img class="cover" alt="" src="${s.img}" width="280" height="200" loading="lazy" decoding="async" />
        <span class="home-sol-card__badge home-sol-card__badge--${s.badge.variant || "default"}">${s.badge.text}</span>
      </div>
      <div class="home-sol-card__body">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="home-sol-card__foot">
          <span class="home-sol-card__price">¥${s.price.toLocaleString("zh-CN")}</span>
          <span class="home-sol-card__arrow" aria-hidden="true">${HOME_ARROW_SVG}</span>
        </div>
      </div>
    </a>`
    )
    .join("");
}

function renderHomeFeatures() {
  const root = document.getElementById("homeFeatGrid");
  const data = window.HOME_FIGMA;
  if (!root || !data?.features) return;
  root.innerHTML = data.features
    .map(
      (f) => `
    <a class="home-feat-card" href="${f.href}">
      <div class="home-feat-card__copy">
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
        <span class="btn-feat">${f.cta}</span>
      </div>
    </a>`
    )
    .join("");
}

if (document.body.classList.contains("page-home")) {
  bindHomeAssets();
  renderHomeScenes();
  renderHomeSolutions();
  renderHomeFeatures();
}
