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

import { FazStacheItem, FazStacheItemList } from "../item";
import {default as FazNavbarBrand} from "./navbar-brand";
import {default as FazNavbarNav} from "./navbar-nav";
import navCollapseTemplate from "./stache/navbar-collapse.stache";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
export default class FazNavbarCollapse extends FazStacheItem {

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
        let view = navCollapseTemplate;
        return view(this);
    }

    processBrandData(data) {
        let brand = new FazNavbarBrand();
        brand.processData(data);
        return brand;
    }

    processNavData(data) {
        let nav = new FazNavbarNav();
        nav.processData(this, data);
        return nav;
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
                this.items.push(child);
                $(child).detach();
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
                switch (item.type.toLowerCase()) {
                    case "faz-navbar-brand":
                        this.items.push(this.processBrandData(item));
                        break;
                    case "faz-navbar-nav":
                        this.items.push(this.processNavData(item));
                        break;
                }
            });
        }
    }
}

customElements.define("faz-navbar-collapse", FazNavbarCollapse);
