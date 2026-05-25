/**
 * 配件商城数据与配图（按文案匹配的本地产品图）
 */
(function () {
  const A = "./assets/";
  const V = "?v=mall-20260526-10";

  const P = {
    belt: A + "mall/belt-real.png" + V,
    bag: A + "mall/bag-real.png" + V,
    wheelchairA: A + "mall/anti-tip-real.png" + V,
    wheelchairB: A + "mall/footrest-real.png" + V,
    wheelchairC: A + "mall/armrest-real.png" + V,
    wheel: A + "mall/wheel-real.png" + V,
    pillow: A + "mall/headrest-real.png" + V,
    cushion: A + "mall/cushion-real.png" + V,
    lifestyle: A + "mall/featured-kit.png" + V,
    indoor: A + "mall/featured-kit.png" + V,
  };

  const catStrip = [
    { id: "all", label: "全部配件" },
    { id: "cushion", label: "坐垫靠背" },
    { id: "head", label: "头枕支撑" },
    { id: "wheels", label: "车轮组件" },
    { id: "frame", label: "车架配件" },
    { id: "safety", label: "安全防护" },
    { id: "travel", label: "出行辅助" },
    { id: "storage", label: "存储配件" },
    { id: "other", label: "其他配件" },
  ];

  const typeChecks = [
    { id: "cushion", label: "坐垫靠背" },
    { id: "head", label: "头枕支撑" },
    { id: "wheels", label: "车轮组件" },
    { id: "frame", label: "车架配件" },
    { id: "safety", label: "安全防护" },
    { id: "travel", label: "出行辅助" },
    { id: "storage", label: "存储配件" },
    { id: "other", label: "其他配件" },
  ];

  const eight = [
    {
      id: 1,
      cat: "safety",
      title: "安全腰带",
      desc: "快扣合设计，安全可靠",
      price: 180,
      sales: 900,
      cardBg: null,
      thumbTint: "#f4f5f7",
      imgMain: P.belt,
    },
    {
      id: 2,
      cat: "storage",
      title: "座椅储物包",
      desc: "大容量收纳，便捷出行",
      price: 260,
      sales: 1200,
      cardBg: null,
      thumbTint: "#f4f5f7",
      imgMain: P.bag,
    },
    {
      id: 3,
      cat: "safety",
      title: "防倾杆",
      desc: "增强稳定性，防止后倾",
      price: 220,
      sales: 430,
      cardBg: null,
      thumbTint: "#f0f1f3",
      imgMain: P.wheelchairA,
    },
    {
      id: 4,
      cat: "frame",
      title: "可调节脚踏板",
      desc: "高度角度可调，适配不同需求",
      price: 550,
      sales: 880,
      cardBg: null,
      thumbTint: "#f0f1f3",
      imgMain: P.wheelchairB,
    },
    {
      id: 5,
      cat: "frame",
      title: "可翻转扶手",
      desc: "翻折设计，方便侧向转移",
      price: 480,
      sales: 720,
      cardBg: null,
      thumbTint: "#f4f5f7",
      imgMain: P.wheelchairC,
    },
    {
      id: 6,
      cat: "wheels",
      title: "快拆后轮24英寸",
      desc: "铝合金轮圈，快拆设计，轻便耐用",
      price: 1280,
      sales: 540,
      cardBg: null,
      thumbTint: "#eef0f2",
      imgMain: P.wheel,
    },
    {
      id: 7,
      cat: "head",
      title: "可调节头枕",
      desc: "多向调节，贴合颈部，舒适支撑",
      price: 380,
      sales: 960,
      cardBg: null,
      thumbTint: "#f4f5f7",
      imgMain: P.pillow,
    },
    {
      id: 8,
      cat: "cushion",
      title: "舒适减压坐垫",
      desc: "记忆棉材质，透气减压，久坐不累",
      price: 680,
      sales: 1820,
      cardBg: null,
      thumbTint: "#f4f5f7",
      imgMain: P.cushion,
    },
  ];

  const thumbPool = eight.map((p) => p.imgMain).concat([P.lifestyle, P.indoor]);

  const products56 = [];
  for (let i = 0; i < 56; i++) {
    const b = eight[i % 8];
    products56.push({
      ...b,
      id: i + 1,
      title: i < 8 ? b.title : `${b.title} · 规格 ${i + 1}`,
      imgMain: i < 8 ? b.imgMain : thumbPool[i % thumbPool.length],
    });
  }

  const features = [
    {
      tag: "精选推荐",
      title: "舒适出行套装",
      desc: "提升乘坐舒适度，长时间使用更轻松",
      price: 1680,
      was: 2200,
      img: P.lifestyle,
    },
    {
      tag: "精选推荐",
      title: "舒适出行套装",
      desc: "组合搭配更省心，一键加入方案",
      price: 1680,
      was: 2200,
      img: P.lifestyle,
    },
    {
      tag: "精选推荐",
      title: "舒适出行套装",
      desc: "官方搭配建议，适配多场景出行",
      price: 1680,
      was: 2200,
      img: P.indoor,
    },
  ];

  window.MALL_FIGMA = {
    A: {},
    catStrip,
    typeChecks,
    eight,
    products56,
    features,
    featDots: null,
  };
})();
