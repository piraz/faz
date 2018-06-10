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

        /*var content = "";
        var alertElement = null;

        console.log($(element).contents());


        console.log(content);
        buga = stache(content)();*/

        //this.content = buga;

    }
});

module.exports = namespace.FazAlertViewModel = FazAlertViewModel;
