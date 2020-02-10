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

import itemTemplate from "./stache/nav-item.stache";


/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
export class FazNavItem extends FazItem {

    static get props() {
        return $.extend(super.props, {
            disabled: {type: type.convert(Boolean), default: false},
            target: {type: type.convert(String), default: ""},
            items: {type: FazNavItemList, get default() {
                return new FazNavItemList([]);
            }},
            root: "*",
            value: String,
            title: String
        });
    }

    get isRoot() {
        if(this.parent!== undefined) {
            return this.parent.constructor.name == "FazNav";
        }
        return false;
    }

    get ariaControls() {
        let voidAriaControls = "";
        let validAriaControls = this.href === undefined ? voidAriaControls :
            this.href;
        if (this.disabled) {
            return voidAriaControls;
        }
        if (this.parent !== undefined) {
            if (this.parent.tabs) {
                if (validAriaControls.startsWith("#") && this.href) {
                    return validAriaControls.substring(1);
                }
            }
        }
        return validAriaControls;
    }

    get ariaSelected() {
        return this.active ? "true" : "false";
    }

    get dropdown() {
        if(this.items.length==0) {
            return false;
        }
        return true;
    }

    get navId() {
        return "fazNavItem" + this.id;
    }

    /**
     * Returns the nav item class.
     *
     * @param {FazNavItem} item
     * @returns {string}
     */
    get class() {
        let classes = ["nav-link"];
        if(this.active) {
            classes.push("active");
        }
        if(this.disabled) {
            classes.push("disabled")
        }
        return classes.join(" ");
    }

    get html() {
        return itemTemplate(this);
    }

    setParent(parent) {
        this.parent = parent;
    }

    activate() {
        if (!this.disabled) {
            if (this.parent != null) {
                this.parent.items.active.forEach(function(child) {
                    child.active = false;
                }.bind(this));
                if (this.isRoot) {
                    if (this.parent.hasTabContents) {
                        this.parent.tabContents.forEach(
                            function(tabContent) {
                                tabContent.active = false;
                                if(tabContent.id == this.ariaControls) {
                                    tabContent.active = true;
                                }
                            }.bind(this)
                        );
                    }
                }
            }
            this.active = true;
        }
    }

    /**
     * Returns the nav item href. If item is disabled a javascript void
     * function will be placed to avoid any action.
     *
     * @param {FazNavItem} item
     * @returns {string}
     */
    getHref() {
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

    processElement(parent, element) {
        this.parent = parent;
        if (parent.constructor.name == "FazNav") {
            this.root = parent;
        } else {
            this.root = parent.root;
        }

        let dataItem = {};
        for(let attribute of element.attributes) {
            dataItem[attribute.name] = attribute.value;
        }
        assign(this, dataItem);

        if (this.root.active == this.id) {
            this.active = true;
        }

        if (element.children.length > 0) {
            $(element.children).each(function(_,child) {
                switch (child.tagName.toLowerCase()) {
                    case "title":
                        this.content = child.innerHTML;
                        break;
                    case "children":
                        if (child.children.length > 0) {
                            $(child.children).each(function(_,grandChild) {
                                let navItem = new FazNavItem();
                                navItem.processElement(this, grandChild);
                                this.items.push(navItem);
                            }.bind(this));
                        }
                        break;
                }
            }.bind(this));
        } else {
            this.content = element.innerHTML;
        }
    }

    process(parent, element, activeItem) {
        this.parent = parent;
        //if(this.isRoot) {
            element.detach();
        //}
        this.element = element;
        this.id = this.element.prop("id");
        if(this.element.attr("disabled") !== undefined) {
            this.disabled = this.element.attr("disabled");
        }
        if(activeItem != "" && this.id == activeItem) {
            this.active = true;
        }
        if(this.isDropdown) {
            this.dropdown = true;
            this.element.children().each(function(_, child) {
                let tagName = $(child).prop("tagName").toLowerCase();
                if(tagName == "title") {
                    this.value = $(child).html();
                } else if(tagName == "children") {
                    $(child).each(function(_, item) {
                        $(item).children().each(function(_, itemChild) {
                            let navItem = new FazNavItem();
                            navItem.process(this, $(itemChild), activeItem);
                            this.children.push(navItem);
                        }.bind(this));
                    }.bind(this));
                }
            }.bind(this));
        } else {
            this.value = this.element.html();
        }
        if(this.element.attr("href") != undefined) {
            this.href = this.element.attr("href");
        }
        if(this.element.attr("target") != undefined) {
            this.target = this.element.attr("target");
        }
    }
}

export class FazNavItemList extends ObservableArray {
    static get props() {
        return {
            get enabled() {
                return this.filter({disabled: false});
            },

            get active() {
                return this.filter({active: true});
            }
        };
    }

    static items = type.convert(FazNavItem);
}

steal.done().then(function() {
    // Responsive Dropdown Submenu fix
    // Got from https://codepen.io/surjithctly/pen/PJqKzQ
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find(
            '.show').removeClass("show");
      }

      let subMenu = $(this).next(".dropdown-menu");

      subMenu.toggleClass('show');

      $(this).parents('li.nav-item.dropdown.show').on(
          'hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
      });

      return false;
    });
});
