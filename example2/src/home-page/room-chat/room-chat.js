import html from "./room-chat.html";
import css from "./room-chat.css";
import { setupShadow } from "../../helpers";
import { DataChannelService } from "../../services/data-channel.service";

export class RoomChat extends HTMLElement {
  #DataChannelService = new DataChannelService();
  #chatMessageText = "";

  constructor() {
    super();
    setupShadow(this, html, css);
  }

  connectedCallback() {
    this.#DataChannelService.getOldMessages().forEach((message) => {
      this.addMessageToHTML(message);
    });
    this.#DataChannelService.getNewMessages((message) => {
      let wrappedMessage = this.addMessageToChat(message, false);
      this.saveMessage(wrappedMessage)
    });
  }

  saveMessage(message) {
    this.#DataChannelService.saveMessage(message);
  }

  chatMessageChange(element) {
    this.#chatMessageText = element.value;
  }

  sendChatMessage() {
    this.#DataChannelService.sendChatMessage(this.#chatMessageText);
    const wrappedMessage = this.addMessageToChat(this.#chatMessageText, true);
    this.saveMessage(wrappedMessage);
    this.#chatMessageText = "";
    this.shadowRoot.getElementById("chatMessage").value = this.#chatMessageText;
  }

  addMessageToHTML(wrappedMessage) {
    const chatEl = this.shadowRoot.getElementById("chatList");
    chatEl.innerHTML += wrappedMessage;
    return wrappedMessage;
  }
  
  addMessageToChat(message, myOwn) {
    const byText = myOwn ? "You: " : "Guest: ";
    const cssClass = myOwn ? "my-message" : "other-message ";
    const wrappedMessage = `<div class="${cssClass}"><b>${byText}</b>${message.data? message.data : message}</div>`;
    return this.addMessageToHTML(wrappedMessage);
  }
}
