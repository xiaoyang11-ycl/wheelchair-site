/**
 * Figma 节点 77:48 — 首页资源
 */
(function () {
  const A = "./assets/";

  const assets = {
    headerBar: A + "brand-mark.svg",
    planBadgeBg: A + "support/ico-dot.svg",
    planBadgeInner: A + "logo.png",
    ctaArrow: A + "support/ico-chevron-right.svg",
    socialAvatars: A + "logo.png",
    featIcon1: A + "features/feat-3d.svg",
    featIcon2: A + "features/feat-measure.svg",
    featIcon3: A + "features/feat-mall.svg",
    stepNum: A + "support/ico-dot.svg",
    heroBg: A + "hero.png",
    catAll: A + "features/feat-3d.svg",
    catCommute: A + "features/feat-measure.svg",
    catOutdoor: A + "scene-sport-wheelchair-basketball.jpg",
    catIndoor: A + "features/feat-mall.svg",
    catTravel: A + "scene-sim/feat-showcase.png",
    catCare: A + "support/ico-trust-shield.svg",
    catSport: A + "scene-sim/feat-hero.png",
    solArrow: A + "support/ico-chevron-right.svg",
    trust1: A + "support/ico-trust-shield.svg",
    trust2: A + "support/ico-trust-clock.svg",
    trust3: A + "support/ico-trust-team.svg",
    trust4: A + "support/ico-trust-infinity.svg",
    footerWx: A + "support/ico-social-wechat.svg",
    footerWb: A + "support/ico-social-weibo.svg",
    footerDy: A + "support/ico-social-more.svg",
  };

  const categories = [
    { id: "all", label: "全部选配", sub: "全场景适配方案", icon: assets.catAll, active: true },
    { id: "commute", label: "日常通勤", sub: "起始便捷出行", icon: assets.catCommute },
    { id: "outdoor", label: "户外探索", sub: "探索自然之美", icon: assets.catOutdoor },
    { id: "indoor", label: "室内生活", sub: "舒适居家体验", icon: assets.catIndoor },
    { id: "travel", label: "长途旅行", sub: "轻松随行无忧", icon: assets.catTravel },
    { id: "care", label: "康复护理", sub: "专业康复辅助", icon: assets.catCare },
    { id: "sport", label: "运动休闲", sub: "轻盈灵活运动表现", icon: assets.catSport },
  ];

  const solutions = [
    {
      id: 1,
      title: "居家舒适方案",
      desc: "适合日常室内活动，提升生活品质",
      price: 8990,
      img: A + "scene-sim/feat-hero.png",
      badge: { text: "热门", variant: "hot" },
      arrow: assets.solArrow,
    },
    {
      id: 2,
      title: "户外探索方案",
      desc: "适应多种地形，自由探索，轻松出行",
      price: 10990,
      img: A + "scene-sport-wheelchair-basketball.jpg",
      badge: { text: "新品", variant: "new" },
      arrow: assets.solArrow,
    },
    {
      id: 3,
      title: "旅行出行方案",
      desc: "轻量便携，陪伴每一次远行",
      price: 9990,
      img: A + "home-solution-travel.png",
      badge: { text: "多图", variant: "multi" },
      arrow: assets.solArrow,
    },
    {
      id: 4,
      title: "康复训练方案",
      desc: "科学支撑，助力康复训练",
      price: 7990,
      img: A + "home-solution-rehab.png",
      badge: { text: "人气", variant: "trend" },
      arrow: assets.solArrow,
    },
  ];

  const features = [
    {
      title: "3D定制预览",
      desc: "360°查看，组件自由调整",
      img: "./assets/features/feat-3d.svg",
      href: "./customize.html#3d",
      cta: "立即体验",
    },
    {
      title: "精准尺寸测量",
      desc: "科学测量，精准匹配用户需求",
      img: "./assets/features/feat-measure.svg",
      href: "./customize.html#measure",
      cta: "开始测量",
    },
    {
      title: "配件商城",
      desc: "精选配件，保障品质与舒适体验",
      img: "./assets/features/feat-mall.svg",
      href: "./mall.html",
      cta: "立即选购",
    },
  ];

  window.HOME_FIGMA = { A: assets, categories, solutions, features };
})();
