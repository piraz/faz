/**
 * Copyright 2018-2019 Flavio Garcia
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
import {default as FazNavbarBrand} from "./navbar-brand";
import {default as FazNavbarNav} from "./navbar-nav";

let navbarTemplate =
`{{# this.isLoading}}
    <div>Loading...</div>
{{ else }}
    <nav id:from="id" class:from="class">
    {{#brand}}
        {{{ this.html }}}
    {{/brand}}
    {{#nav}}
        {{ this.html }}
    {{/nav}}
    </nav>
{{/ this.isLoading}}`;

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
                        "brand": undefined,
                        "nav": undefined
                    });
                }
            },
            source: {type: String, default: ""},
            brand: ObservableObject,
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
            if (this.data.brand !== undefined) {
                this.processBrandData(this.data.brand);
            }
            if (this.data.nav !== undefined) {
                this.processNavData(this.data.nav);
            }
        }
    }

    processBrand(brand) {
        if(!this.brand) {
            let navbarBrand = new FazNavbarBrand();
            navbarBrand.process(brand);
            this.brand = navbarBrand;
        } else {
            console.warn("Faz Navbar brand is unique. Please remove " +
                "extra brands declared into this object.")
        }
        brand.detach();
    }

    processBrandData(brandData) {
        if(!this.brand) {
            let navbarBrand = new FazNavbarBrand();
            navbarBrand.processData(brandData);
            this.brand = navbarBrand;
        } else {
            console.warn("Faz Navbar brand is unique. Please remove " +
                "extra brands declared into this object.")
        }
    }

    processNav(nav) {
        nav.detach();
        if(!this.nav) {
            let navbarNav = new FazNavbarNav();
            navbarNav.process(this, nav);
            this.nav = navbarNav;
        } else {
            console.warn("Faz Navbar nav is unique. Please remove " +
                "extra navs declared into this object.")
        }
    }

    processNavData(navData) {
        if(!this.nav) {
            let navbarNav = new FazNavbarNav();
            navbarNav.processData(this, navData);
            this.nav = navbarNav;
        } else {
            console.warn("Faz Navbar nav is unique. Please remove " +
                "extra navs declared into this object.")
        }
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

        $(this).find("faz-navbar-brand").each(function (_, brand) {
            this.processBrand($(brand));
        }.bind(this));

        if(!this.source) {
            console.log("Finished connected callback " + this.id);
        }
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
