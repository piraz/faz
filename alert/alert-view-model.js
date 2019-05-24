import { DefineMap } from "can";

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazAlertViewModel = DefineMap.extend("FazAlertViewModel", {
    isLoading: {type: "boolean", default: false},
    content: {type: "observable"},
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        element = $(element);

        var alertElement = $(element.contents()[element.contents().length-2]);
        element.contents().each(function (index, item) {
            item = $(item);
            if(alertElement.is(item)) {
                return false;
            }
            item.detach();
            alertElement.append(item);
        });
    }
});

export default FazAlertViewModel;
