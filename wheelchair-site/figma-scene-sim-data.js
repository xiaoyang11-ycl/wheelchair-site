/** Figma 节点 48:614 — 场景方案 · 场景模拟（资源来自 MCP 导出） */
(function () {
  const U = {
    pageBg: "https://www.figma.com/api/mcp/asset/756b8710-1bd7-4a4b-8eda-05680bd569dd",
    btnArrow: "https://www.figma.com/api/mcp/asset/a0cd926b-585b-4139-af5b-1b72052d2ac3",
    heroWheelchair: "https://www.figma.com/api/mcp/asset/93948b31-586a-4d91-b425-f0bcb7dd8175",
    collage: "https://www.figma.com/api/mcp/asset/fc180de6-aa92-4f5e-92c6-59e3d1c153b4",
    featShu: "https://www.figma.com/api/mcp/asset/d6d35249-2edd-4a5b-8036-2ee678f61bcc",
    featLing: "https://www.figma.com/api/mcp/asset/6d3c391e-14d3-4548-bb53-5a16764bdfe6",
    featZhen: "https://www.figma.com/api/mcp/asset/578f1902-5a02-4428-a079-e28f7bf3933e",
    featAn: "https://www.figma.com/api/mcp/asset/c022b5e1-3ede-4807-8867-7722e41a5758",
    compareIco: "https://www.figma.com/api/mcp/asset/32f5667f-93d4-47ac-b04c-af8d16eb297f",
  };

  const categories = [
    { id: "all", label: "全郎场景", icon: "https://www.figma.com/api/mcp/asset/13c7c327-2926-45c5-a3c2-60b84b5b5ea5", active: true },
    { id: "daily", label: "日常出行", icon: "https://www.figma.com/api/mcp/asset/9328ed18-2d4c-4ff9-ae12-39b32cc61079" },
    { id: "outdoor", label: "户外探索", icon: "https://www.figma.com/api/mcp/asset/419d9b19-510f-4af4-84d5-1e703ec634ec" },
    { id: "indoor", label: "室内生活", icon: "https://www.figma.com/api/mcp/asset/e7b4d446-2bfc-428f-8e2f-91dbc80a806c" },
    { id: "trip", label: "长途旅行", icon: "https://www.figma.com/api/mcp/asset/c3741756-7438-49e4-b81d-e3346eba7932" },
    { id: "care", label: "康复护理", icon: "https://www.figma.com/api/mcp/asset/7880f208-bf3a-4936-8d76-fc1598468a46" },
    { id: "sport", label: "运动休闲", icon: "https://www.figma.com/api/mcp/asset/154b4f80-9750-4df1-87f5-2c1165c35251" },
  ];

  /** 场景卡：首行四卡、次行两卡左对齐（与首列对齐），图区统一横向比例 */
  const scenarioCards = [
    {
      id: "commute",
      cat: "daily",
      title: "日常通勤",
      desc: "轻松穿越城市，灵活便捷",
      img: "https://www.figma.com/api/mcp/asset/88511a88-7577-4e9f-8ec6-a2d6348247e9",
      badge: "https://www.figma.com/api/mcp/asset/a8fdc01c-a26e-4024-9764-dfb2d868ed28",
      linkIco: "https://www.figma.com/api/mcp/asset/e23a0820-f016-482e-8c23-dad8e9238613",
    },
    {
      id: "outdoor",
      cat: "outdoor",
      title: "户外探索",
      desc: "稳定耐用，适应多种地形",
      img: "https://www.figma.com/api/mcp/asset/3624ed92-772b-4575-a325-32c85498f2c6",
      badge: "https://www.figma.com/api/mcp/asset/90730a0c-3b87-4f94-87f6-0f41ca1cc40a",
      linkIco: "https://www.figma.com/api/mcp/asset/65704966-f0f0-4adf-84b1-72ddb676608c",
    },
    {
      id: "indoor",
      cat: "indoor",
      title: "室内生活",
      desc: "灵活转向，便于扶小空间",
      img: "https://www.figma.com/api/mcp/asset/05f48f1b-cca4-4e05-a815-f5a88977fb0b",
      badge: "https://www.figma.com/api/mcp/asset/760bd18a-fdb2-4f57-bc84-9a4b2629f819",
      linkIco: "https://www.figma.com/api/mcp/asset/a39a7291-c5de-411a-b566-e4d03f56eb0c",
    },
    {
      id: "trip",
      cat: "trip",
      title: "长途旅行",
      desc: "轻量便携，便于携帶运输",
      img: "https://www.figma.com/api/mcp/asset/460baa41-8ac7-403f-b5e4-34a5c85588ba",
      badge: "https://www.figma.com/api/mcp/asset/75fb8d21-900f-4977-8f4b-8b9d9e822467",
      linkIco: "https://www.figma.com/api/mcp/asset/4c3c56f3-38b2-4125-a5ef-d0f5f754ce88",
    },
    {
      id: "care",
      cat: "care",
      title: "康复护理",
      desc: "辅助护理，提升生活品质",
      img: "https://www.figma.com/api/mcp/asset/808f85cb-1d3a-4e0b-b169-ba02cf83609a",
      badge: "https://www.figma.com/api/mcp/asset/f312d0e5-5ff0-40a4-872d-dec1d76a5f70",
      linkIco: "https://www.figma.com/api/mcp/asset/dccf2cc0-284c-4199-81c6-b987660935ff",
    },
    {
      id: "sport",
      cat: "sport",
      title: "运动休闲",
      desc: "轻盈灵活，助力运动表现",
      img: "https://images.pexels.com/photos/8020297/pexels-photo-8020297.jpeg?auto=compress&cs=tinysrgb&w=1280",
      badge: "https://www.figma.com/api/mcp/asset/9152efbd-b0a6-4564-8381-875603aa0f9b",
      linkIco: "https://www.figma.com/api/mcp/asset/8a65f3b2-58dd-4a6b-85e2-a52843d9124c",
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
    showcase: "./assets/scene-sim/feat-showcase.png",
  };

  window.SCENE_SIM_DATA = { U, categories, scenarioCards, featured };
})();
