import { HomePage } from "./home-page/home-page";
import { PageRouter } from "./page-router/page-router";
import { RoomPage } from "./room-page/room-page";
import { RoomVideo } from "./room-page/room-video/room-video";
import { RoomChat } from "./room-page/room-chat/room-chat";
import { AboutPage } from "./about-page/about-page";
import { TextInput } from "./text-input/text-input";


// Define all custom elements (components)
customElements.define("page-router", PageRouter);
customElements.define("home-page", HomePage);
customElements.define("about-page", AboutPage);
customElements.define("room-page", RoomPage);
customElements.define("room-video", RoomVideo);
customElements.define("room-chat", RoomChat);

// Define all custom elements (directives)
customElements.define("text-input", TextInput, { extends: "input" });
