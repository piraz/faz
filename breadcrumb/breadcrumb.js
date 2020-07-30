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

import {StacheElement, type} from "can";
import { FazBreadcrumbItem, FazBreadcrumbItemList } from "./breadcrumb-item";
import breadcrumbTemplate from "./stache/breadcrumb.stache";

export default class FazBreadcrumb extends StacheElement {
    static view = breadcrumbTemplate;

    static get props() {
        return {
            isLoading: {type: Boolean, default: true},
            content: {type: type.convert(String)},
            source: {type: type.convert(String)},
            items: {type: FazBreadcrumbItemList, get default() {
                return new FazBreadcrumbItemList([]);
            }},
            set jsonString(value) {
                try {
                    let data = JSON.parse(value);
                    this.items.clearAll();
                    data.items.forEach(function(item){
                        this.items.push(item);
                    }.bind(this));
                } catch (e) {
                    console.error(e);
                }
            }
        };
    }

    connectedCallback() {
        this.content = this.innerHTML;
        for(let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "json-string":
                    this.jsonString = attribute.value;
                    break;
                case "source":
                    this.source = attribute.value;
                    break;
            }
        }
        this.querySelectorAll("faz-breadcrumb > faz-breadcrumb-item").forEach(
            function(item) {
                let breadcrumbItem = new FazBreadcrumbItem();
                breadcrumbItem.processElement(this, item);
                this.items.push(breadcrumbItem);
            }.bind(this)
        );
        super.connectedCallback();

        if (this.items.last!==undefined) {
            this.items.last.active = true;
        }

    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-breadcrumb", FazBreadcrumb);
