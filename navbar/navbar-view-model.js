import { DefineMap } from "can";
import $ from "jquery";

import { default as FazNavbarBrand} from "./navbar-brand";


/**
 * Navbar View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavbarViewModel = DefineMap.extend({
    id: {type: "string", default: ""},
    brand: {type: "observable", default: null},
    extraClasses: "string",
    type: {type: "string", default: "light"},
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
    },
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        element = $(element);
        console.log(element);
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

        element.children().unwrap();

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
    }
});

export default FazNavbarViewModel;
