import html from "./home-page.html?raw";
import css from "./home-page.css";
import { setupShadow } from "../helpers";
import { Pages } from "../models/Pages";

export class HomePage extends HTMLElement {


  #broadcastChannel;

  constructor() {
    super();
    setupShadow(this, html, css);
  }

  connectedCallback() {
    // auto join for local dev
    this.#broadcastChannel = new BroadcastChannel("room-auto-join");
  }

  disconnectedCallback() {
    this.#broadcastChannel.close();
  }

  gotoAboutPage() {
    const event = new CustomEvent("ChangePage", { detail: Pages.About });
    this.dispatchEvent(event);
  }
}
