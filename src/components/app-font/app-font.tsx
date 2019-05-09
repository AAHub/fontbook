import { Component, Listen, Prop, State } from "@stencil/core";
import { FontsProvider, Font } from "../../providers/fonts";
import {
  getAA,
  getCSS,
  getHTML,
  execCopy,
  getBytes,
  getFontPath,
  setMetaTags
} from "../../helpers/utils";
import Prism from "prismjs";

@Component({
  tag: "app-font",
  styleUrl: "app-font.css"
})
export class AppFont {
  @Prop() id: string;
  @State() font: Font;
  @State() css: string = "";
  @State() html: string = "";
  @State() aa: string = "";
  @State() copied_css: boolean = false;
  @State() copied_html: boolean = false;

  @Listen("paste")
  handlePaste(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const plaintext = ev.clipboardData.getData("text/plain");
    this.aa = plaintext;
  }

  async componentWillLoad() {
    this.aa = getAA();
    const id = Number(this.id);
    this.font = await FontsProvider.getFontsDataById(id);
    this.css = getCSS(this.font.name);
    this.html = getHTML(this.font.name);
    setMetaTags(this.font.name);
  }

  componentDidUnload() {
    setMetaTags();
  }

  async copyCSS() {
    execCopy(this.css);
    this.copied_css = true;
  }

  async copyHTML() {
    execCopy(this.html);
    this.copied_html = true;
  }

  highlight(code: string, lang?: string) {
    return Prism.highlight(code, Prism.languages[lang]);
  }

  genCode(src: string) {
    const hcl = [];
    let code = src
      .split("\n")
      .map((line, index) => {
        if (line.charAt(0) === "|") {
          hcl.push(index + 1);
          return line.substring(1);
        }
        return line;
      })
      .join("\n");

    let escaped = false;
    const out = this.highlight(code, "css");
    if (out != null) {
      escaped = true;
      code = out;
    }
    return [hcl, code, escaped];
  }

  render() {
    let css = this.genCode(this.css);
    const hcl: any = css[0];
    const code: any = css[1];
    const escaped: any = css[2];

    return [
      <ion-header>
        <ion-toolbar color="medium">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" text="" />
          </ion-buttons>
          <ion-title>フォント: {this.font.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <div class="u-mtb4">
          <div class="font-name u-mtb8">フォント名：{this.font.name}</div>
          <div>下のAAは自由に変更できます</div>
          <div
            contenteditable={true}
            class={`${this.font.name} aa aa-textarea`}
          >
            {this.aa}
          </div>
        </div>
        <div class="u-divider u-mt28" />
        <div class="meta-wrapper">
          <div class="meta-title">詳細情報</div>
          <div class="fonts-wrapper">
            <div class="size">ttf: {getBytes(this.font.size[0].size)}</div>
            <div class="size">woff: {getBytes(this.font.size[1].size)}</div>
            <div class="size">woff2: {getBytes(this.font.size[2].size)}</div>
          </div>
        </div>
        <div class="u-divider u-mt28" />
        <div class="css">
          <ion-button
            fill="clear"
            class="u-mt20 ev-copy-css"
            size="small"
            color="dark"
            onClick={() => this.copyCSS()}
          >
            {this.copied_css ? "CSSをコピーしました" : "CSSをコピーする"}
          </ion-button>
          <highlight-code-line lines={hcl.join()}>
            <pre class="language-css">
              <code
                class="language-css"
                innerHTML={escaped ? code : escape(code)}
              />
            </pre>
          </highlight-code-line>
        </div>
        <div class="u-divider u-mt28" />
        <div class="download">
          <div class="meta-title">フォントをダウンロード</div>
          <div class="font">
            <a href={getFontPath(this.font.name, "ttf")} target="_blank">
              ttfをダウンロード
            </a>
          </div>
          <div class="font">
            <a href={getFontPath(this.font.name, "woff")} target="_blank">
              woffをダウンロード
            </a>
          </div>
          <div class="font">
            <a href={getFontPath(this.font.name, "woff2")} target="_blank">
              woff2をダウンロード
            </a>
          </div>
        </div>
        <div class="footer">
          <div class="description">
            AAHub Fontsではアスキーアート表示用フォントを紹介しています。
            <br />
            HTML、CSS設定も紹介してるのでご活用ください。
            <br />
          </div>
          <div class="credit u-fc-sub-black">
            Creaeted by AAHub Fonts 2018 .
          </div>
        </div>
      </ion-content>
    ];
  }
}
