import { default as FazItem } from "../item";

import brandTemplate from "./stache/navbar-brand.stache";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavbarBrand = FazItem.extend({
    get html() {
        let context = {
            brand: this
        };
        return brandTemplate(context);
    },
    process(element) {
        this.id = element.attr("id");
        this.href = element.attr("href");
        this.content = element.html();
        this.element = element;
    }
});

export default FazNavbarBrand;
