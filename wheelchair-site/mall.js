const M = window.MALL_FIGMA;

const CATS = M ? M.catStrip : [];

const PRODUCTS = M ? M.products56 : [];
const FEATURES = M ? M.features : [];

let activeChip = "all";
let sortMode = "default";
let listView = false;
let featIndex = 0;
let cartCount = 3;

const $ = (s) => document.querySelector(s);

const SVG_CART =
  '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>';

const CAT_SVG = {
  all: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M6 17V11l2-4h8l2 4v6"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  cushion:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="10" width="16" height="8" rx="2"/><path d="M7 10V8a2 2 0 012-2h6a2 2 0 012 2v2"/></svg>',
  head: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 4a3 3 0 00-3 3v2h6V7a3 3 0 00-3-3z"/><path d="M6 9h12v3a6 6 0 01-12 0V9z"/></svg>',
  wheels:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>',
  frame:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M6 20V6l6-3 6 3v14"/><path d="M6 12h12"/></svg>',
  safety:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z"/></svg>',
  travel:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M8 9V6a2 2 0 012-2h4a2 2 0 012 2v3"/></svg>',
  storage:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M6 7h12l2 4v8H4v-8l2-4z"/><path d="M9 11h6"/></svg>',
  other:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></svg>',
};

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._id);
  toast._id = setTimeout(() => {
    t.hidden = true;
  }, 2000);
}

function setupNav() {
  const btn = $("#navToggle");
  const nav = $("#siteNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const o = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(o));
  });
}

function renderCatPills() {
  const wrap = $("#catScroll");
  if (!wrap || !M) return;
  wrap.innerHTML = CATS.map(
    (c) => `
    <button type="button" class="cat-pill" role="tab" data-cat="${c.id}" aria-pressed="${c.id === activeChip}">
      <span class="cat-ico cat-ico--${c.id}" aria-hidden="true">${CAT_SVG[c.id] || CAT_SVG.all}</span>
      ${c.label}
    </button>`
  ).join("");
  wrap.querySelectorAll(".cat-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeChip = btn.dataset.cat;
      wrap.querySelectorAll(".cat-pill").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === activeChip)));
      syncTypeChecksFromChip();
      applyFilters(false);
    });
  });
}

function renderTypeChecks() {
  const box = $("#typeChecks");
  if (!box || !M) return;
  box.innerHTML = M.typeChecks
    .map(
      (t) => `
    <label class="type-check-row">
      <input type="checkbox" name="ptype" value="${t.id}" />
      <span>${t.label}</span>
    </label>`
    )
    .join("");
  box.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("change", () => applyFilters(false));
  });
}

function syncTypeChecksFromChip() {
  const inputs = document.querySelectorAll('input[name="ptype"]');
  if (activeChip === "all") {
    inputs.forEach((i) => {
      i.checked = false;
    });
  } else {
    inputs.forEach((i) => {
      i.checked = i.value === activeChip;
    });
  }
}

function getCheckedTypes() {
  return [...document.querySelectorAll('input[name="ptype"]:checked')].map((i) => i.value);
}

function getPriceBounds() {
  let mn = Number($("#rangeMin").value);
  let mx = Number($("#rangeMax").value);
  if (mn > mx) [mn, mx] = [mx, mn];
  return { mn, mx };
}

function updatePriceFill() {
  const fill = $("#priceFill");
  const mn = Number($("#rangeMin").value);
  const mx = Number($("#rangeMax").value);
  const lo = Math.min(mn, mx);
  const hi = Math.max(mn, mx);
  const pct = (v) => (v / 5000) * 100;
  fill.style.left = pct(lo) + "%";
  fill.style.width = pct(hi - lo) + "%";
  $("#inputMin").value = String(lo);
  $("#inputMax").value = String(hi);
}

function setupPriceDual() {
  const rMin = $("#rangeMin");
  const rMax = $("#rangeMax");
  const iMin = $("#inputMin");
  const iMax = $("#inputMax");
  const onRange = () => {
    let a = Number(rMin.value);
    let b = Number(rMax.value);
    if (a > b) {
      if (document.activeElement === rMin) rMax.value = String(a);
      else rMin.value = String(b);
    }
    updatePriceFill();
  };
  rMin.addEventListener("input", onRange);
  rMax.addEventListener("input", onRange);
  const onNum = () => {
    let a = Math.max(0, Math.min(5000, Number(iMin.value) || 0));
    let b = Math.max(0, Math.min(5000, Number(iMax.value) || 5000));
    if (a > b) [a, b] = [b, a];
    rMin.value = String(a);
    rMax.value = String(b);
    updatePriceFill();
  };
  iMin.addEventListener("change", onNum);
  iMax.addEventListener("change", onNum);
  updatePriceFill();
}

function filterProducts() {
  const q = ($("#mallSearch").value || "").trim().toLowerCase();
  const { mn, mx } = getPriceBounds();
  const types = getCheckedTypes();
  return PRODUCTS.filter((p) => {
    if (p.price < mn || p.price > mx) return false;
    if (q && !(`${p.title}${p.desc}`.toLowerCase().includes(q))) return false;
    if (activeChip !== "all" && p.cat !== activeChip) return false;
    if (activeChip === "all" && types.length && !types.includes(p.cat)) return false;
    return true;
  });
}

function sortList(list) {
  const arr = [...list];
  if (sortMode === "sales") arr.sort((a, b) => b.sales - a.sales);
  if (sortMode === "price-asc") arr.sort((a, b) => a.price - b.price);
  if (sortMode === "price-desc") arr.sort((a, b) => b.price - a.price);
  return arr;
}

function renderProducts() {
  const list = sortList(filterProducts());
  const grid = $("#productGrid");
  if (!grid) return;
  grid.classList.toggle("is-list", listView);
  if (!list.length) {
    grid.innerHTML = '<p class="mall-empty" role="status">没有符合当前筛选条件的配件，请尝试放宽价格或清空筛选。</p>';
    $("#resultCount").textContent = "全部配件 · 共 0 件";
    $("#filterCount").textContent = "(0)";
    return;
  }
  $("#resultCount").textContent = `全部配件 · 共 ${list.length} 件`;
  $("#filterCount").textContent = `(${list.length})`;
  grid.innerHTML = list
    .map((p) => {
      const bg = p.cardBg
        ? `<img class="product-card-bg" src="${p.cardBg}" alt="" loading="lazy" />`
        : `<div class="product-thumb-bg" style="background:${p.thumbTint || "#f4f5f7"}" aria-hidden="true"></div>`;
      return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-thumb">
        ${bg}
        <img class="product-main" src="${p.imgMain}" alt="${p.title}" width="400" height="300" loading="lazy" />
        <button type="button" class="btn-add-cart" data-add="${p.id}" aria-label="加入购物车 ${p.title}">
          ${SVG_CART}
        </button>
      </div>
      <div class="product-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">¥${p.price.toLocaleString("zh-CN")}</span>
        </div>
      </div>
    </article>`;
    })
    .join("");
  grid.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cartCount += 1;
      $("#cartBadge").textContent = String(cartCount);
      const id = btn.getAttribute("data-add");
      const pr = PRODUCTS.find((x) => String(x.id) === id);
      toast(pr ? `已加入购物车：${pr.title}` : "已加入购物车");
    });
  });
}

function applyFilters(showToastMsg) {
  renderProducts();
  if (showToastMsg) toast("已应用筛选条件");
}

function setupFilters() {
  document.querySelectorAll("[data-filter-acc]").forEach((acc) => {
    const trig = acc.querySelector(".filter-trigger");
    trig.addEventListener("click", () => {
      const open = acc.classList.toggle("is-open");
      trig.setAttribute("aria-expanded", String(open));
    });
  });
  $("#applyFilter").addEventListener("click", () => applyFilters(true));
  $("#clearFilters").addEventListener("click", () => {
    activeChip = "all";
    document.querySelectorAll('input[name="ptype"]').forEach((i) => {
      i.checked = false;
    });
    document.querySelectorAll('input[name="model"], input[name="feat"]').forEach((i) => {
      i.checked = false;
    });
    $("#rangeMin").value = "0";
    $("#rangeMax").value = "3000";
    updatePriceFill();
    $("#mallSearch").value = "";
    renderCatPills();
    applyFilters(false);
    toast("已清空筛选");
  });
}

function setupSort() {
  document.querySelectorAll(".sort-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-tabs button").forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      sortMode = btn.dataset.sort;
      renderProducts();
    });
  });
}

function setupView() {
  const g = $("#viewGrid");
  const l = $("#viewList");
  if (!g || !l || !M) return;
  g.addEventListener("click", () => {
    listView = false;
    g.setAttribute("aria-pressed", "true");
    l.setAttribute("aria-pressed", "false");
    renderProducts();
  });
  l.addEventListener("click", () => {
    listView = true;
    g.setAttribute("aria-pressed", "false");
    l.setAttribute("aria-pressed", "true");
    renderProducts();
  });
}

function renderFeature() {
  if (!M) return;
  const f = FEATURES[featIndex];
  const featImg = $("#featImg");
  $("#featTitle").textContent = f.title;
  $("#featDesc").textContent = f.desc;
  $("#featPrice").textContent = `¥ ${f.price.toLocaleString("zh-CN")}`;
  $("#featWas").textContent = `¥ ${f.was.toLocaleString("zh-CN")}`;
  featImg.src = f.img;
  featImg.alt = f.title;
  const dots = $("#featDots");
  if (M.featDots && M.featDots.length) {
    dots.innerHTML = M.featDots
      .map(
        (_, i) =>
          `<button type="button" class="feat-dot-btn" role="tab" aria-selected="${i === featIndex}" aria-label="精选第 ${i + 1} 帧">
          <img src="${M.featDots[i]}" alt="" width="24" height="8" loading="lazy" />
        </button>`
      )
      .join("");
  } else {
    dots.innerHTML = FEATURES.map(
      (_, i) =>
        `<button type="button" class="feat-dot-btn feat-dot-btn--css" role="tab" aria-selected="${i === featIndex}" aria-label="精选第 ${i + 1} 帧"></button>`
    ).join("");
  }
  dots.querySelectorAll("button").forEach((b, i) => {
    b.addEventListener("click", () => {
      featIndex = i;
      renderFeature();
    });
  });
}

function setupFeatured() {
  if (!M) return;
  renderFeature();
  $("#featBuy").addEventListener("click", () => {
    cartCount += 1;
    $("#cartBadge").textContent = String(cartCount);
    toast("已加入购物车：精选套装");
  });
  setInterval(() => {
    featIndex = (featIndex + 1) % FEATURES.length;
    renderFeature();
  }, 6000);
}

function setupSearch() {
  const run = () => applyFilters(false);
  $("#mallSearchSubmit").addEventListener("click", run);
  $("#mallSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
  $("#headerSearchBtn").addEventListener("click", () => {
    $("#mallSearch").focus();
    toast("在下方搜索框输入关键词");
  });
}

$("#openCart").addEventListener("click", () => toast(`购物车中共 ${cartCount} 件商品（演示）`));

$("#y").textContent = String(new Date().getFullYear());

if (!M) {
  console.error("缺少 figma-mall-data.js，请检查脚本加载顺序");
} else {
  setupNav();
  renderCatPills();
  renderTypeChecks();
  setupPriceDual();
  setupFilters();
  setupSort();
  setupView();
  setupFeatured();
  setupSearch();
  applyFilters(false);
}
