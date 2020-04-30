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
    assign, DeepObservable, ObservableObject, StacheElement, type
} from "can";

import { default as ID } from "../id";
import { FazNavItem, FazNavItemList } from "./nav-item";
import { FazNavTabContent, FazNavTabContentList } from "./nav-tab-content";

import navTemplate from "./stache/nav.stache";


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
            tabContents: {type: FazNavTabContentList, get default() {
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
                if (this.tabContents.length) {
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

    show() {
        $(this).addClass("faz-nav-rendered");
    }

    connectedCallback() {
        this.show();
        let attributes = {};
        for(let attribute of this.attributes) {

            switch (attribute.name) {
                case "pills":
                    this.pills = true;
                    break;
                case "tabs":
                    this.tabs = true;
                    break;
                case "vertical":
                    this.vertical = true;
                    break;
                default:
                    attributes[attribute.name] = attribute.value;
                    break;
            }
        }

        assign(this, attributes);

        let data = {
            "items": {}
        };
        this.querySelectorAll("faz-nav > faz-nav-item").forEach(function(item) {
            let navItem = new FazNavItem();
            navItem.processElement(this, item, true);
            this.items.push(navItem);
        }.bind(this));

        this.querySelectorAll("faz-nav > faz-nav-tab-content").forEach(
            function(item) {
                let navTabContent = new FazNavTabContent();

                navTabContent.processElement(this, item);

                let tabContent = $(item);


                tabContent.detach();
                navTabContent.element = tabContent;
                this.tabContents.push(navTabContent);
        }.bind(this));


        this.isLoading = false;
        super.connectedCallback();
        this.items.forEach(function(item){
            item.setParent(this);
        }.bind(this));

        if (this.hasTabContents) {
            this.items.active[0].activate();
        }
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
