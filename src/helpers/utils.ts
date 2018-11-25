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
