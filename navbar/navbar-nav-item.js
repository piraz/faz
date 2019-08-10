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

import $ from "jquery";

import { DefineList, route, RoutePushstate} from "can";

import { default as  FazItem } from "../item";

import itemTemplate from "./stache/navbar-nav-item.stache";
import FazNavbarNav from "./navbar-nav";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavbarNavItem = FazItem.extend("FazNavbarNavItem", {
    children: {type: "observable", default: function() {
            return new FazNavItem.List([]);
        }},
    disabled: {type: "boolean", default: false},
    dropdown: {type: "boolean", default: false},
    target: {type: "string", default: ""},
    value: "string",
    urlData: {type: "observable", default: undefined},
    get isRoot() {
        return this.parent.constructor.name == "FazNavbarNav";
    },
    get html() {
        return itemTemplate(this);
    },
    /**
     * Returns the nav item class.
     *
     * @param {FazNavItem} item
     * @returns {string}
     */
    get class() {
        var classes = ["nav-link"];
        if(this.active) {
            classes.push("active");
        }
        if(this.disabled) {
            classes.push("disabled")
        }
        return classes.join(" ");
    },
    /**
     * Returns the nav item href. If item is disabled a javascript void
     * function will be placed to avoid any action.
     *
     * @param {FazNavItem} item
     * @returns {string}
     */
    getHref: function () {
        if (this.active){
            return "#";
        }
        let voidHref = "javascript:void(0)";
        let validHef = this.href === undefined ? voidHref : this.href;
        if (this.disabled) {
            return voidHref;
        }
        if (this.parent !== undefined) {
            if (this.parent.tabs) {
                if (!validHef.startsWith("#") && this.href) {
                    return "#" + validHef;
                }
            }
        }
        return validHef;
    },
    process(parent, element) {
        this.parent = parent;
        this.element = element;
        this.value = element.html();
        this.href = this.element.attr("href");
        this.active = this.element.attr("current") === undefined ? false: true;
    },
    processData(parent, data) {
        this.parent = parent;
        this.value = data.value;
        this.href = data.href;
        if(this.href == document.location.pathname) {
            this.active = true;
        }
    }
});

FazNavbarNavItem.List = DefineList.extend({
    "#": FazNavbarNavItem,
    get enabled() {
        return this.filter({disabled: false});
    },
    get active() {
        return this.filter({active: true});
    }
});

export default FazNavbarNavItem;
