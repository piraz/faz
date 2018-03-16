var NavItem = require("./nav-item");
var DefineMap = require("can-define/map/map");
var namespace = require("can-namespace");

var dropTemplate = require("./dropdown.stache");
/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
var NavViewModel = DefineMap.extend("NavViewModel", {
    isLoading: {type: "boolean", default: false},
    items: {type: "observable", default: function() {
        return new NavItem.List([]);
    }},
    fill: {type:"boolean", default: "false"},
    justify: {type:"string", default: "left"},
    pills: {type:"boolean", default: "false"},
    tabs: {type:"boolean", default: "false"},
    type: {type:"string", default: "base"},
    vertical: {type:"boolean", default: "false"},

    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        var _this = this;
        var activeItem = "";

        if(typeof $(element).attr("active") !== "undefined") {
            activeItem = $(element).attr("active");
        }

        if(typeof $(element).attr("fill") !== "undefined") {
            this.fill = true;
        }

        if(typeof $(element).attr("justify") !== "undefined") {
            this.justify = $(element).attr("justify");
        }

        if(typeof $(element).attr("pills") !== "undefined") {
            this.pills = true;
        }

        if(typeof $(element).attr("tabs") !== "undefined") {
            this.tabs = true;
        }

        if(typeof $(element).attr("vertical") !== "undefined") {
            this.vertical = true;
        }

        element.querySelectorAll("nav-base > nav-item").forEach(function(item) {
            var navItem = new NavItem();
            item = $(item);
            item.detach();
            navItem.id = item.prop("id");
            navItem.parent = _this;
            if(typeof item.attr("disabled") !== "undefined") {
                navItem.disabled = item.attr("disabled");
            }

            if(_this.isElDropdown(item)) {
                navItem.dropdown = true;
                var children = [];
                item.children().each(function(index, child) {
                    var tagName = $(child).prop("tagName").toLowerCase();
                    if(tagName == "title") {
                        navItem.value = $(child).html();
                    }
                    else if(tagName == "children") {
                        _this.buildDropDownChildren(navItem, child,
                            activeItem);
                    }
                });
            } else {
                navItem.value = item.html();
            }

            if(item.attr("href") != undefined) {
                navItem.href = item.attr("href");
            }

            if(activeItem!="" && navItem.id == activeItem) {
                navItem.active = true;
            }
            _this.items.push(navItem);
        });
    },
    isElDropdown: function(el) {
        var isDropdown = false;
        el.children().each(function(index, child) {
            if($(child).prop("tagName").toLowerCase() == "title") {
                isDropdown = true;
                return isDropdown;
            }
        });
        return isDropdown;
    },
    buildDropDownChildren: function(dropdown, el, activeItem) {
        var _this = this;
        $(el).children().each(function(index, child) {
            dropdown.children.push(_this.buildNavItem(child, activeItem));
        });
    },
    buildNavItem: function(item, activeItem, detach=false) {
        var navItem = new NavItem();
        item = $(item);

        if (detach) {
            item.detach()
        };

        navItem.id = item.prop("id");

        if(typeof item.attr("disabled") !== "undefined") {
            navItem.disabled = item.attr("disabled");
        }

        navItem.value = item.html();

        if(typeof item.attr("href") !== "undefined") {
            navItem.href = item.attr("href");
        }

        if(activeItem!="" && navItem.id == activeItem) {
            navItem.active = true;
        }

        return navItem;
    },
    activateItem: function (item) {
        if (!item.disabled) {
            if (item.parent != null) {
                item.parent.items.active.forEach(function(child) {
                    child.active = false;
                })
            }
            item.active = true;
        }
    },
    /**
     * Returns the nav item class.
     *
     * @param {NavItem} item
     * @returns {string}
     */
    getItemClass: function(item) {
        var classes = ["nav-link"];
        if(item.active) {
            classes.push("active");
        }
        if(item.disabled) {
            classes.push("disabled")
        }

        return classes.join(" ");
    },
    /**
     * Returns the nav item href. If item is disabled a javascript void
     * function will be placed to avoid any action.
     *
     * @param {NavItem} item
     * @returns {string}
     */
    getItemHref: function (item) {
        if(item.disabled) {
            return "javascript:void(0)";
        }
        return item.href;
    },
    getItemValue: function (item) {
        var _this = this;
        var context = {
          item: item,
          viewModel: _this
        };
        return dropTemplate(context);
    }
});

module.exports = namespace.NavViewModel = NavViewModel;
