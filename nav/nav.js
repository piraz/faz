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

import {
    ajax, DeepObservable, ObservableObject, StacheElement, type
} from "can";

import $ from "jquery";
import { default as ID } from "../id";
import { FazNavItem, FazNavItemList } from "./nav-item";
import { FazNavTabContent, FazNavTabContentList } from "./nav-tab-content";

let navTemplate = `
<nav class:from="componentClass" id:from="id" role="tablist" aria-orientation:from="orientation">
    {{#each (scope.top.items, item=value)}}
        {{ item.html }}
    {{/each}}
</nav>
`;

export default class FazNav extends StacheElement {

    static view = navTemplate;

    static get props() {
        return {
            id: {type: type.convert(String), default: ID.random},
            active: String,
            isLoading: {type: type.convert(Boolean), default: true},
            element: ObservableObject,
            items: {type: FazNavItemList, get default() {
                return new FazNavItemList([]);
            }},
            tabContentList: {type: FazNavTabContentList, get default() {
                return new FazNavTabContentList([]);
            }},
            navOuterClass: {type: type.convert(String), default: "row"},
            tabsClass: {type: type.convert(String), default: ""},
            fill: {type: type.convert(Boolean), default: false},
            justify: {type: type.convert(String), default: "left"},
            page: String,
            pills: {type: type.convert(Boolean), default: false},
            tabs: {type: type.convert(Boolean), default: false},
            vertical: {type: type.convert(Boolean), default: false},
            get hasTabContents() {
                if (this.tabContentList.length) {
                    return true;
                }
                return false;
            },
            get componentClass() {
                let classes = ["nav"];

                if (this.fill) {
                    classes.push("nav-fill");
                }

                if (this.justify == "center") {
                    classes.push("justify-content-center");
                } else if (this.justify == "right") {
                    classes.push("justify-content-end");
                }

                if (this.pills) {
                    classes.push("nav-pills");
                }

                if (this.tabs) {
                    classes.push("nav-tabs");
                }

                if (this.vertical) {
                    classes.push("flex-column");
                }

                return classes.join(" ");
            },
            get role() {
                if (this.hasTabContents()) {
                    return "tablist";
                }
                return "";
            },
            get orientation() {
                if (this.vertical){
                    return "vertical";
                }
                return "";
            }
        }
    };

    static get propertyDefaults() {
        return DeepObservable;
    }

    connectedCallback() {
        for(let attribute of this.attributes) {
            switch (attribute.name) {
                case "active":
                    this.active = attribute.value;
                    break;
                case "id":
                    this.id = attribute.value;
                    break;
                case "class":
                    this.extraClasses = attribute.value;
                    break;
                case "source":
                    this.source = attribute.value;
                    break;
                case "type":
                    this.type = attribute.value;
                    break;
                default:
                    console.log(attribute.name);
            }
        }
        let data = {
            "items": {}
        };
        this.querySelectorAll("faz-nav > faz-nav-item").forEach(function(item) {
            let dataItem = {};
            for(let attribute of item.attributes) {
                dataItem[attribute.name] = attribute.value;
            }
            dataItem['content'] = item.innerHTML;
            dataItem['parent'] = this;
            this.items.push(dataItem);
        }.bind(this));
        if(!this.source) {
            console.debug(this);
            console.debug("Finished connected callback " + this.id);
        }
        this.isLoading = false;
        super.connectedCallback();
        this.items.forEach(function(item){
            item.setParent(this);
        }.bind(this));
    }

    getVMItemValue (item) {
        return this.getItemValue(item);
    }

    getComponentId () {
        return "";
    }

    getSafeString(item) {
        return stache.safeString(item[0]);
    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-nav", FazNav);
