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


import {domEvents, ObservableArray, type} from "can";
import { FazStacheItem } from "../item";
import filterboxTemplate from "./stache/filterbox.stache";
import datepickerTemplate from "../datepicker/stache/datepicker.stache";


export default class FazFilterbox extends FazStacheItem {
    static view = filterboxTemplate;

    static get props() {
        return $.extend(super.props, {
            buffer: {type: String, default: ""},
            displayFilter: {type: Boolean, default: false},
            items: {type: ObservableArray, get default() {
                return new ObservableArray([]);
            }},
            filtering: {type: Boolean, default: false},
            filterDelay: {type:Number, default: 400},
            filterTimeoutHandler: {type: Number, default: -1},
            overListGroup: {type: Boolean, default: false},
            selectedName: {type: String, default: ""},
            selectedValue: {type: String, default: ""},
            filterCallback: {type: Object },
            get hasItems() {
                return this.items.length > 0;
            }
        });
    }

    afterConnectedCallback() {
    }

    beforeConnectedCallback() {
        this.items = new ObservableArray([
            {
                name: "Item 1",
                value: 1
            }, {
                name: "Item 2",
                value: 2
            }
        ]);
    }

    show() {
    }

    doFilter(input) {
        this.filtering = true;
        this.displayFilter = false;
        this.buffer = input.value;
        this.clearFilterTimeout();
        if(this.buffer!="") {
            this.filterTimeoutHandler = setTimeout(
                this.showFilter.bind(this),
                this.filterDelay
            );
        } else {
            this.filtering = false;
        }
    }

    get filteredItems() {
        if(this.filterCallback===undefined) {
            return this.items.filter(
                item => item.name.indexOf(this.buffer) !== -1
            );
        }
        return this.filterCallback();
    }

    showFilter() {
        console.log(this.buffer);
        this.filtering = false;
        this.displayFilter = true;
    }

    clearFilter() {
        if (!this.overListGroup) {
            this.buffer = "";
            this.filtering = false;
            this.displayFilter = false;
        }
    }

    clearFilterTimeout() {
        if(this.filterTimeoutHandler > 0) {
            clearTimeout(this.filterTimeoutHandler);
            this.filterTimeoutHandler = -1;
        }
    }

    activateOption(option) {
        this.elementAddClass(option, "list-group-item-secondary");
    }

    deactivateOption(option) {
        this.elementRemoveClass(option, "list-group-item-secondary");
    }

    selectOption(option) {
        this.selectedName = option.getAttribute("item-name");
        this.selectedValue = option.getAttribute("item-value");
        this.overListGroup = false;
        this.clearFilter();
    }

    beOverListGroup() {
        this.overListGroup = true;
    }

    leaveListGroup() {
        this.overListGroup = false;
    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-filterbox", FazFilterbox);
