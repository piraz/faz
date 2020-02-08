import {StacheElement, type} from "can";
import $ from "jquery";

import alertTemplate from "./stache/alert.stache";

export default class FazAlert extends StacheElement {
    static view = alertTemplate;

    static get props() {
        return {
            isLoading: {type: Boolean, default: true},
            content: {type: type.convert(String)}
        };
    }

    show() {
        $(this).addClass("faz-alert-rendered");
    }

    connectedCallback() {
        this.content = this.innerHTML;
        super.connectedCallback();
        this.isLoading = false;
        this.show();
    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-alert", FazAlert);
