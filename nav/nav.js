"use strict";
"format cjs";

var FazNavViewModel = require("./nav-view-model");
var Component = require("can-component");

//import template from "./nav.stache";
var navTemplate = require("./nav.stache");

require("../stylesheets/nav.less")

//import canMap from "can-connect/can/map/map";
//import connect from "can-connect";
//import dataUrl from "can-connect/data/url/url";
//import constructor from "can-connect/constructor/constructor";

var events = {

};

var helpers = {
    getVMItemValue: function (item) {
        return this.getItemValue(item);
    },
    getComponentId: function() {
        return "";
    },
    getComponentClass: function () {
        var classes = ["nav"];

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
    }
};

Component.extend({
    tag: "faz-nav",
    view: navTemplate,
    ViewModel: FazNavViewModel,
    events: events,
    helpers: helpers
});
