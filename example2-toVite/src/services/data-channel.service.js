export class DataChannelService {
  static #instance;
  
  #myDataChannel;
  #callbackOnMessage;


  constructor() {
    // can return existing element in constructor to switch to that
    if (DataChannelService.#instance) {
      return DataChannelService.#instance;
    }
    this.#myDataChannel = new BroadcastChannel('myDataChannel');
    DataChannelService.#instance = this;
  }

  get callbackOnMessage() {
    return this.#callbackOnMessage
  }

  set callbackOnMessage(callback) {
    this.#callbackOnMessage = callback;
    this.#myDataChannel.onmessage = callback;
  }

  sendChatMessage(message) {
    this.#myDataChannel.postMessage(message);
  }

  getNewMessages(callback) {
    this.#callbackOnMessage = callback;
    this.#myDataChannel.onmessage = callback;
  }

  saveMessage(message) {
    let messages = JSON.parse(window.sessionStorage.getItem('messages'));
    if (!messages) {
      messages = [message];
    } else {
      messages.push(message);
    }
    window.sessionStorage.setItem('messages', JSON.stringify(messages));
  }
  getOldMessages() {
    const messages = window.sessionStorage.getItem('messages');
    return messages? JSON.parse(messages) : [];
  }
}
