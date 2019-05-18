import { DefineMap, route } from "can";

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
    brand: {type: "observable"},
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        var _this = this;
        $.each(element.attributes, function(index, attribute) {
            if(attribute.name.toLowerCase() == "id"){
                this.id = attribute.value;
                console.log(this.id);
            }
        }.bind(this));
    }

});

export default FazNavbarViewModel;
