import {StacheElement, type} from "can";
import $ from "jquery";

export default class FazAlert extends StacheElement {
    static view =`{{# isLoading}}
            <div class="alert alert-primary" role="alert">Loading...</div>
            {{ else }}
            <div class="alert alert-primary" role="alert">{{{ content }}}</div>
            {{/ isLoading}}`;

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
