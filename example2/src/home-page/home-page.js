import html from "./home-page.html";
import css from "./home-page.css";
import { setupShadow } from "../helpers";
import { Pages } from "../models/Pages";

export class HomePage extends HTMLElement {


  #bc;

  constructor() {
    super();
    setupShadow(this, html, css);
  }

  connectedCallback() {
    // auto join for local dev
    this.#bc = new BroadcastChannel("room-auto-join");
    this.#bc.onmessage = (message) => {
      this.shadowRoot.getElementById("roomIdInput").value = message.data;
      this.joinRoom();
    };
  }

  disconnectedCallback() {
    this.#bc.close();
  }

  async newRoom() {
    this.#gotoRoomPage();
  }

  async joinRoom() {
    const inputRoomId = this.shadowRoot.getElementById("roomIdInput").value;
    if (!inputRoomId) {
      alert("No Room");
      return;
    }
      alert(" Room not found");
      return;
    this.#gotoRoomPage();
  }

  gotoAboutPage() {
    const event = new CustomEvent("ChangePage", { detail: Pages.About });
    this.dispatchEvent(event);
  }

  #gotoRoomPage() {
    const event = new CustomEvent("ChangePage", { detail: Pages.Room });
    this.dispatchEvent(event);
  }
}
