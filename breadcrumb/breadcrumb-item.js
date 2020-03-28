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


import {assign, ObservableArray, type} from "can";

import { default as  FazItem } from "../item";

import itemTemplate from "./stache/breadcrumb-item.stache";


export class FazBreadcrumbItem extends FazItem {

    static get props() {
        return $.extend(super.props, {
            disabled: {type: type.convert(Boolean), default: false},
            target: {type: type.convert(String), default: ""},
        });
    }

    get classes() {
        let classes = ["breadcrumb-item"];
        if(this.active) {
            classes.push("active");
        }
        return classes.join(" ");
    }

    get html() {
        return itemTemplate(this);
    }

    setParent(parent) {
        this.parent = parent;
    }

    processElement(parent, element) {
        this.setParent(parent);
        for(let attribute of element.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "id":
                    this.id = attribute.value;
                    break;
                case "href":
                    this.href = attribute.value;
                    break;
            }
        }
        this.content = element.innerHTML;
    }

    process(parent, element, activeItem) {

    }
}

export class FazBreadcrumbItemList extends ObservableArray {
    static get props() {
        return {
            get enabled() {
                return this.filter({disabled: false});
            },
            get last() {
                return this[this.length-1];
            },
            get active() {
                return this.filter({active: true});
            }
        };
    }

    constructor(items) {
        super(items);
        this.on( "add", function ( ev, items, index ) {
            console.log( "add", items, index );
        });
    }

    clearAll() {
        while(this.length>0) {
            this.pop();
        }
    }

    static items = type.convert(FazBreadcrumbItem);
}
