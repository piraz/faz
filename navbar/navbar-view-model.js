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

import { ajax, DefineMap } from "can";
import $ from "jquery";

import { default as FazNavbarBrand } from "./navbar-brand";
import { default as FazNavbarNav } from "./navbar-nav";

/**
 * Navbar View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavbarViewModel = DefineMap.extend({
    id: {type: "string", default: ""},
    isLoading: {type: "boolean", default: true},
    element: {type: "observable", default: null},
    data: {type: "observable", default: null},
    source: {type: "observable", default: null},
    brand: {type: "observable", default: null},
    nav: {type: "observable", default: null},
    extraClasses: "string",
    type: {type: "string", default: "light"},
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
    },
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        element = $(element);
        this.element = element;
        this.id = element.attr("id");

        if(element.attr("source")) {
            this.source = element.attr("source");
        }

        if(element.attr("class")) {
            this.extraClasses = element.attr("class");
        }

        if(element.attr("type")) {
            this.type = element.attr("type");
        }

        element.find("faz-navbar-brand").each(function (_, brand) {
            this.processBrand($(brand));
        }.bind(this));

        element.find("faz-navbar-nav").each(function (_, nav) {
            this.processNav($(nav));
        }.bind(this));

        if(this.source) {
            ajax({
                url: this.source,
            }).then(function(response) {
                this.data = response;
                this.processData();
                this.show();
            }.bind(this));
        } else {
            this.show();
        }
    },
    processData: function() {
        if(this.data !== undefined) {
            if (this.data.brand !== undefined) {
                this.processBrandData(this.data.brand);
            }
            if (this.data.nav !== undefined) {
                console.log(this.data.nav);
                this.processNavData(this.data.nav);
            }
        }
    },
    processBrand: function(brand) {
        brand.detach();
        if(!this.brand) {
            let navbarBrand = new FazNavbarBrand();
            navbarBrand.process(brand);
            this.brand = navbarBrand;
        } else {
            console.warn("Faz Navbar brand is unique. Please remove " +
                "extra brands declared into this object.")
        }
    },
    processBrandData: function(brandData) {
        if(!this.brand) {
            let navbarBrand = new FazNavbarBrand();
            navbarBrand.processData(brandData);
            this.brand = navbarBrand;
        } else {
            console.warn("Faz Navbar brand is unique. Please remove " +
                "extra brands declared into this object.")
        }
    },
    processNav: function(nav) {
        nav.detach();
        if(!this.nav) {
            let navbarNav = new FazNavbarNav();
            navbarNav.process(this, nav);
            this.nav = navbarNav;
        } else {
            console.warn("Faz Navbar nav is unique. Please remove " +
                "extra navs declared into this object.")
        }
    },
    processNavData: function(navData) {
        if(!this.nav) {
            let navbarNav = new FazNavbarNav();
            navbarNav.processData(this, navData);
            this.nav = navbarNav;
        } else {
            console.warn("Faz Navbar nav is unique. Please remove " +
                "extra navs declared into this object.")
        }
    },
    show: function() {
        this.isLoading = false;
        this.element.addClass("faz-navbar-loaded");
    }
});

export default FazNavbarViewModel;
