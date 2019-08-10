/**
 * Copyright 2018-2019 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, stache } from "can";

import FazNavViewModel from "./nav-view-model";
import navTemplate from "./stache/nav.stache";

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
        let classes = ["nav"];

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
