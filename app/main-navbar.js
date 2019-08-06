import {ajax, Component, DefineMap} from "can";

let template = "";

ajax({
    url: "./app/stache/main-navbar.stache",
}).then(function(response){
    template = response.responseText;
});

import mainNavbarTemplate from "./stache/main-navbar.stache";
import alertTemplate from "../alert/alert.stache";

let events = {

};

let helpers = {

};

/**
 * Navbar View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let MainNavbarViewModel = DefineMap.extend({
    id: {type: "string", default: "navbarIndex"},
    content: {type: "observable"},
    isLoading: {type: "boolean", default: true},
    get html() {
        return mainNavbarTemplate(this);
    },
    connectedCallback: function(element) {
        this.isLoading = false;
    }
});

export default Component.extend({
    tag: "main-navbar",
    view: mainNavbarTemplate,
    ViewModel: MainNavbarViewModel,
    events: events,
    helpers: helpers
});
