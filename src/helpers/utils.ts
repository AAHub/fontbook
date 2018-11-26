export const BASE_URL = "https://fonts-aahub.netlify.com/";
export const getAA = () => {
  const aa: string = `　　 　　　＿＿＿_
  　　　／　　 　 　＼
  　 ／　　─　 　 ─＼
  ／ 　　 （●） 　（●） ＼
  |　 　　 　 （__人__）　 　 |
  ./　　　　 ∩ノ ⊃　　／
  (　 ＼　／ ＿ノ　|　 |
  .＼　“　　／＿＿|　 |
  　　＼ ／＿＿＿ ／`;

  //  const aa: string = `|　　　 ∧ ∧ 　 　 | 　　 　 ∧∧ 　 　 | 　　 ∧___∧　　　│　　　∧＿∧　　　 |
  //|　　　 (*ﾟーﾟ)　　　|　　　　(,,ﾟДﾟ)　　　|　　 （ ´∀｀ ）　 　│　　 （・∀・ ,,）　　 │
  //|　　 　 U　 |　　　│　　 　(i　　i).　 　 |　　 （　　 　 ） 　 　| 　　 （　　　　）　　 │
  //| 　　～|　　|　　　│　　 ～|　　|　　　 | 　　 i　　 　 i 　 　 |　　　 |　｜ ｜ 　　 .|
  //|　　　　Ｕ Ｕ　　　│　　　　し\`Ｊ 　 　│　　（,__,ﾊ,__,） 　 　| 　　 （＿（_＿） 　　 |`;
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

export const getHTML = (name: string = "") => {
  const css: string = `<link href="${BASE_URL}assets/css/${name}.css" rel="stylesheet">`;
  return css;
};

export const platformIs = (platform: string = "") => {
  var ua = navigator.userAgent;

  if (
    ua.indexOf("iPhone") > 0 ||
    (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
  ) {
    // スマートフォン
    if (ua.indexOf("iPhone") > 0) {
      // iPhone
      if (platform == "ios") {
        return true;
      }
    }
    if (ua.indexOf("Android") > 0) {
      if (platform == "android") {
        return true;
      }
    } // Android
  } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
    // タブレット
    if (ua.indexOf("iPad") > 0) {
      if (platform == "ios") {
        return true;
      }
    } // iPad
    if (ua.indexOf("Android") > 0) {
      if (platform == "android") {
        return true;
      }
    } // Android
  } else {
    // PC用コード
    if (platform == "pc") {
      return true;
    }
  }
  return false;
};
