import { Component, stache } from "can";

import FazNavViewModel from "./nav-view-model";
import navTemplate from "./stache/nav.stache";

import "../stylesheets/nav.less";

let events = {

};

let helpers = {
    getVMItemValue: function (item) {
        return this.getItemValue(item);
    },
    getComponentId: function() {
        return "";
    },
    getComponentClass: function () {
        var classes = [this.type];

        if (this.fill) {
            classes.push("nav-fill");
        }

        if (this.justify == "center") {
            classes.push("justify-content-center");
        } else if (this.justify == "right") {
            classes.push("justify-content-end");
        }

        if (this.pills) {
            classes.push("nav-pills");
        }

        if (this.tabs) {
            classes.push("nav-tabs");
        }

        if (this.vertical) {
            classes.push("flex-column");
        }

        return classes.join(" ");
    },
    getSafeString: function(item) {
        return stache.safeString(item[0]);
    }
};

export default Component.extend({
    tag: "faz-nav",
    view: navTemplate,
    ViewModel: FazNavViewModel,
    events: events,
    helpers: helpers
});
