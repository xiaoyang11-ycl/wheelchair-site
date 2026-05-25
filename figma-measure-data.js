/** 尺寸测量（资源使用本地 assets） */
(function () {
  const A = "./assets/";
  const ico = (name) => A + "support/" + name;

  const U = {
    pageBg: "",
    heroWheelchair: A + "viewer/main-wheelchair.png",
    hintDeco: ico("ico-help.svg"),
    dotDeco: ico("ico-dot.svg"),
    toolbar: [
      { key: "view", label: "视角切换", icon: A + "viewer/thumb-front.png" },
      { key: "zoom", label: "缩放查看", icon: ico("ico-help.svg") },
      { key: "points", label: "测量点", icon: ico("ico-dot.svg") },
      { key: "reset", label: "复位视图", icon: ico("ico-flow-follow.svg") },
      { key: "plan", label: "平面视图", icon: A + "viewer/view-front.png" },
      { key: "help", label: "帮助", icon: ico("ico-help.svg") },
    ],
    viewerActions: [
      { key: "rotate", label: "360°旋转", icon: A + "viewer/thumb-front-oblique.png" },
      { key: "annotate", label: "精确标注", icon: ico("ico-wrench.svg") },
      { key: "screenshot", label: "保存截图", icon: ico("ico-file.svg") },
    ],
    resetIco: ico("ico-flow-follow.svg"),
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
    { id: "back", label: "靠背高度", desc: "座椅靠背顶部到地的垂直高度", value: "45.0", icon: ico("ico-book.svg") },
    { id: "depth", label: "座深", desc: "座椅前沿到靠背的水平距离", value: "42.0", icon: ico("ico-wrench.svg") },
    { id: "width", label: "座宽", desc: "扶手内侧之间的距离", value: "46.0", icon: ico("ico-dot.svg"), badge: "3" },
    { id: "front", label: "前座高", desc: "地面至座面前沿的垂直高度", value: "50.5", icon: ico("ico-flow-fast.svg") },
    { id: "length", label: "车身长度", desc: "前轮至后轮的整体长度", value: "102.0", icon: ico("ico-flow-solution.svg") },
    { id: "bodyw", label: "车身宽度", desc: "车轮外缘之间的宽度", value: "68.0", icon: ico("ico-flow-submit.svg") },
    { id: "seatH", label: "座面离地高度", desc: "座面至地面的垂直高度", value: "50.0", icon: ico("ico-trust-team.svg") },
  ];

  const adaptRows = [
    { title: "椅背高度", range: "建议范图:42-48cm", status: "合适", icon: ico("ico-trust-shield.svg") },
    { title: "座面高度", range: "建议范图:48-52cm", status: "合适", icon: ico("ico-trust-clock.svg") },
    { title: "座深", range: "建议范图:40-45cm", status: "合适", icon: ico("ico-trust-infinity.svg") },
    { title: "座宽", range: "建议范图:44-48cm", status: "合适", icon: ico("ico-trust-team.svg") },
  ];

  const templates = [
    { title: "标准型", sub: "(165-175cm)", hint: "适合中等身高用户", icon: ico("ico-trust-shield.svg") },
    { title: "较高型(175-186cm)", sub: "", hint: "适合高个用户", icon: ico("ico-trust-clock.svg") },
    { title: "较矮型(155-166cm)", sub: "", hint: "适合偏矮或股体较小用户", icon: ico("ico-trust-infinity.svg") },
    { title: "儿童型(120-150cm)", sub: "", hint: "适合青少年或儿童", icon: ico("ico-trust-team.svg") },
  ];

  const humanRows = [
    { label: "坐姿肩高", value: "58.0cm", icon: ico("ico-book.svg") },
    { label: "坐姿臂宽", value: "36.0", unit: " cm", icon: ico("ico-wrench.svg") },
    { label: "小腿长度", value: "43.0cm", icon: ico("ico-flow-fast.svg") },
    { label: "臀膝长度", value: "53.0", unit: " cm", icon: ico("ico-flow-solution.svg") },
  ];

  const humanFigure = A + "viewer/view-side.png";
  const customArrow = ico("ico-chevron-right.svg");

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
