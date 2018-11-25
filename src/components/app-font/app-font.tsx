import { Component, Prop, State } from "@stencil/core";
import { FontsProvider, Font } from "../../providers/fonts";
import { getAA } from "../../helpers/utils";

@Component({
  tag: "app-font",
  styleUrl: "app-font.css"
})
export class AppFont {
  @Prop() id: string;
  @State() font: Font;
  aa: string = "";

  css: string = `@font-face {
  font-family: "aahub";
  src: url("/assets/fonts/aahub/aahub.woff2") format("woff2"),
    url("/assets/fonts/aahub/aahub.woff") format("woff"),
    url("/assets/fonts/aahub/aahub.ttf") format("ttf");
  font-display: swap;
}`;
  async componentWillLoad() {
    this.aa = getAA();
    const id = Number(this.id);
    this.font = await FontsProvider.getFontsDataById(id);
    console.log(this.font);
  }

  render() {
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
          <div class="u-divider u-mt12" />
          <ion-button
            href={"font/" + this.font.id}
            fill="clear"
            color="dark"
            class="font-name"
          >
            {this.font.name}
          </ion-button>
          <div class={`${this.font.name} aa`}>{this.aa}</div>
        </div>
        <pre>
          <code class="codeblock">{this.css}</code>
        </pre>
      </ion-content>
    ];
  }
}
