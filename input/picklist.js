/**
 * Copyright 2018-2021 Flavio Garcia
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

import {ObservableArray, type} from "can";
import { FazStacheItem } from "../item";
import picklistTemplate from "./stache/picklist.stache";


export default class FazPicklist extends FazStacheItem {
    static view = picklistTemplate;

    static get props() {
        return $.extend(super.props, {
            buffer: {type: String, default: ""},
            displayFilter: {type: Boolean, default: false},
            items: {type: type.convert(ObservableArray), get default() {
                return new ObservableArray([]);
            }},
            filtering: {type: Boolean, default: false},
            filterDelay: {type:Number, default: 300},
            label: {type:String, default: "Type something to filter"},
            filterTimeoutHandler: {type: Number, default: -1},
            overListGroup: {type: Boolean, default: false},
            selectedName: {type: String, default: ""},
            selectedValue: {type: String, default: ""},
            filterCallback: {type: Object },
            innitCallback: {type: Object },
            get hasItems() {
                return this.items.length > 0;
            }

        });
    }

    get idOuterDiv() {
        return this.id + "-div";
    }

    get idInput() {
        return this.id + "-input";
    }

    // afterConnectedCallback() {
    // }

    beforeConnectedCallback() {
    }

    // show() {
    // }

    static get seal() {
        return true;
    }
}

customElements.define("faz-picklist", FazPicklist);
