import { DefineMap, route } from "can";

import FazNavItem from "./item";
import FazNavTabContent from "./tab-content";

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavViewModel = DefineMap.extend("FazNavViewModel", {
    id: {type:"string", default: ""},
    isLoading: {type: "boolean", default: false},
    items: {type: "observable", default: function() {
        return new FazNavItem.List([]);
    }},
    tabContentList: {type: "observable", default: function() {
        return new FazNavTabContent.List([]);
    }},
    navOuterClass: {type: "string", default: ""},
    tablistOuterClass: {type: "string", default: ""},
    fill: {type:"boolean", default: "false"},
    justify: {type:"string", default: "left"},
    page: "string",
    pills: {type:"boolean", default: "false"},
    tabs: {type:"boolean", default: "false"},
    type: {type:"string", default: "nav"},
    vertical: {type:"boolean", default: "false"},
    get hasTabContents() {
        if (this.tabContentList.length) {
           return true;
        }
        return false;
    },
    get role() {
        if (this.hasTabContents()) {
           return "tablist";
        }
        return "";
    },
    get orientation() {
        if (this.vertical){
            return "vertical";
        }
        return "";
    },
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        this.type = element.tagName.toLowerCase().replace("faz-", "");
        route.data = new DefineMap( { page: "" } );
        route.register( "{page}");
        route.start();

        var _this = this;
        var activeItem = "";

        $.each(element.attributes, function() {
            if(this.name.toLowerCase() == "navouterclass"){
                _this.navOuterClass = this.value;
            }
        });

        if(typeof $(element).attr("active") !== "undefined") {
            activeItem = $(element).attr("active");
        }

        if(typeof $(element).attr("navouterclass") !== "undefined") {
            this.navOuterClass = $(element).attr("navouterclass");
        }

        if(typeof $(element).attr("tablistOuterClass") !== "undefined") {
            this.tablistOuterClass = $(element).attr("tablistOuterClass");
        }

        if(typeof $(element).attr("id") !== "undefined") {
            this.id = $(element).attr("id");
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

        var mainQuery = "faz-"  + this.type + "> ";

        element.querySelectorAll(mainQuery + "faz-nav-tab-content").forEach(
            function(tabContent) {
                var navTabContent = new FazNavTabContent();
                tabContent = $(tabContent);
                navTabContent.id = tabContent.prop("id");
                if (tabContent.attr("fade")!==undefined) {
                    tabContent.fade = true;
                }
                tabContent.detach();
                navTabContent.element = tabContent;
                this.tabContentList.push(navTabContent);
            }.bind(this)
        );

        element.querySelectorAll(mainQuery + "faz-nav-item").forEach(function(
            item) {
            var navItem = new FazNavItem();
            item = $(item);
            item.detach();
            navItem.id = item.prop("id");
            navItem.parent = this;
            navItem.element = item;

            if(typeof item.attr("disabled") !== "undefined") {
                navItem.disabled = item.attr("disabled");
            }

            if(this.isElDropdown(item)) {
                navItem.dropdown = true;
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

            if(item.attr("target") != undefined) {
                navItem.target = item.attr("target");
            }

            if(activeItem!="" && navItem.id == activeItem) {
                navItem.active = true;
            }
            _this.items.push(navItem);
        }.bind(this));

        if (this.hasTabContents){
            this.items.active[0].activate();
        }
    },
    isElDropdown: function(el) {
        if(el.children().length==0){
            return false;
        }
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
        $(el).children().each(function(index, child) {
            dropdown.children.push(this.buildNavItem(dropdown,
                child, activeItem));
        }.bind(this));
    },
    buildNavItem: function(parent, item, activeItem, detach) {
        if (typeof detach === 'undefined') {
            detach =  false;
        }

        var navItem = new FazNavItem();
        navItem.parent = parent;

        item = $(item);

        if (detach) {
            item.detach()
        }

        navItem.id = item.prop("id");

        if (typeof item.attr("disabled") !== "undefined") {
            navItem.disabled = item.attr("disabled");
        }

        if(this.isElDropdown(item)) {
            navItem.dropdown = true;
            var children = [];
            item.children().each(function(index, child) {
                var tagName = $(child).prop("tagName").toLowerCase();
                if (tagName == "title") {
                    navItem.value = $(child).html();
                }
                else if (tagName == "children") {
                    this.buildDropDownChildren(navItem, child,
                        activeItem);
                }
            }.bind(this));
        }
        else {
            navItem.value = item.html();
            if (typeof item.attr("href") !== "undefined") {
                navItem.href = item.attr("href");
            }

            if (typeof item.attr("target") !== "undefined") {
                navItem.target = item.attr("target");
            }

            if (activeItem!="" && navItem.id == activeItem) {
                navItem.active = true;
            }
        }

        return navItem;
    }
});

export default FazNavViewModel;
