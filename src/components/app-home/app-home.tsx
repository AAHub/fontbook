import { Component, Element, State } from "@stencil/core";
import { FontsProvider, Font } from "../../providers/fonts";
import { getAA, setMetaTags } from "../../helpers/utils";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @State() fontsMetaData: Font[] = [];
  @Element() el: any;
  aa: string = "";

  async componentWillLoad() {
    this.aa = getAA();
    this.fontsMetaData = await FontsProvider.fetchFontsData();
    setMetaTags();
  }

  async toPage(id: number = 0) {
    (this.el.closest("ion-nav") as any).push("app-font", {
      id: id
    });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="medium">
          <ion-title>
            AAHub Fonts - アスキーアート表示対応フォント収集サイト
          </ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <div class="title u-mlr8">
          全部で <span class="font-length">{this.fontsMetaData.length}</span>{" "}
          個のfont-familyを収録.
        </div>
        <div class="font-list">
          {(() => {
            if (this.fontsMetaData) {
              let list = [];
              for (let font of this.fontsMetaData) {
                list.push(
                  <div class="aa-wrapper u-mt12 u-mlr8 u-mb4">
                    <div class="u-divider u-mt12" />
                    <ion-button
                      href={"font/" + font.id}
                      fill="clear"
                      size="small"
                      color="dark"
                      class="font-name u-ptb0 u-mtb0"
                    >
                      {font.name}
                    </ion-button>
                    <div class={`${font.name} aa u-ml24 u-pb20 `}>
                      {this.aa}
                    </div>
                    <ion-button
                      href={"font/" + font.id}
                      fill="clear"
                      class="msg"
                    >
                      詳細をみる
                    </ion-button>
                  </div>
                );
              }
              return list;
            }
          })()}
        </div>
        <div class="footer">
          <div class="description">
            AAHub Fontsではアスキーアート表示用フォントを紹介しています。<br />
            HTML、CSS設定も紹介してるのでご活用ください。<br />
          </div>
          <div class="description">
            <a class="u-mlr8" href="https://aahub.org" target="_blank">
              AAHub
            </a>
            <a
              class="u-mlr8"
              href="https://github.com/AAHub/fontbook"
              target="_blank"
            >
              GitHub
            </a>
          </div>
          <div class="credit u-fc-sub-black">
            Creaeted by AAHub Fonts 2018 .
          </div>
        </div>
      </ion-content>
    ];
  }
}
