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

import { default as FazItem } from "../item";

import { default as FazNavbarNavItem,
    FazNavbarNavItemList } from "./navbar-nav-item";

import {ObservableObject, type} from "can";

import navTemplate from "./stache/navbar-nav.stache";

import $ from "jquery";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
class FazNavbarNav extends FazItem {
    static get props() {
        return $.extend(super.props, {
            brand: ObservableObject,
            items: {
                type: FazNavbarNavItemList,
                get default() {
                    return new FazNavbarNavItemList([]);
                }
            }
        });
    }

    get html() {
        return navTemplate(this);
    }

    process(parent, element) {
        element.find("faz-navbar-nav-item").each(function (_, item) {
            this.processItem($(item));
        }.bind(this));
        element.find("faz-navbar-nav-item").each(function (_, item) {
            this.processItem($(item));
        }.bind(this));
        this.content = element.html();
    }

    processData(parent, data) {
        data.items.forEach(function(item) {
            let navbarNavItem = new FazNavbarNavItem();
            navbarNavItem.processData(this, item);
            this.items.push(navbarNavItem);
        }.bind(this));
    }

    processItem(item) {
        item.detach();
        let navbarNavItem = new FazNavbarNavItem();
        navbarNavItem.process(this, item);
        this.items.push(navbarNavItem);
    }

    static get seal() {
        return true;
    }
}

export default FazNavbarNav;
