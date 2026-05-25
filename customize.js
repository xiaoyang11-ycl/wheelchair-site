const ASSETS = {
  main: "./assets/viewer/main-wheelchair.png",
  thumbs: [
    {
      thumb: "./assets/viewer/thumb-front-oblique.png",
      view: "./assets/viewer/view-front-oblique.png",
      label: "前斜侧",
    },
    {
      thumb: "./assets/viewer/thumb-side.png",
      view: "./assets/viewer/view-side.png",
      label: "侧视图",
    },
    {
      thumb: "./assets/viewer/thumb-front.png",
      view: "./assets/viewer/view-front.png",
      label: "正视图",
    },
  ],
  scenes: [
    { src: "./assets/scene-sim/scene-minimal-livingroom.png", label: "简约客厅" },
    { src: "./assets/scene-sim/scene-home-life.png", label: "居家生活" },
    { src: "./assets/scene-sim/scene-park-greenway.png", label: "公园绿道" },
    { src: "./assets/scene-sim/scene-office-lobby.png", label: "办公大厅" },
    { src: "./assets/scene-sim/scene-outdoor-mountain.png", label: "户外山景" },
  ],
};

const swatches = [
  { id: "black", color: "#111827" },
  { id: "gray", color: "#6b7280" },
  { id: "white", color: "#f3f4f6" },
  { id: "navy", color: "#1e3a5f" },
  { id: "red", color: "#b91c1c" },
];

function $(s) {
  return document.querySelector(s);
}

function showToast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(showToast._id);
  showToast._id = setTimeout(() => {
    t.hidden = true;
  }, 2200);
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

function readCustomizeModeFromHash() {
  const h = (location.hash || "").replace(/^#/, "");
  if (h === "scene" || h === "measure" || h === "3d") return h;
  return "3d";
}

function setCustomizeModeInUrl(mode) {
  const base = `${location.pathname}${location.search}`;
  try {
    if (mode === "3d") history.replaceState(null, "", base);
    else history.replaceState(null, "", `${base}#${mode}`);
  } catch {
    /* file:// 等环境可能不可用 */
  }
}

function setupModes() {
  const modeBar = document.querySelector(".mode-bar-inner");
  const panel3d = document.getElementById("panel3d");
  const panelScene = document.getElementById("panelScene");
  const panelMeasure = document.getElementById("panelMeasure");
  const lowerBand = document.getElementById("lowerBand");

  const syncPills = (mode) => {
    document.querySelectorAll(".mode-pill").forEach((pill) => {
      pill.setAttribute("aria-pressed", String(pill.dataset.mode === mode));
    });
  };

  const applyMode = (mode, opts = {}) => {
    const silent = opts.silent === true;
    const skipHash = opts.skipHash === true;
    const is3d = mode === "3d";
    const isScene = mode === "scene";
    const isMeasure = mode === "measure";

    syncPills(mode);

    if (panel3d) {
      panel3d.hidden = !is3d;
      panel3d.setAttribute("aria-hidden", String(!is3d));
    }
    if (panelScene) {
      panelScene.hidden = !isScene;
      panelScene.setAttribute("aria-hidden", String(!isScene));
    }
    if (panelMeasure) {
      panelMeasure.hidden = !isMeasure;
      panelMeasure.setAttribute("aria-hidden", String(!isMeasure));
    }
    if (lowerBand) lowerBand.hidden = isScene || isMeasure;
    document.body.classList.toggle("customize-mode-scene", isScene);
    document.body.classList.toggle("customize-mode-measure", isMeasure);

    if (!skipHash) setCustomizeModeInUrl(mode);

    if (!silent) {
      if (mode === "measure") showToast("已进入尺寸测量");
      else if (mode === "scene") showToast("已进入场景模拟");
      else showToast("3D 预览：使用左侧工具与底部视角");
    }
  };

  if (modeBar) {
    modeBar.addEventListener("click", (e) => {
      const pill = e.target.closest(".mode-pill");
      if (!pill || !modeBar.contains(pill)) return;
      const m = pill.dataset.mode;
      if (!m) return;
      applyMode(m);
    });
  }

  window.addEventListener("hashchange", () => {
    applyMode(readCustomizeModeFromHash(), { skipHash: true, silent: true });
  });

  applyMode(readCustomizeModeFromHash(), { skipHash: true, silent: true });
}

function initSceneSim() {
  const D = window.SCENE_SIM_DATA;
  if (!D) return;
  const cmpBtn = document.getElementById("sceneCompareBtn");

  const bg = document.getElementById("sceneSimBg");
  if (bg) bg.style.backgroundImage = `url(${D.U.pageBg})`;

  const sub = document.getElementById("sceneSimSubtitle");
  if (sub) sub.textContent = "根据不同使用场景，推荐适合的配件组合，让出行更自由";

  const strip = document.getElementById("sceneCatStrip");
  const wrap = document.getElementById("sceneCardsWrap");
  const band = document.getElementById("sceneFeaturedBand");
  if (!strip || !wrap || !band) return;

  let activeCat = "all";

  const renderCats = () => {
    strip.innerHTML = D.categories
      .map(
        (c) => `
      <button type="button" role="tab" aria-selected="${c.id === activeCat}" class="scene-cat-chip ${c.id === activeCat ? "is-active" : ""}" data-cat="${c.id}">
        <span class="scene-cat-ico"><img src="${c.icon}" alt="" loading="lazy" width="24" height="24" /></span>
        <span class="scene-cat-label">${c.label}</span>
      </button>`
      )
      .join("");
  };

  const renderCards = () => {
    const list = D.scenarioCards.filter((card) => activeCat === "all" || card.cat === activeCat);
    wrap.classList.toggle("is-filtered", activeCat !== "all");
    wrap.innerHTML = list
      .map(
        (card) => `
      <article class="scene-sc-card" data-cat="${card.cat}">
        <div class="scene-sc-card-visual">
          <img src="${card.img}" alt="" class="scene-sc-card-photo" loading="lazy" />
          <img src="${card.badge}" alt="" class="scene-sc-card-badge" loading="lazy" width="24" height="24" />
        </div>
        <div class="scene-sc-card-panel">
          <h3 class="scene-sc-card-title">${card.title}</h3>
          <p class="scene-sc-card-desc">${card.desc}</p>
          <span class="scene-sc-card-link">
            <img src="${card.linkIco}" alt="" width="11" height="9" loading="lazy" />
            查看方案
          </span>
        </div>
      </article>`
      )
      .join("");

    /* 内联关键布局：避免浏览器强缓存旧 customize.css 时「改了没反应」 */
    const cardEls = wrap.querySelectorAll(".scene-sc-card");
    cardEls.forEach((el) => {
      el.style.gridColumn = "";
    });
    wrap.querySelectorAll(".scene-sc-card-visual").forEach((el) => {
      el.style.position = "relative";
      el.style.overflow = "hidden";
      el.style.width = "100%";
      el.style.height = "0";
      el.style.paddingBottom = "56.25%";
      el.style.borderRadius = "8px 8px 0 0";
      el.style.background = "#e8e8ea";
    });
    wrap.querySelectorAll(".scene-sc-card-photo").forEach((img) => {
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.objectPosition = "center center";
      img.style.display = "block";
      img.style.margin = "0";
    });
    if (activeCat === "all" && cardEls.length >= 6) {
      cardEls[4].style.gridColumn = "1 / span 3";
      cardEls[5].style.gridColumn = "4 / span 3";
    }
  };

  const F = D.featured;
  const featHtml = F.feats
    .map(
      (f) => `
    <div class="scene-fe-feat">
      <span class="scene-fe-feat-ico"><img src="${f.icon}" alt="" width="22" height="22" loading="lazy" /></span>
      <span class="scene-fe-feat-tx">${f.label}</span>
    </div>`
    )
    .join("");

  band.innerHTML = `
    <div class="scene-fe-card">
      <div class="scene-fe-left">
        <span class="scene-fe-tag">${F.tag}</span>
        <h2 class="scene-fe-title">${F.title}</h2>
        <p class="scene-fe-line">${F.line1}</p>
        <p class="scene-fe-line scene-fe-line--soft">${F.line2}</p>
        <div class="scene-fe-feats">${featHtml}</div>
        <div class="scene-fe-actions scene-fe-actions--inline">
          <button type="button" class="scene-fe-full-btn" id="sceneViewFullBtn">
            <img src="${D.U.btnArrow}" alt="" width="11" height="9" />
            查看完整方案
          </button>
        </div>
      </div>
      <div class="scene-fe-right">
        <div class="scene-fe-showcase">
          <img src="${F.showcase}" alt="日常出行方案展示" class="scene-fe-showcase-img" loading="lazy" />
        </div>
      </div>
    </div>`;

    document.getElementById("sceneViewFullBtn")?.addEventListener("click", () => showToast("查看完整方案（演示）"));

  renderCats();
  renderCards();

  strip.addEventListener("click", (e) => {
    const btn = e.target.closest(".scene-cat-chip");
    if (!btn || !strip.contains(btn)) return;
    activeCat = btn.dataset.cat;
    strip.querySelectorAll(".scene-cat-chip").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.cat === activeCat);
      b.setAttribute("aria-selected", String(b.dataset.cat === activeCat));
    });
    renderCards();
  });

  cmpBtn?.addEventListener("click", () => showToast("对比方案（演示）"));
}

function initMeasurePanel() {
  const M = window.MEASURE_FIGMA_DATA;
  const work = document.getElementById("measureWorkMount");
  const tri = document.getElementById("measureTriMount");
  const bg = document.getElementById("measurePageBg");
  if (!M || !work || !tri) return;
  if (bg) bg.style.backgroundImage = `url(${M.U.pageBg})`;

  const defaultValues = M.measureRows.map((r) => r.value);

  const renderDataRows = () => {
    const box = document.getElementById("measureDataRows");
    if (!box) return;
    box.innerHTML = M.measureRows
      .map(
        (r) => `
      <div class="measure-data-row" data-mid="${r.id}">
        <img class="measure-data-row-icon" src="${r.icon}" alt="" loading="lazy" width="15" height="15" />
        <div class="measure-data-row-text">
          <p class="measure-data-row-label">${r.label}${r.badge ? ` <span class="measure-num-sup">${r.badge}</span>` : ""}</p>
          <p class="measure-data-row-desc">${r.desc}</p>
        </div>
        <input class="measure-data-value" type="text" readonly value="${r.value}" aria-label="${r.label}" />
      </div>`
      )
      .join("");
  };

  const toolbarHtml = M.U.toolbar
    .map(
      (t, i) => `
    <button type="button" class="measure-tool-btn${i === 2 ? " is-active" : ""}" data-tool="${t.key}" title="${t.label}">
      <img src="${t.icon}" alt="" width="15" height="15" loading="lazy" />
      <span>${t.label}</span>
    </button>`
    )
    .join("");

  const hotspotsHtml = M.hotspots
    .map(
      (h) => `
    <button type="button" class="measure-hot" data-h="${h.id}" style="top:${h.top};left:${h.left};" aria-label="测量点 ${h.id}">${h.id}</button>`
    )
    .join("");

  const vActions = M.U.viewerActions
    .map(
      (a) => `
    <button type="button" class="measure-vact-btn" data-vact="${a.key}" data-label="${a.label}">
      <img src="${a.icon}" alt="" width="14" height="14" loading="lazy" />${a.label}
    </button>`
    )
    .join("");

  work.innerHTML = `
    <div class="measure-work">
      <aside class="measure-toolbar" aria-label="测量工具">${toolbarHtml}</aside>
      <div class="measure-viewer-wrap">
        <div class="measure-hint">
          <img src="${M.U.hintDeco}" alt="" loading="lazy" />
          <div class="measure-hint-text">
            <span>点击测量点开始测量</span>
            <span>拖动标尺调整测量位置</span>
          </div>
        </div>
        <div class="measure-stage" id="measureStage">
          <img class="measure-hero-img" id="measureHeroImg" src="${M.U.heroWheelchair}" alt="轮椅测量视图" loading="lazy" />
          <div class="measure-hotspots">${hotspotsHtml}</div>
        </div>
        <div class="measure-viewer-actions">${vActions}</div>
      </div>
      <aside class="measure-data-panel" aria-label="测量数据">
        <div class="measure-data-head">
          <h2 class="measure-data-title">测量数据 <span>(cm)</span></h2>
          <button type="button" class="measure-reset-btn" id="measureResetBtn">
            <img src="${M.U.resetIco}" alt="" width="10" height="11" loading="lazy" /> 重置
          </button>
        </div>
        <div class="measure-data-rows" id="measureDataRows"></div>
        <div class="measure-data-actions">
          <button type="button" class="measure-btn-save" id="measureSaveBtn">保存测量数据</button>
          <button type="button" class="measure-btn-apply" id="measureApplyPlanBtn">应用到方案</button>
        </div>
      </aside>
    </div>`;

  renderDataRows();

  const adaptHtml = M.adaptRows
    .map(
      (a) => `
    <div class="measure-adapt-row">
      <img src="${a.icon}" alt="" width="24" height="24" loading="lazy" />
      <div class="measure-adapt-meta">
        <p class="measure-adapt-title">${a.title}</p>
        <p class="measure-adapt-range">${a.range}</p>
      </div>
      <span class="measure-adapt-ok">${a.status}</span>
    </div>`
    )
    .join("");

  const tplHtml = M.templates
    .map(
      (t) => `
    <div class="measure-template-row">
      <img src="${t.icon}" alt="" width="23" height="26" loading="lazy" />
      <div class="measure-template-meta">
        <p class="t">${t.title}${t.sub ? ` ${t.sub}` : ""}</p>
        ${t.hint ? `<p class="h">${t.hint}</p>` : ""}
      </div>
      <button type="button" class="measure-tpl-apply" data-tpl="${t.title}">应用</button>
    </div>`
    )
    .join("");

  const humanRowsHtml = M.humanRows
    .map(
      (h) => `
    <div class="measure-human-row">
      <img class="measure-human-ico" src="${h.icon}" alt="" loading="lazy" width="9" height="9" />
      <span class="measure-human-name">${h.label}</span>
      <span class="measure-human-val">${h.value}${h.unit != null ? h.unit : ""}</span>
      <span class="tag">已测量</span>
    </div>`
    )
    .join("");

  tri.innerHTML = `
    <div class="measure-card">
      <h3 class="measure-card-h">人体测量参考</h3>
      <p class="measure-card-sub">根掘人体数据推荐合适的轮椅尺寸</p>
      <div class="measure-human-head">
        <button type="button" class="measure-gender is-male is-active" data-g="male">男性</button>
        <button type="button" class="measure-gender" data-g="female">女性</button>
      </div>
      <div class="measure-human-body">
        <div class="measure-human-fig"><img src="${M.humanFigure}" alt="坐姿人体示意" loading="lazy" /></div>
        <div class="measure-human-list">${humanRowsHtml}</div>
      </div>
    </div>
    <div class="measure-card">
      <h3 class="measure-card-h">尺寸适配建议</h3>
      <p class="measure-card-sub">基于当前测量数据的适配建议</p>
      <div class="measure-adapt-list">${adaptHtml}</div>
    </div>
    <div class="measure-card">
      <h3 class="measure-card-h">常用尺寸模板</h3>
      <p class="measure-card-sub">快通选择常用尺寸模板</p>
      <div class="measure-template-list">${tplHtml}</div>
      <button type="button" class="measure-custom-link" id="measureCustomLink">
        自定义尺寸 <img src="${M.customArrow}" alt="" width="10" height="8" loading="lazy" />
      </button>
    </div>`;

  work.addEventListener("click", (e) => {
    const hot = e.target.closest(".measure-hot");
    if (hot) {
      work.querySelectorAll(".measure-hot").forEach((x) => x.classList.remove("is-active"));
      hot.classList.add("is-active");
      showToast(`已选中测量点 ${hot.dataset.h}（演示）`);
      return;
    }
    const tool = e.target.closest(".measure-tool-btn");
    if (tool) {
      if (tool.dataset.tool === "points") {
        work.querySelectorAll(".measure-tool-btn").forEach((x) => x.classList.remove("is-active"));
        tool.classList.add("is-active");
      }
      showToast(`${tool.getAttribute("title") || "工具"}（演示）`);
      return;
    }
    const v = e.target.closest(".measure-vact-btn");
    if (v) {
      showToast(`${v.dataset.label || "操作"}（演示）`);
      return;
    }
    if (e.target.closest("#measureSaveBtn")) {
      showToast("测量数据已保存（演示）");
      return;
    }
    if (e.target.closest("#measureApplyPlanBtn")) {
      showToast("已应用到当前方案（演示）");
      return;
    }
    if (e.target.closest("#measureResetBtn")) {
      work.querySelectorAll("#measureDataRows .measure-data-value").forEach((inp, i) => {
        inp.value = defaultValues[i];
      });
      showToast("测量数据已重置");
    }
  });

  tri.addEventListener("click", (e) => {
    const g = e.target.closest(".measure-gender");
    if (g) {
      tri.querySelectorAll(".measure-gender").forEach((x) => {
        x.classList.remove("is-male", "is-active");
      });
      g.classList.add("is-active");
      if (g.dataset.g === "male") g.classList.add("is-male");
      showToast(g.dataset.g === "male" ? "已切换：男性参考" : "已切换：女性参考");
      return;
    }
    const ap = e.target.closest(".measure-tpl-apply");
    if (ap) {
      showToast(`已应用模板：${ap.dataset.tpl}（演示）`);
      return;
    }
    if (e.target.closest("#measureCustomLink")) {
      showToast("自定义尺寸（演示）");
    }
  });
}

function setupThumbs() {
  const strip = $("#thumbStrip");
  const main = $("#mainViewerImg");
  if (!strip || !main) return;
  strip.innerHTML = ASSETS.thumbs
    .map(
      (item, i) => `
    <button type="button" class="thumb" role="tab" aria-selected="${i === 0}" data-i="${i}" aria-label="${item.label}">
      <img src="${item.thumb}" alt="${item.label}" width="128" height="85" loading="lazy" />
    </button>`
    )
    .join("");
  strip.querySelectorAll(".thumb").forEach((b) => {
    b.addEventListener("click", () => {
      strip.querySelectorAll(".thumb").forEach((t) => t.setAttribute("aria-selected", "false"));
      b.setAttribute("aria-selected", "true");
      const i = Number(b.dataset.i);
      main.src = ASSETS.thumbs[i].view;
      main.alt = `轮椅 3D 预览 · ${ASSETS.thumbs[i].label}`;
    });
  });
}

function setupViewerTools() {
  const stage = $("#viewerStage");
  const img = $("#mainViewerImg");
  const fsBtn = $("#fsBtn");
  if (!stage || !img || !fsBtn) return;
  fsBtn.addEventListener("click", () => {
    stage.classList.toggle("is-fullscreen");
    showToast(stage.classList.contains("is-fullscreen") ? "按 ESC 或再次点击角标退出全屏" : "已退出全屏");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") stage.classList.remove("is-fullscreen");
  });

  document.querySelectorAll(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.tool;
      stage.classList.remove("is-rotate", "is-zoom");
      if (t === "rotate") {
        stage.classList.add("is-rotate");
        showToast("360° 旋转（演示 CSS 变换）");
      } else if (t === "zoom") {
        stage.classList.add("is-zoom");
        showToast("放大视图");
      } else if (t === "pan") {
        showToast("平移：演示中，可接画布拖拽");
      } else if (t === "reset") {
        stage.classList.remove("is-rotate", "is-zoom");
        img.src = ASSETS.thumbs[0].view;
        img.alt = `轮椅 3D 预览 · ${ASSETS.thumbs[0].label}`;
        document.querySelectorAll(".thumb").forEach((th, i) => th.setAttribute("aria-selected", String(i === 0)));
        showToast("视图已复位");
      } else if (t === "labels") {
        showToast("部件标注：开/关（演示）");
      }
    });
  });
}

function setupAccordion() {
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const trig = item.querySelector(".acc-trigger");
    const panel = item.querySelector(".acc-panel");
    trig.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      trig.setAttribute("aria-expanded", String(open));
    });
  });
}

function bindSlider(id, outId, suffix = "") {
  const el = document.getElementById(id);
  const out = document.getElementById(outId);
  if (!el || !out) return;
  const sync = () => {
    out.textContent = el.value;
  };
  el.addEventListener("input", sync);
  sync();
}

function setupResetParts() {
  const btn = $("#resetParts");
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.getElementById("hRange").value = 45;
    document.getElementById("aRange").value = 105;
    document.getElementById("depthRange").value = 42;
    document.getElementById("footRange").value = 12;
    document.getElementById("hVal").textContent = "45";
    document.getElementById("aVal").textContent = "105";
    document.getElementById("dVal").textContent = "42";
    document.getElementById("fVal").textContent = "12";
    showToast("部件参数已重置");
  });
}

function setupTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panes = {
    frame: $("#tabFrame"),
    seat: $("#tabSeat"),
    acc: $("#tabAcc"),
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      const k = tab.dataset.tab;
      Object.entries(panes).forEach(([key, el]) => {
        if (!el) return;
        el.hidden = key !== k;
      });
    });
  });
}

function setupSwatches() {
  const box = $("#colorSwatches");
  if (!box) return;
  let selected = "black";
  box.innerHTML = swatches
    .map(
      (s) => `
    <button type="button" class="swatch" style="background:${s.color}" data-id="${s.id}" role="option" aria-selected="${s.id === selected}" aria-label="${s.id}"></button>`
    )
    .join("");
  box.querySelectorAll(".swatch").forEach((b) => {
    b.addEventListener("click", () => {
      box.querySelectorAll(".swatch").forEach((x) => x.setAttribute("aria-selected", "false"));
      b.setAttribute("aria-selected", "true");
      selected = b.dataset.id;
      showToast(`已选择车架色：${selected}`);
    });
  });
  $("#moreColorsBtn")?.addEventListener("click", () => {
    $("#pickColor")?.click();
  });
  $("#pickColor")?.addEventListener("input", (e) => {
    showToast(`自定义色：${e.target.value}`);
  });
}

function setupScenes() {
  const g = $("#sceneGrid");
  if (!g) return;
  g.innerHTML = ASSETS.scenes
    .map(
      (s, i) => `
    <button type="button" class="scene-cell" aria-selected="${i === 0}" data-i="${i}" aria-label="${s.label}">
      <span class="scene-cell__media"><img src="${s.src}" alt="" loading="lazy" /></span>
      <span class="scene-cell__label">${s.label}</span>
    </button>`
    )
    .join("");
  g.querySelectorAll(".scene-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      g.querySelectorAll(".scene-cell").forEach((c) => c.setAttribute("aria-selected", "false"));
      cell.setAttribute("aria-selected", "true");
      const i = Number(cell.dataset.i);
      const stage = $("#viewerStage");
      if (!stage) return;
      if (i === 0) {
        stage.classList.remove("has-scene-bg");
        stage.style.backgroundImage = "";
      } else {
        stage.classList.add("has-scene-bg");
        stage.style.backgroundImage = `linear-gradient(180deg, rgba(248,249,251,0.75), rgba(238,240,244,0.85)), url('${ASSETS.scenes[i].src}')`;
      }
      showToast(`场景：${ASSETS.scenes[i].label}`);
    });
  });
}

function setupBottom() {
  $("#addPlan")?.addEventListener("click", () => {
    showToast("已加入「我的方案」（演示）");
  });
  $("#sharePlan")?.addEventListener("click", async () => {
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      showToast("链接已复制，可分享给他人");
    } catch {
      showToast("分享链接：" + url);
    }
  });
  $("#headerPlanBtn")?.addEventListener("click", () => showToast("打开方案列表（演示）"));
  $("#moreScenes")?.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("更多场景库（演示）");
  });
}

const yEl = $("#y");
if (yEl) yEl.textContent = String(new Date().getFullYear());

setupNav();
setupModes();
initSceneSim();
initMeasurePanel();
setupThumbs();
setupViewerTools();
setupAccordion();
bindSlider("hRange", "hVal", " cm");
bindSlider("aRange", "aVal", "°");
bindSlider("depthRange", "dVal");
bindSlider("footRange", "fVal");
setupResetParts();
setupTabs();
setupSwatches();
setupScenes();
setupBottom();
