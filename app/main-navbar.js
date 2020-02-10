import { ObservableObject, StacheElement, type } from "can";

import mainNavbarTemplate from "./stache/main-navbar.stache";

export default class MainNavbar extends StacheElement {
    static view = mainNavbarTemplate;

    static get props() {
        return {
            id: {type: type.convert(String), default: "navbarIndex"},
            data: ObservableObject
        };
    }

    static get seal() {
        return true;
    }
}

customElements.define("main-navbar", MainNavbar);
