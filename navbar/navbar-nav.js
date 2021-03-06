/**
 * Copyright 2018-2021 Flavio Garcia
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

import { FazStacheItem, FazStacheItemList} from "../item";
import navTemplate from "./stache/navbar-nav.stache";
import FazNavbarNavItem from "./navbar-nav-item";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
export default class FazNavbarNav extends FazStacheItem {
    static view = ``;

    static get props() {
        return $.extend(super.props, {
            items: {
                type: FazStacheItemList,
                get default() {
                    return new FazStacheItemList([]);
                }
            }
        });
    }

    get html() {
        return navTemplate(this);
    }

    processItemData(data) {
        let navbarNavItem = new FazNavbarNavItem();
        navbarNavItem.processData(this, data);
        this.items.push(navbarNavItem);
    }

    beforeConnectedCallback() {
        for(let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "id":
                    this.id = attribute.value;
                    break;
            }
        }
        if(this.firstElementChild !== undefined) {
            while (this.firstElementChild) {
                let child = this.firstElementChild;
                if (child.isRoot !== undefined) {
                    child.isRoot = true;
                }
                if (child.parent !== undefined) {
                    child.parent = this;
                }
                this.items.push(child);
                this.removeChild(child);
            }
        }
    }

    processData(parent, data) {
        this.parent = parent;
        if(data.id !== undefined) {
            this.id = data.id;
        }
        if (data.items !== undefined) {
            data.items.forEach((item) => {
                this.processItemData(item);
            });
        }
    }
}

customElements.define("faz-navbar-nav", FazNavbarNav);
