import { ObservableObject, StacheElement, type } from "can";

export default class MainNavbar extends StacheElement {
    static view = `<faz-navbar id="navbarIndex"
        source="/app/main-navbar-data.json" type="dark"
        class="navbar-expand-md fixed-top"></faz-navbar>`;

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
