import { Component, State, h } from "@stencil/core";
import { platformIs } from "../../helpers/utils";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
})
export class AppRoot {
  @State() swipe: boolean = false;

  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  componentWillLoad() {
    if (platformIs("ios") || platformIs("android")) {
      this.swipe = true;
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/font/:id" component="app-font" />
          <ion-route url="/font/:id/detail" component="app-font-detail" />
        </ion-router>
        <ion-nav swipeGesture={this.swipe} animated={false} />
      </ion-app>
    );
  }
}
