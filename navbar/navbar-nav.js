import { default as FazItem } from "../item";

import { default as FazNavbarNavItem } from "./navbar-nav-item";

import navTemplate from "./stache/navbar-nav.stache";
import $ from "jquery";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavbarNav = FazItem.extend("FazNavbarNav", {

    items: {type: "observable", default: function() {
        return new FazNavbarNavItem.List([]);
    }},

    get html() {
        let context = {
            nav: this
        };
        return navTemplate(context);
    },
    process(parent, element) {
        element.find("faz-navbar-nav-item").each(function (_, item) {
            this.processItem($(item));
        }.bind(this));
        this.content = element.html();
    },
    processItem(item) {
        item.detach();
        let navbarNavItem = new FazNavbarNavItem();
        navbarNavItem.process(this, item);
        this.items.push(navbarNavItem);
    }
});

export default FazNavbarNav;
