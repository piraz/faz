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

import { FazForm, FazNavbar } from "../faz";

import { MainNavbar } from "../app/main-navbar";

import formExampleTemplate  from "./stache/form-example.stache";
import {type} from "can";
import {FazNavItemList} from "../nav/nav-item";

export default class FormExample extends FazForm {
    static view = formExampleTemplate;

    static get props() {
        return $.extend(super.props, {
            property1: String,
            property2: String
        });
    }

    get property1Empty() {
        return this.property1 === undefined || this.property1 == "";
    }

    get property2Empty() {
        return this.property2 === undefined || this.property2 == "";
    }

    static get seal() {
        return true;
    }
}

customElements.define("form-example", FormExample);
