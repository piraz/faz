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

import { default as FazItem } from "../item";

import navbarBrandTemplate from "./stache/navbar-brand.stache";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
class FazNavbarBrand extends FazItem {

    get html() {
        let view = navbarBrandTemplate;
        return view(this);
    }

    process(element) {
        if(element.attr("id") !== undefined) {
            this.id = element.attr("id");
        }
        if(element.attr("href") !== undefined) {
            this.href = element.attr("href");
        }
        this.content = element.html();
        this.element = element;
    }

    processData(data) {
        this.content = data.value;
        if(data.id !== undefined) {
            this.id = data.id;
        }
        if(data.href !== undefined) {
            this.href = data.href;
        }
    }
}

export default FazNavbarBrand;
