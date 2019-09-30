import { Component, Prop, h, State } from "@stencil/core";
import { FontsProvider, Font } from "../../providers/fonts";
import {
  setMetaTags,
  getCharCodeAt,
  getKmeansResult,
  getLikeChar
} from "../../helpers/utils";

@Component({
  tag: "app-font-detail",
  styleUrl: "app-font-detail.css"
})
export class AppFontDetail {
  @Prop() id: string;
  @State() font: Font;
  @State() text: string = "";
  @State() likeCodes: number[] = [];

  async componentWillLoad() {
    const id = Number(this.id);
    this.font = await FontsProvider.getFontsDataById(id);
    setMetaTags(this.font.name + "類似文字検索");
  }

  componentDidUnload() {
    setMetaTags();
  }

  result() {
    const c = getCharCodeAt(this.text);
    const code = getKmeansResult(c);
    this.likeCodes = getLikeChar(code);
  }

  textInput(el) {
    this.text = el.srcElement.value;
    getKmeansResult();
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

      <ion-content class="ion-padding">
        <h1>類似フォント検索(仮)</h1>
        <div class="u-mtb4">
          <div class="font-name u-mtb8">フォント名：{this.font.name}</div>
          <div class="input-wrapper">
            <input
              id="aa-textarea"
              class="input-aa"
              placeholder="調べたい文字を入力"
              onInput={e => this.textInput(e)}
            />
            <ion-button color="dark" size="small" onClick={() => this.result()}>
              検索
            </ion-button>
          </div>
        </div>
        <div class="u-divider u-mt28" />
        <div class="meta-wrapper">
          <div class="meta-title">結果出力</div>
          <div class={`${this.font.name} result-wrapper`}>
            {(() => {
              let list = [];
              for (const code of this.likeCodes) {
                list.push(<div>{code}</div>);
              }
              return list;
            })()}
          </div>
        </div>
        <div class="footer">
          <div class="description">
            AAHub Fontsではアスキーアート表示用フォントを紹介しています。<br />
            HTML、CSS設定も紹介してるのでご活用ください。<br />
          </div>
          <div class="credit u-fc-sub-black">
            Creaeted by AAHub Fonts 2018 .
          </div>
        </div>
      </ion-content>
    ];
  }
}
