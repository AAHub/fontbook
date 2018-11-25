import { Component, Prop, State } from "@stencil/core";
import { FontsProvider, Font } from "../../providers/fonts";
import { getAA, getCSS, execCopy, setMetaTags } from "../../helpers/utils";
import Prism from "prismjs";

@Component({
  tag: "app-font",
  styleUrl: "app-font.css"
})
export class AppFont {
  @Prop() id: string;
  @State() font: Font;
  @State() css: string = "";
  @State() aa: string = "";
  @State() copied: boolean = false;

  async componentWillLoad() {
    this.aa = getAA();
    const id = Number(this.id);
    this.font = await FontsProvider.getFontsDataById(id);
    this.css = getCSS(this.font.name);
    setMetaTags(this.font.name);
  }

  componentDidUnload() {
    setMetaTags();
  }

  async copy() {
    execCopy(this.css);
    this.copied = true;
  }

  highlight(code: string, lang?: string) {
    return Prism.highlight(code, Prism.languages[lang]);
  }

  render() {
    const hcl = [];
    let code = this.css
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
          <div class="font-name u-mtb8">{this.font.name}</div>
          <div class={`${this.font.name} aa`}>{this.aa}</div>
        </div>
        <div class="u-divider u-mt28" />
        <ion-button
          fill="clear"
          class="u-mt20"
          size="small"
          color="dark"
          onClick={() => this.copy()}
        >
          {this.copied ? "CSSをコピーしました" : "CSSをコピーする"}
        </ion-button>
        <highlight-code-line lines={hcl.join()}>
          <pre class="language-css">
            <code
              class="language-css"
              innerHTML={escaped ? code : escape(code)}
            />
          </pre>
        </highlight-code-line>
      </ion-content>
    ];
  }
}
