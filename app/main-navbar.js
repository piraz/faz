import {ajax, Component, DefineMap} from "can";

let template = "";

import mainNavbarTemplate from "./stache/main-navbar.stache";
import alertTemplate from "../alert/alert.stache";
import $ from "jquery";

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
    data: {type: "observable", default: null}
});

export default Component.extend({
    tag: "main-navbar",
    view: mainNavbarTemplate,
    ViewModel: MainNavbarViewModel,
    events: events,
    helpers: helpers
});
