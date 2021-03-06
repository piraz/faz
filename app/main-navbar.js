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

import { ObservableObject, type } from "can";
import {FazStacheItem} from "../item";
import { FazNavbar } from "../faz";
import mainNavbarTemplate from "./stache/main-navbar.stache";

export default class MainNavbar extends FazStacheItem{
    static view = mainNavbarTemplate;

    static get props() {
        return $.extend(super.props, {
            id: {type: type.convert(String), default: "navbarIndex"},
            data: ObservableObject
        });
    }

    static get seal() {
        return true;
    }
}

customElements.define("main-navbar", MainNavbar);
