import { DefineMap, route } from "can";

import { default as FazNavbarBrand} from "./brand";
import FazNavContent from "../nav/content";
import brandTemplate from "./brand.stache";

// import FazNavContent from "./content";
// import FazNavItem from "./item";

// import dropTemplate from "./dropdown.stache";
// import FazNavViewModel from "../nav/nav-view-model";
// import FazNavViewModel from "../nav/nav-view-model";

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
        $.each(element.attributes, function(index, attribute) {
            if(attribute.name.toLowerCase() == "id"){
                this.id = attribute.value;
            }
            if(attribute.name.toLowerCase() == "class"){
                this.extraClasses = attribute.value;
            }
        }.bind(this));

        this.processBrand(element);
    },
    processBrand: function(element) {
        element.querySelectorAll("faz-navbar > faz-navbar-brand").forEach(
            function(item) {
                item = $(item);
                item.detach();
                if (!this.brand) {
                    let navbarBrand = new FazNavbarBrand();

                    navbarBrand.id = item.attr("id");
                    navbarBrand.href = item.attr("href");
                    this.brand = navbarBrand;
                } else {
                    console.warn("Faz Navbar brand is unique. Please remove " +
                        "extra brands declared into this object.")
                }
            }.bind(this)
        );
    }

});

export default FazNavbarViewModel;
