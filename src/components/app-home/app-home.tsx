import { Component, Element, State } from "@stencil/core";
import { FontsProvider, Font } from "../../providers/fonts";
import { getAA } from "../../helpers/utils";

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
          <ion-title>AAHub Fonts</ion-title>
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
                  <div
                    class="aa-wrapper u-mt12 u-mlr8 u-mb4"
                    onClick={() => this.toPage(font.id)}
                  >
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
                    <div class={`${font.name} aa u-ml24 u-pb20 `}>{this.aa}</div>
                    <div class="u-mr20 msg">詳細をみる</div>
                  </div>
                );
              }
              return list;
            }
          })()}
        </div>
      </ion-content>
    ];
  }
}
