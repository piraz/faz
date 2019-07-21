import { Component } from "can";

import FazNavbarViewModel from "./navbar-view-model";
import navbarTemplate from "./stache/navbar.stache";

let events = {

};

let helpers = {

};

export default Component.extend({
    tag: "faz-navbar",
    view: navbarTemplate,
    ViewModel: FazNavbarViewModel,
    events: events,
    helpers: helpers,
});
