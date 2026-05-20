const fs = require("fs");
const path = require("path");
const root = __dirname;
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
html = html.replace(/<h1 class="home-hero__title">[\s\S]*?<\/h1>/, '<h1 class="home-hero__title">舒适出行，从定制开始</h1>');
html = html.replace("匹配配件", "配备配件");
fs.writeFileSync(path.join(root, "index.html"), html);
console.log("index ok");
