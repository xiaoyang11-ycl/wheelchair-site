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

function bindHomeAssets() {
  const data = window.HOME_FIGMA;
  if (!data?.A) return;
  document.querySelectorAll("[data-home-a]").forEach((el) => {
    const key = el.getAttribute("data-home-a");
    const src = data.A[key];
    if (src) el.src = src;
  });
}

function renderHomeScenes() {
  const root = document.getElementById("homeSceneScroll");
  const data = window.HOME_FIGMA;
  if (!root || !data?.categories) return;
  root.innerHTML = data.categories
    .map(
      (c, i) => `
    <button type="button" class="home-scene-pill${c.active ? " is-active" : ""}" role="tab" aria-selected="${c.active ? "true" : "false"}" data-scene-id="${c.id}">
      <span class="home-scene-pill__text">
        <strong>${c.label}</strong>
        <span class="home-scene-pill__sub">${c.sub}</span>
      </span>
      <span class="home-scene-pill__ico" aria-hidden="true"><img alt="" src="${c.icon}" width="24" height="24" decoding="async" /></span>
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
          <span class="home-sol-card__arrow" aria-hidden="true">
            <img alt="" src="${s.arrow}" width="21" height="21" decoding="async" />
          </span>
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
      <div class="home-feat-card__img">
        <img alt="" src="${f.img}" width="140" height="105" loading="lazy" decoding="async" />
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
