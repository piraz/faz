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

import {
    ajax, DeepObservable, ObservableObject, StacheElement, type
} from "can";

import { FazStacheItem, FazStacheItemList } from "../item";
import { default as FazNavbarBrand } from "./navbar-brand";
import { default as FazNavbarCollapse } from "./navbar-collapse";
import { default as FazNavbarToggler } from "./navbar-toggler";

import navbarTemplate from "./stache/navbar.stache";

export default class FazNavbar extends FazStacheItem {
    static view = navbarTemplate;
    static get props() {
        return $.extend(super.props, {
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
                type: FazStacheItemList,
                get default() {
                    return new FazStacheItemList([]);
                }
            },
            extraClasses: String,
            type: {type: type.convert(String), default: "light"}
        });
    }

    get class() {
        let classes = ["navbar"];
        if (this.type == "light") {
            classes.push("navbar-light");
        } else if(this.type == "dark") {
            classes.push("navbar-dark");
        }
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ");
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

    processBrandData(data) {
        let brand = new FazNavbarBrand();
        brand.processData(data);
        return brand;
    }

    processCollapseData(data) {
        let collapse = new FazNavbarCollapse();
        collapse.processData(this, data);
        return collapse;
    }

    processTogglerData(data) {
        let toggler = new FazNavbarToggler();
        toggler.processData(data);
        return toggler;
    }

    show() {
        $(this).addClass("faz-navbar-rendered");
    }

    addItem(item) {
        this.items.push(item);
    }

    beforeConnectedCallback() {
        console.clear();
        console.log(this.attributes);
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
            if(child.tagName.toLowerCase().includes("navbar")) {
                this.items.push(child);
                if (child.parent !== undefined) {
                    child.parent = this;
                }
            }
        }
        childrenToDelete.forEach(function (child) {
            this.removeChild(child);
        });
    }

    afterConnectedCallback() {
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

