import {default as FazAlertViewModel } from "./alert-view-model"
import { Component } from "can";

import alertTemplate from "./alert.stache"

export default Component.extend({
    tag: "faz-alert",
    view: alertTemplate,
    ViewModel: FazAlertViewModel
});
