// export const BASE_URL = "https://github.com/AAHub/fontbook/blob/master/src/";
export const BASE_URL = "https://<フォントのパス>";
export const DOWNLOAD_URL = "https://fonts.aahub.org";
import { SAITAMAAR_MAP } from "./saitamaar_map";

export const getAA = () => {
  const aa: string = `　　 　　　＿＿＿_
  　　　／　　 　 　＼
  　 ／　　─　 　 ─＼
  ／ 　　 （●） 　（●） ＼
  |　 　　 　 （__人__）　 　 |
  ./　　　　 ∩ノ ⊃　　／
  (　 ＼　／ ＿ノ　|　 |
  .＼　“　　／＿＿|　 |
  　　＼ ／＿＿＿ ／ `;

  //  const aa: string = `|　　　 ∧ ∧ 　 　 | 　　 　 ∧∧ 　 　 | 　　 ∧___∧　　　│　　　∧＿∧　　　 |
  //|　　　 (*ﾟーﾟ)　　　|　　　　(,,ﾟДﾟ)　　　|　　 （ ´∀｀ ）　 　│　　 （・∀・ ,,）　　 │
  //|　　 　 U　 |　　　│　　 　(i　　i).　 　 |　　 （　　 　 ） 　 　| 　　 （　　　　）　　 │
  //| 　　～|　　|　　　│　　 ～|　　|　　　 | 　　 i　　 　 i 　 　 |　　　 |　｜ ｜ 　　 .|
  //|　　　　Ｕ Ｕ　　　│　　　　し\`Ｊ 　 　│　　（,__,ﾊ,__,） 　 　| 　　 （＿（_＿） 　　 |`;
  return aa;
};
export const getUnicodeAA = () => {
  const aa: string = `▂▃◢▇█████████████████▌██◤▐██████▋
  ▀　　　　▐██▐███████████▉◦ █▊ 。 ◥██████▌
  　　　　　███▐◤██████████◤▬█▬▬▬▬██▌▉██▍
  　　　　 ███▎▉ ██▉███◤ ██▍　▁▁▁　　。▉█▐▎██
  　　　　▐████▊▐█▎██◤。██ 　　▂▂▂▂▂▂▉▐▐▌██▍
  　　　　 █████▉▐▌▐█▀◣▐█　　◢▉▐  Ӏ 　 】　█▐▐▉██▋
  　　　 ██████▋▉▐█】　  █▍　　　 ▉ ◥▦◤◢ 　 ███▊███
  　　　██████████▬◤ ▐▌　　　　 ▀▀▀  ◢░███▋███▍
  　 ◢█◤▀ ██  ◥████░░▐▎　╵ 　　░░░░░░███▍███▉
  　◢▀ 　　███▍ ◥██▌　　▉　　　　　　　　　　◢███▎████▋
  　　　　 █████◣◥██◣   u　  ◢░░◣　　 u　◢▇███▋▐█████◣
  　　　 ██████▇ ◥██▇▅▃　　　▂▃▆▇██▐█◤ ▇███████◣
  　　　▐███████◤▀ 　　▐ ▀▀▀▀　▐▆▅　██◢███████ ◥█▉
  　　　████▀　▂▂▂▃▃◢▀ 　　　　　　▀▆▃█◤ 　　 ▀◥████▎  ◥█◣
  　　　█▎▌　　　▼】   　▌  ι　　　　　　 ◡▂█　　　　　　 ▀◥██▌　　▀◣
  　　　█　▊　　　  ▀◥◣ 【  　　　　　◢◤  。◢▀ ▐　　　　▂▂▃▃██▌
  　　　▊▐▀▆▃　　　　 ◥◣▀▀▀◣   ◢▬▅◤　　　▌ 　▆▀▀　　▐██▍
  　　　▌▐◣ 　 ▀▇▬▆◣▃▂◥▬▅ 　。▐▍【】▂▃█▀▀  　◢ 　　　█▉
  　　　　 ▉  ◥◣　▉▇▀▆　 ▀◣▃【】 　▐▃◢▀  　　　　 ▼  ◢◤　　█◤
  　　　　█　　 ◥█▋　 ▀▆　　▼▀▀▀▀ 　◢◤　　　　▐◤  　　　▐

  `;
  return aa;
};
export const sayHello = () => {
  return Math.random() < 0.5 ? "Hello" : "Hola";
};

export const execCopy = (text) => {
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

export const getFontPath = (name: string = "", ext: string = "") => {
  return `${DOWNLOAD_URL}/assets/fonts/${name}/${name}.${ext}`;
};

export const getCSS = (name: string = "") => {
  const css: string = `@font-face {
  font-family: "${name}";
  src: url("${BASE_URL}/${name}.woff2") format("woff2"),
    url("${BASE_URL}/${name}.woff") format("woff"),
    url("${BASE_URL}/${name}.ttf") format("ttf");
  font-display: swap;
}

.${name} {
  font-family: "${name}";
  white-space: pre;
  font-size: 16px;
  line-height: 18px;
}`;
  return css;
};

export const getBytes = (size: number = 0) => {
  let s = size / 1024;
  if (s < 1024) {
    return Math.round(s * 10) / 10 + "KB";
  }
  return Math.round((s / 1024) * 10) / 10 + "MB";
};

export const setMetaTags = (title: string = "") => {
  if (title != "") {
    title = title + " | ";
  }
  document.title =
    title + "AAHub Fonts - アスキーアート表示用Webフォントのカタログサイト";
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

export const getCharCodeAt = (str: string = "") => {
  return str.charCodeAt(0);
};

export const fromCharCodeAt = (code: number = 0) => {
  return String.fromCharCode(code);
};

export const getKmeansResult = (code: number = 0) => {
  const map = SAITAMAAR_MAP[code];
  if (map) {
    return map;
  } else {
    return 0;
  }
};

export const getLikeChar = (code: number = 0) => {
  let result = [];
  for (const key of Object.keys(SAITAMAAR_MAP)) {
    if (SAITAMAAR_MAP[key] == code) {
      const keyCode = Number(key);
      const str = String.fromCharCode(keyCode);
      result.push(str);
    }
  }
  return result;
};
