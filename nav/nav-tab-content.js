/**
 * Copyright 2018-2020 Flavio Garcia
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

import {
    DefineList,
    DefineMap, ObservableArray,
    ObservableObject,
    Scope,
    StacheElement,
    type
} from "can";

import tabContentTemplate from "./stache/nav-tab-content.stache";
import {default as FazItem} from "../item";
import {default as ID} from "../id";
import {FazNavItem, FazNavItemList} from "./nav-item";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */

export class FazNavTabContent extends StacheElement {

    static get props() {
        return {
            id: {type: type.convert(String), default: ID.random},
            element: ObservableObject,
            parent: ObservableObject,
            active: {type: type.convert(Boolean), default: false},
            fade: {type: type.convert(Boolean), default: false},
            show: {type: type.convert(Boolean), default: false},
            get ariaLabelledby() {
                let itemId = ""
                this.parent.items.forEach(function (item) {
                    if (this.id == item.ariaControls) {
                        itemId = item.id;
                        return;
                    }
                }.bind(this));
                return itemId;
            },
            get class() {
                let classes = ["tab-pane"];
                if (this.active) {
                    classes.push("active");
                }
                if (this.fade) {
                    classes.push("fade");
                }
                if (this.show) {
                    classes.push("show");
                }
                return classes.join(" ");
            },
            get value() {
                return this.element;
            },
            get html() {
                const scope = new Scope(this, null, {viewModel: true});
                return tabContentTemplate(scope);
            }
        }
    };
}

export class FazNavTabContentList extends ObservableArray {
    static get props() {
        return {
            get active() {
                return this.filter({active: true});
            }
        };
    }

    static items = type.convert(FazNavTabContent);
}
