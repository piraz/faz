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

import { default as ID } from "../id";
import { FazItemList } from "../item";
import { default as FazNavbarBrand } from "./navbar-brand";
import { default as FazNavbarCollapse } from "./navbar-collapse";
import { default as FazNavbarToggler } from "./navbar-toggler";

import navbarTemplate from "./stache/navbar.stache";

export default class FazNavbar extends StacheElement {
    static view = navbarTemplate;
    static get props() {
        return {
            id: {type: type.convert(String), default: ID.random},
            isLoading: {type: type.convert(Boolean), default: true},
            element: ObservableObject,
            data: {
                type: ObservableObject,
                get default(){
                    return new ObservableObject({
                        "items": undefined
                    });
                }
            },
            source: {type: String, default: ""},
            items: {
                type: FazItemList,
                get default() {
                    return new FazItemList([]);
                }
            },
            brand: ObservableObject,
            toggler: ObservableObject,
            nav: ObservableObject,
            extraClasses: String,
            type: {type: type.convert(String), default: "light"},

            get class() {
                let classes = ["navbar"];
                if (this.type == "light") {
                    classes.push("navbar-light");
                    classes.push("bg-light");
                } else if(this.type == "dark") {
                    classes.push("navbar-dark");
                    classes.push("bg-dark");
                }
                if (this.extraClasses) {
                    classes.push(this.extraClasses);
                }
                return classes.join(" ");
            }
        };
    }

    static get propertyDefaults() {
        return DeepObservable;
    }

    processData() {
        if(this.data !== undefined) {
            if (this.data.items !== undefined) {
                this.data.items.forEach(function(item) {
                    switch (item.type.toLowerCase()) {
                        case "faz-navbar-brand":
                            this.items.push(this.processBrandData(item));
                            break;
                        case "faz-navbar-collapse":
                            this.items.push(this.processCollapseData(item));
                            break;
                        case "faz-navbar-toggler":
                            this.items.push(this.processTogglerData(item));
                            break;
                    }
                }.bind(this));
            }
        }
    }

    processBrand(element) {
        let brand = new FazNavbarBrand();
        brand.process($(element));
        return brand;
    }

    processBrandData(data) {
        let brand = new FazNavbarBrand();
        brand.processData(data);
        return brand;
    }

    processCollapse(element) {
        let collapse = new FazNavbarCollapse();
        collapse.process(this, element);
        return collapse;
    }

    processCollapseData(data) {
        let collapse = new FazNavbarCollapse();
        collapse.processData(this, data);
        return collapse;
    }

    processToggler(element) {
        let toggler = new FazNavbarToggler();
        toggler.process(element);
        return toggler;
    }

    processTogglerData(data) {
        let toggler = new FazNavbarToggler();
        toggler.processData(data);
        return toggler;
    }

    show() {
        $(this).addClass("faz-navbar-rendered");
    }

    connectedCallback() {
        this.show();
        for(let attribute of this.attributes) {
            switch (attribute.name) {
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
            }
        }
        let childrenToDelete = new Array();
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            switch (child.tagName.toLowerCase()) {
                case "faz-navbar-brand":
                    this.items.push(this.processBrand(child));
                    childrenToDelete.push(child);
                    break;
                case "faz-navbar-collapse":
                    this.items.push(this.processCollapse(child));
                    childrenToDelete.push(child);
                    break;
                case "faz-navbar-toggler":
                    this.items.push(this.processToggler(child));
                    childrenToDelete.push(child);
                    break;
            }
        }

        childrenToDelete.forEach(function (child) {
            $(child).detach();
        });

        this.isLoading = false;
        super.connectedCallback();
    }

    connected() {
        if(this.source!="") {
            this.isLoading = true;
            ajax({
                url: this.source,
            }).then(function(response) {
                this.data = new ObservableObject(response);
                this.processData();
                this.isLoading = false;
            }.bind(this));
        }
    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-navbar", FazNavbar);
