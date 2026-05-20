/**
 * Figma 节点 77:48 — 首页资源
 */
(function () {
  const B = "https://www.figma.com/api/mcp/asset/";

  const A = {
    headerBar: B + "b8d1fb4d-0df2-43fa-a817-29aecf9e8f48",
    planBadgeBg: B + "59a503fc-18a0-413d-b35e-f06504e7ce0c",
    planBadgeInner: B + "bc61cd5f-7294-4dad-9b00-974ce5ddf391",
    ctaArrow: B + "b6d3faac-7b30-4bb7-a86f-90fe99fd2519",
    socialAvatars: B + "01de82f9-0093-4816-9902-1209f4a763b9",
    featIcon1: B + "31e77295-2752-49f1-8965-ed0a7512c1df",
    featIcon2: B + "b3a54c21-50f7-43d0-8c38-6d327c4b8636",
    featIcon3: B + "5e77571b-c5c2-431e-bc74-b372ef42a82b",
    stepNum: B + "c4309d55-6146-43e3-a7c1-0e790e1a04b5",
    heroBg: "./assets/hero.png",
    catAll: B + "0ef4682f-2fa4-461d-90a5-58d821ebdd8e",
    catCommute: B + "85d6e100-e2ef-4318-bd8f-1849933e25f1",
    catOutdoor: B + "690493f1-9503-49d9-b253-6a88a1e7f2c2",
    catIndoor: B + "425b0405-752c-4438-a403-6caacb446469",
    catTravel: B + "e772c9ae-f75b-4763-9224-4e142f68db27",
    catCare: B + "aa28bccb-0286-4f22-92f8-6bd5072a7a80",
    catSport: B + "4950f272-d27d-4c42-a276-6f773b561141",
    solArrow: B + "3f40f826-1a35-4dc2-933e-0e3384246f01",
    trust1: B + "61f27a6f-fdd2-485c-80c7-c45760dd1286",
    trust2: B + "38ef8d91-f15e-446c-bf2b-18851700ce54",
    trust3: B + "d8a9cc9a-1a02-477a-973c-7172a952ba45",
    trust4: B + "06847c4b-5443-4adb-bb80-ddd72916a7e9",
    footerWx: B + "b0efbdcb-aba2-4d41-83be-924bb4bd4310",
    footerWb: B + "799e231d-099a-4503-a0e1-dae1daec1f76",
    footerDy: B + "103a626a-c9c6-4f6e-a67d-57a21bf15b23",
  };

  const categories = [
    { id: "all", label: "全部选配", sub: "全场景适配方案", icon: A.catAll, active: true },
    { id: "commute", label: "日常通勤", sub: "起始便捷出行", icon: A.catCommute },
    { id: "outdoor", label: "户外探索", sub: "探索自然之美", icon: A.catOutdoor },
    { id: "indoor", label: "室内生活", sub: "舒适居家体验", icon: A.catIndoor },
    { id: "travel", label: "长途旅行", sub: "轻松随行无忧", icon: A.catTravel },
    { id: "care", label: "康复护理", sub: "专业康复辅助", icon: A.catCare },
    { id: "sport", label: "运动休闲", sub: "轻盈灵活运动表现", icon: A.catSport },
  ];

  const solutions = [
    {
      id: 1,
      title: "居家舒适方案",
      desc: "适合日常室内活动，提升生活品质",
      price: 8990,
      img: B + "32f649d9-fb10-4802-8f51-6e927e1b6b39",
      badge: { text: "热门", variant: "hot" },
      arrow: A.solArrow,
    },
    {
      id: 2,
      title: "户外探索方案",
      desc: "适应多种地形，自由探索，轻松出行",
      price: 10990,
      img: B + "6742f00d-3ae9-4da5-85c6-b96a4bc53c03",
      badge: { text: "新品", variant: "new" },
      arrow: A.solArrow,
    },
    {
      id: 3,
      title: "旅行出行方案",
      desc: "轻量便携，陪伴每一次远行",
      price: 9990,
      img: B + "3f371b9c-01ad-4fd5-886c-128f0381b4cc",
      badge: { text: "多图", variant: "multi" },
      arrow: A.solArrow,
    },
    {
      id: 4,
      title: "康复训练方案",
      desc: "科学支撑，助力康复训练",
      price: 7990,
      img: B + "dac3bb11-5f10-4c81-932b-8e7a21624ae2",
      badge: { text: "人气", variant: "trend" },
      arrow: A.solArrow,
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

  window.HOME_FIGMA = { A, categories, solutions, features };
})();
