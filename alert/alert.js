"use strict";
"format cjs";

var FazAlertViewModel = require("./alert-view-model");
var Component = require("can-component");

//import template from "./nav.stache";
var alertTemplate = require("./alert.stache");

//import canMap from "can-connect/can/map/map";
//import connect from "can-connect";
//import dataUrl from "can-connect/data/url/url";
//import constructor from "can-connect/constructor/constructor";

var helpers = {
};

Component.extend({
    tag: "faz-alert",
    view: alertTemplate,
    ViewModel: FazAlertViewModel
});
