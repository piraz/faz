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
import filterboxTemplate from "./stache/filterbox.stache";


export default class FazFilterbox extends FazStacheItem {
    static view = filterboxTemplate;

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
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "items":
                    this.items = JSON.parse(attribute.value);
                    break;
                case "initcallback":
                    this.initCallback = eval(attribute.value);
                    break;
            }

        }
        if (this.initCallback !== undefined) {
            this.initCallback();
        }
    }

    // show() {
    // }

    get categories() {
        return this.filteredItems.reduce((categories, item)=> {
            if(item.hasOwnProperty("category") &&
                categories.indexOf(item.category) === -1) {
                categories.push(item.category);
            }
            return categories;
        }, []);
    }

    doFilter(input) {
        this.verifySelectedValue(input);
        this.filtering = true;
        this.displayFilter = false;
        this.buffer = input.value;
        this.clearFilterTimeout();
        if(this.buffer!="") {
            this.filterTimeoutHandler = setTimeout(
                this.showFilter.bind(this),
                this.filterDelay
            );
            return;
        }
        this.filtering = false;
    }

    defaultFilterCallback() {
        return this.items.filter(
            item => item.name.toLowerCase().indexOf(
                this.buffer.toLowerCase()
            ) !== -1
        );
    }

    get filteredItems() {
        if(this.filterCallback===undefined) {
            return this.defaultFilterCallback();
        }
        return this.filterCallback();
    }

    get filteredItemsUncategorized() {
        return this.filteredItems.filter(
            (item) => {
                return !item.hasOwnProperty("category");
            }
        );
    }

    filteredItemsByCategory(category) {
        return this.filteredItems.filter(
            (item) => {
                return item.hasOwnProperty("category") &&
                    item.category==category;
            }
        );
    }

    showFilter() {
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

    verifySelectedValue(input) {
        if(this.selectedName!="" && input.value != this.selectedName) {
            let inputValue = input.value;
            this.selectedName = "";
            this.selectedValue = "";
            input.value = inputValue;
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
