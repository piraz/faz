var DefineMap = require("can-define/map/map");
var namespace = require("can-namespace");
var route = require("can-route");
var stache = require("can-stache");

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
var FazAlertViewModel = DefineMap.extend("NavViewModel", {
    isLoading: {type: "boolean", default: false},
    content: {type: "observable"},
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        var content = "";
        var alertElement = null;
        $($(element).contents()).each(function (index, item) {
            item = $(item);
            if(!(item.prop("tagName") == "DIV" && item.hasClass("alert"))) {
                if(item.get(0).nodeType == 1){
                    content += item.html();
                } else {
                    content += item.text();
                }
                item.detach();
            }
            else {
                return;
            }
        });

        buga = stache(content)();

        this.content = stache(content)().textContent;

    }
});

module.exports = namespace.FazAlertViewModel = FazAlertViewModel;
