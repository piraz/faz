import { DefineList, DefineMap } from "can";

import itemTemplate from "./item.stache";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavItem = DefineMap.extend("FazNavItem", {
    id: "string",
    active: {type: "boolean", default: false},
    children: {type: "observable", default: function() {
        return new FazNavItem.List([]);
    }},
    element: "observable",
    parent: {type: "observable", default: null},
    disabled: {type: "boolean", default: false},
    dropdown: {type: "boolean", default: false},
    href: {type: "string", default: "javascript:void(0)"},
    target: {type: "string", default: ""},
    value: "string",
    get isRoot() {
        return this.parent.constructor.name == "FazNavViewModel";
    },
    get navId() {
        return "fazNavItem" + this.id;
    },
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
    },
    get html() {
        var context = {
          item: this
        };
        return itemTemplate(context);
    },
    activate: function () {
        if (!this.disabled) {
            if (this.parent != null) {
                this.parent.items.active.forEach(function(child) {
                    child.active = false;
                });
                if (this.isRoot) {
                    if (this.parent.hasTabContents) {
                        this.parent.tabContentList.active.forEach(
                            function(tabContent) {
                                tabContent.active = false;
                            }
                        );
                        this.parent.tabContentList.forEach(
                            function(tabContent) {
                                let tabContentHef = this.href.startsWith("#") ?
                                    this.href.substring(1) : this.href;
                                if(tabContent.id == tabContentHef) {
                                    tabContent.active = true;
                                }
                            }.bind(this)
                        );
                    }
                }
            }
            this.active = true;
        }
    },
    /**
     * Returns the nav item href. If item is disabled a javascript void
     * function will be placed to avoid any action.
     *
     * @param {FazNavItem} item
     * @returns {string}
     */
    getHref: function () {
        if (this.disabled) {
            return "javascript:void(0)";
        }
        if (this.parent.tabs) {
            if (!this.href.startsWith("#")) {
                return "#" + this.href;
            }
        }
        return this.href;
    }
});

FazNavItem.List = DefineList.extend({
    "#": FazNavItem,
    get enabled() {
        return this.filter({disabled: false});
    },
    get active() {
        return this.filter({active: true});
    }
});

steal.done().then(function() {
    // Responsive Dropdown Submenu fix
    // Got from https://codepen.io/surjithctly/pen/PJqKzQ
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find(
            '.show').removeClass("show");
      }

      var $subMenu = $(this).next(".dropdown-menu");

      $subMenu.toggleClass('show');

      $(this).parents('li.nav-item.dropdown.show').on(
          'hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
      });

      return false;
    });
});

export default FazNavItem;
