import { DefineMap } from "can";
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

        this.id = element.attr("id");

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

        this.isLoading = false;
        element.addClass("faz-navbar-loaded");
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
    }
});

export default FazNavbarViewModel;
