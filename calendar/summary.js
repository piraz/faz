import Component from "can-component";
import DefineMap from "can-define/map/map";

import template from "./calendar.stache";

import connect from "can-connect";
import dataUrl from "can-connect/data/url/url";
import constructor from "can-connect/constructor/constructor";
import canMap from "can-connect/can/map/map";


var SummaryVM = DefineMap.extend("SummaryVM", {
    isLoading: {type: "boolean", default: false},
    title: {type : "string", default: ""}
});


Component.extend({
    tag: "calendar-summary",
    view: template,
    ViewModel: SummaryVM,
    events: {

    }
});
