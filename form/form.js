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

import { default as ID } from "../id";
import { DeepObservable, ObservableArray, StacheElement, type } from "can";


export default class FazForm extends StacheElement {
    static get props() {
        return {
            id: {
                type: type.convert(String),
                get default() {
                    return ID.random;
                }
            },
            active: {type: type.convert(Boolean), default: false},
            method: {type: String, default: "get"},
            isLoading: {type: Boolean, default: true},
            // Content should be written like that so we stop main-navbar stop
            // to alter the first navbar from the example. It seems like somehow
            // they were sharing or invading contents.
            content: {
                type: type.convert(String),
                get default() {
                    return "";
                }
            },
            message: {type: String, default: ""},
            errors: {type: type.convert(ObservableArray),
                get default() {
                    return new ObservableArray([]);
                }
            },
            action: String,
            parent: "*"
        };
    }

    initForm() {
        for(let attribute of this.attributes) {
            switch (attribute.name) {
                case "action":
                    this.action = attribute.value;
                    break;
                case "method":
                    this.action = attribute.value;
                    break;
                case "active":
                    this.active = attribute.value;
                    break;
            }
        }
    }

    connectedCallback() {
        this.initForm();
        super.connectedCallback();
        this.isLoading = false;
        this.show();
    }

    show() {}

    get hasMessage() {
        return this.message !== "";
    }

    get hasErrors() {
        return this.errors.length > 0;
    }

    static get propertyDefaults() {
        return DeepObservable;
    }

    static get seal() {
        return true;
    }

}
