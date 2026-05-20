/** Figma 节点 113:436 — 尺寸测量（资源来自 MCP get_design_context） */
(function () {
  const U = {
    pageBg: "https://www.figma.com/api/mcp/asset/2e7f035d-71a3-4a0b-a9d3-8ba48f5025ce",
    heroWheelchair: "https://www.figma.com/api/mcp/asset/c3966642-6d63-43c2-9c52-7ccec46d9522",
    hintDeco: "https://www.figma.com/api/mcp/asset/18f86a75-ab51-42d2-b851-f65a448c6029",
    dotDeco: "https://www.figma.com/api/mcp/asset/3e8809f5-9f50-44c0-81fd-4654d02e6e94",
    toolbar: [
      { key: "view", label: "视角切换", icon: "https://www.figma.com/api/mcp/asset/bfd255f9-4b7d-4903-af82-bcc9ef969a44" },
      { key: "zoom", label: "缩放查看", icon: "https://www.figma.com/api/mcp/asset/92d53b8b-e1cf-47a1-b23d-950f8f287ac1" },
      { key: "points", label: "测量点", icon: "https://www.figma.com/api/mcp/asset/6fb88efb-daf5-4eff-b85a-afceacee0615" },
      { key: "reset", label: "复位视图", icon: "https://www.figma.com/api/mcp/asset/3a3d8ef2-3605-44c1-b60a-b288b064e579" },
      { key: "plan", label: "平面视图", icon: "https://www.figma.com/api/mcp/asset/e1e5872e-14ef-47d9-8302-e893bd7870e8" },
      { key: "help", label: "帮助", icon: "https://www.figma.com/api/mcp/asset/fa75d12c-3f23-4a62-a81c-70af4d8d8f64" },
    ],
    viewerActions: [
      { key: "rotate", label: "360°旋转", icon: "https://www.figma.com/api/mcp/asset/79efe5f8-2c48-4ec1-93cd-e3274ad4bd0f" },
      { key: "annotate", label: "精确标注", icon: "https://www.figma.com/api/mcp/asset/f53a1942-b44e-4e75-aec7-1dbae92a5b8f" },
      { key: "screenshot", label: "保存截图", icon: "https://www.figma.com/api/mcp/asset/60c8cc7f-e97e-433e-b62c-5a318b1bdd36" },
    ],
    resetIco: "https://www.figma.com/api/mcp/asset/dfdb2020-0cfc-42a4-9d3c-85021a45b84e",
  };

  const hotspots = [
    { id: 1, top: "12%", left: "48%" },
    { id: 2, top: "22%", left: "58%" },
    { id: 3, top: "38%", left: "42%" },
    { id: 4, top: "42%", left: "55%" },
    { id: 5, top: "55%", left: "38%" },
    { id: 6, top: "62%", left: "52%" },
    { id: 7, top: "72%", left: "45%" },
  ];

  const measureRows = [
    { id: "back", label: "靠背高度", desc: "座椅靠背顶部到地的垂直高度", value: "45.0", icon: "https://www.figma.com/api/mcp/asset/fa75d12c-3f23-4a62-a81c-70af4d8d8f64" },
    { id: "depth", label: "座深", desc: "座椅前沿到靠背的水平距离", value: "42.0", icon: "https://www.figma.com/api/mcp/asset/14bd5d1d-7b43-4d54-a542-a6cb4fc6cfcf" },
    { id: "width", label: "座宽", desc: "扶手内侧之间的距离", value: "46.0", icon: "https://www.figma.com/api/mcp/asset/913bcee5-e3c8-4005-8961-78d8a2ac404e", badge: "3" },
    { id: "front", label: "前座高", desc: "地面至座面前沿的垂直高度", value: "50.5", icon: "https://www.figma.com/api/mcp/asset/1d5e3616-6e62-440d-8f56-bd3cce8832cf" },
    { id: "length", label: "车身长度", desc: "前轮至后轮的整体长度", value: "102.0", icon: "https://www.figma.com/api/mcp/asset/214be64b-3664-4ffd-8b2f-32a931dbf603" },
    { id: "bodyw", label: "车身宽度", desc: "车轮外缘之间的宽度", value: "68.0", icon: "https://www.figma.com/api/mcp/asset/0d2f90b1-f541-40e7-af81-c87ec0df6b33" },
    { id: "seatH", label: "座面离地高度", desc: "座面至地面的垂直高度", value: "50.0", icon: "https://www.figma.com/api/mcp/asset/cbb1847b-21b5-40f5-b873-20a6f3d04fdc" },
  ];

  const adaptRows = [
    { title: "椅背高度", range: "建议范图:42-48cm", status: "合适", icon: "https://www.figma.com/api/mcp/asset/da31fa56-c2b9-496d-bbed-349c99ee8b70" },
    { title: "座面高度", range: "建议范图:48-52cm", status: "合适", icon: "https://www.figma.com/api/mcp/asset/39dfe78e-f1d0-441a-be29-7b073607c890" },
    { title: "座深", range: "建议范图:40-45cm", status: "合适", icon: "https://www.figma.com/api/mcp/asset/6868e882-79b9-4713-a51e-2e0caa15182f" },
    { title: "座宽", range: "建议范图:44-48cm", status: "合适", icon: "https://www.figma.com/api/mcp/asset/5b678695-9ef9-4574-9201-a8b6dcdd1cfc" },
  ];

  const templates = [
    { title: "标准型", sub: "(165-175cm)", hint: "适合中等身高用户", icon: "https://www.figma.com/api/mcp/asset/2fe80e0e-080b-4911-87fb-8a184b4eefc0" },
    { title: "较高型(175-186cm)", sub: "", hint: "适合高个用户", icon: "https://www.figma.com/api/mcp/asset/2e9d9601-9667-4a45-abbc-06ff1e200b8a" },
    { title: "较矮型(155-166cm)", sub: "", hint: "适合偏矮或股体较小用户", icon: "https://www.figma.com/api/mcp/asset/15dcedc6-cb15-41ef-a17b-0e57891a608a" },
    { title: "儿童型(120-150cm)", sub: "", hint: "适合青少年或儿童", icon: "https://www.figma.com/api/mcp/asset/758a1d68-ccee-403a-bc6f-36ca385dc618" },
  ];

  const humanRows = [
    { label: "坐姿肩高", value: "58.0cm", icon: "https://www.figma.com/api/mcp/asset/ca2020c1-31b5-478a-96f4-47af2cb4b488" },
    { label: "坐姿臂宽", value: "36.0", unit: " cm", icon: "https://www.figma.com/api/mcp/asset/2671d017-50b2-4c4b-82d1-b916dd629bd6" },
    { label: "小腿长度", value: "43.0cm", icon: "https://www.figma.com/api/mcp/asset/7e22efb4-6eb9-45e9-a729-474a1e236d7f" },
    { label: "臀膝长度", value: "53.0", unit: " cm", icon: "https://www.figma.com/api/mcp/asset/a41c34cc-e91e-4cab-bedd-9eddc9b25ca3" },
  ];

  const humanFigure = "https://www.figma.com/api/mcp/asset/15c81829-a1a9-47e0-8f74-3a69068a9442";
  const customArrow = "https://www.figma.com/api/mcp/asset/71cf67f9-b643-45fd-807e-c24ecb605240";

  window.MEASURE_FIGMA_DATA = {
    U,
    hotspots,
    measureRows,
    adaptRows,
    templates,
    humanRows,
    humanFigure,
    customArrow,
  };
})();
