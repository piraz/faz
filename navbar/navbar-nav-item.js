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

import {type} from "can";
import { FazStacheItem, FazStacheItemList } from "../item";
import {default as FazNavbarNavItemTitle} from "./navbar-nav-item-title"
import navbarNavItemTemplate from "./stache/navbar-nav-item.stache";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
export default class FazNavbarNavItem extends FazStacheItem {

    static view = ``;

    static get props() {
        return $.extend(super.props, {
            items: {
                type: FazStacheItemList,
                get default() {
                    return new FazStacheItemList([]);
                }
            },
            title: {
                type: FazNavbarNavItemTitle
            },
            disabled: {type: type.convert(Boolean), default: false},
            root: "*",
            isRoot: {type: type.convert(Boolean), default: false},
            target: {type: type.convert(String), default: ""},
            value: String
        });
    }

    get dropdown() {
        return this.items.length > 0;
    }

    get html() {
        let view = navbarNavItemTemplate;
        return view(this);
    }
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
    }
    /**
     * Returns the nav item href. If item is disabled a javascript void
     * function will be placed to avoid any action.
     *
     * @param {FazNavItem} item
     * @returns {string}
     */
    getHref () {
        if (this.active) {
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
    }

    logThis() {
        console.log(this);
    }

    beforeConnectedCallback() {
        this.process();
        this.processChildren();
    }

    activate(element, event) {
        if(element !== undefined) {
            // Responsive Dropdown Submenu fix
            // Based on https://codepen.io/surjithctly/pen/PJqKzQ
            if(this.dropdown) {
                if (this.isRoot) {
                    $('.dropdown-submenu .show').removeClass("show");
                } else {
                    if (!$(element).next().hasClass("show")) {
                        $(element).parents(".dropdown-menu").first().find(
                            ".show").removeClass("show");
                    }
                    let subMenu = $(element).next(".dropdown-menu");
                    subMenu.toggleClass('show');
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
        if (!this.disabled) {
            if (this.parent != null) {
                this.parent.items.active.forEach((child) => {
                    child.active = false;
                });
            }
            this.active = true;
        }
    }

    contentLoaded() {
    }

    process() {
        for(let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "id":
                    this.id = attribute.value;
                    break;
                case "current":
                    this.active = true;
                    break;
                case "href":
                    this.href = attribute.value;
                    break;
            }
        }
    }

    processChildren(sub=false) {
        let childrenToDelete = new Array();
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            if(child.tagName.toLowerCase().includes("navbar-nav-item")) {
                if(child.tagName.toLowerCase().includes(
                    "navbar-nav-item-title")) {
                    this.title = child;
                } else {
                    this.items.push(this.processChild(child));
                }
                childrenToDelete.push(child);
            }
        }
        childrenToDelete.forEach((child) => {
            this.removeChild(child);
        });
        if(this.title!==undefined) {
            this.content = this.title.content;
            console.log(this.title.content);
        }
    }

    processChild(child) {
        let element = new FazNavbarNavItem();
        element.parent = this;
        element.innerHTML = child.innerHTML;
        element.content = element.innerHTML;
        element.process();
        element.processChildren(true);
        return element;
    }

    setRoot(root) {
        this.root = root;
        this.items.forEach((child) => {
            child.setRoot(root);
        });
    }

    processData(parent, data) {
        this.parent = parent;
        this.content = data.value;
        this.href = data.href;
        if(this.href == document.location.pathname) {
            this.active = true;
        }
    }
}

customElements.define("faz-navbar-nav-item", FazNavbarNavItem);