/**
 * Copyright 2018-2020 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {StacheElement, type} from "can";

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
