/** 场景方案 · 场景模拟（资源使用本地 assets） */
(function () {
  const A = "./assets/";

  const U = {
    pageBg: "",
    btnArrow: A + "support/ico-chevron-right.svg",
    heroWheelchair: A + "viewer/main-wheelchair.png",
    collage: A + "scene-sim/feat-hero.png",
    featShu: A + "support/ico-trust-shield.svg",
    featLing: A + "support/ico-trust-infinity.svg",
    featZhen: A + "support/ico-trust-clock.svg",
    featAn: A + "support/ico-trust-team.svg",
    compareIco: A + "ico-compare.svg",
  };

  const categories = [
    { id: "all", label: "全场景", icon: A + "features/feat-3d.svg", active: true },
    { id: "daily", label: "日常出行", icon: A + "features/feat-measure.svg" },
    { id: "outdoor", label: "户外探索", icon: A + "scene-sport-wheelchair-basketball.jpg" },
    { id: "indoor", label: "室内生活", icon: A + "features/feat-mall.svg" },
    { id: "trip", label: "长途旅行", icon: A + "scene-sim/feat-showcase.png" },
    { id: "care", label: "康复护理", icon: A + "support/ico-trust-shield.svg" },
    { id: "sport", label: "运动休闲", icon: A + "scene-sim/feat-hero.png" },
  ];

  const scenarioCards = [
    {
      id: "commute",
      cat: "daily",
      title: "日常通勤",
      desc: "轻松穿越城市，灵活便捷",
      img: "https://www.figma.com/api/mcp/asset/2b60636c-cdfd-4483-ad0b-8bd09e56bad5",
      badge: A + "support/ico-dot.svg",
      linkIco: A + "support/ico-chevron-right.svg",
    },
    {
      id: "outdoor",
      cat: "outdoor",
      title: "户外探索",
      desc: "稳定耐用，适应多种地形",
      img: "https://www.figma.com/api/mcp/asset/912b1518-2cf5-4f6e-afb9-7dcbdba33432",
      badge: A + "support/ico-dot.svg",
      linkIco: A + "support/ico-chevron-right.svg",
    },
    {
      id: "indoor",
      cat: "indoor",
      title: "室内生活",
      desc: "灵活转向，便于扶小空间",
      img: "https://www.figma.com/api/mcp/asset/ad2cdb68-81a1-4ccd-87a7-11c14a72963b",
      badge: A + "support/ico-dot.svg",
      linkIco: A + "support/ico-chevron-right.svg",
    },
    {
      id: "trip",
      cat: "trip",
      title: "长途旅行",
      desc: "轻量便携，便于携帶运输",
      img: "https://www.figma.com/api/mcp/asset/2fdfa244-8a24-451c-b198-967bba449a10",
      badge: A + "support/ico-dot.svg",
      linkIco: A + "support/ico-chevron-right.svg",
    },
    {
      id: "care",
      cat: "care",
      title: "康复护理",
      desc: "辅助护理，提升生活品质",
      img: "https://www.figma.com/api/mcp/asset/8312e569-c76d-467c-969f-da1688459689",
      badge: A + "support/ico-dot.svg",
      linkIco: A + "support/ico-chevron-right.svg",
    },
    {
      id: "sport",
      cat: "sport",
      title: "运动休闲",
      desc: "轻盈灵活，助力运动表现",
      img: A + "scene-sim/sport-leisure-crop.jpg",
      badge: A + "support/ico-dot.svg",
      linkIco: A + "support/ico-chevron-right.svg",
    },
  ];

  const featured = {
    tag: "方案推荐",
    title: "日常通勤优选方案",
    line1: "为城市通勤设计的配件组合，兼顾舒适性与便捷性，",
    line2: "让每一次出行都更轻松。",
    feats: [
      { label: "舒适坐垫", icon: U.featAn },
      { label: "轻量便捷", icon: U.featZhen },
      { label: "灵活操控", icon: U.featLing },
      { label: "安全可靠", icon: U.featShu },
    ],
    showcase: "https://www.figma.com/api/mcp/asset/be77557f-ba44-413d-92f0-1a83950db3a8",
  };

  window.SCENE_SIM_DATA = { U, categories, scenarioCards, featured };
})();
