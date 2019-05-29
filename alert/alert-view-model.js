import { DefineMap } from "can";

import alertTemplate from "./alert.stache"

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazAlertViewModel = DefineMap.extend("FazAlertViewModel", {
    isLoading: {type: "boolean", default: true},
    content: {type: "observable"},
    get html() {
        return alertTemplate(this);
    },
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        element = $(element);
        this.content = element.html();
        element.contents().detach();
        element.append(this.html);
        this.isLoading = false;
        element.contents().unwrap();
    }
});

export default FazAlertViewModel;
