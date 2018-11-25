export const BASE_URL = "https://fonts-aahub.netlify.com/";
export const getAA = () => {
  const aa: string = `　 　　　＿＿＿_
　　　／　　 　 　＼
　 ／　　─　 　 ─＼
／ 　　 （●） 　（●） ＼
|　 　　 　 （__人__）　 　 |
./　　　　 ∩ノ ⊃　　／
(　 ＼　／ ＿ノ　|　 |
.＼　“　　／＿＿|　 |
　　＼ ／＿＿＿ ／`;
  return aa;
};
export const sayHello = () => {
  return Math.random() < 0.5 ? "Hello" : "Hola";
};

export const execCopy = text => {
  var temp = document.createElement("div");
  temp.appendChild(document.createElement("pre")).textContent = text;
  var s = temp.style;
  s.position = "fixed";
  s.left = "-100%";
  document.body.appendChild(temp);
  document.getSelection().selectAllChildren(temp);
  document.execCommand("copy");
  document.body.removeChild(temp);
};

export const getCSS = (name: string = "") => {
  const css: string = `@font-face {
  font-family: "${name}";
  src: url("${BASE_URL}assets/fonts/${name}/${name}.woff2") format("woff2"),
    url("${BASE_URL}assets/fonts/${name}/${name}.woff") format("woff"),
    url("${BASE_URL}assets/fonts/${name}/${name}.ttf") format("ttf");
  font-display: swap;
}

.${name} {
  font-family: "${name}";
  white-space: pre;
  font-size: 16px;
  line-height: 16px;
}`;
  return css;
};

export const setMetaTags = (title: string = "") => {
  if (title != "") {
    title = title + " | ";
  }
  document.title = title + "AAHub Fonts";
};
