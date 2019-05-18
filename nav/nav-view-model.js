import { DefineMap, route } from "can";

import FazNavContent from "./content";
import FazNavItem from "./item";

import dropTemplate from "./dropdown.stache";

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavViewModel = DefineMap.extend({
    id: {type:"string", default: ""},
    isLoading: {type: "boolean", default: false},
    items: {type: "observable", default: function() {
        return new FazNavItem.List([]);
    }},
    contents: {type: "observable", default: function() {
        return new FazNavContent.List([]);
    }},
    navOuterClass: {type: "string", default: ""},
    contentOuterClass: {type: "string", default: ""},
    fill: {type:"boolean", default: "false"},
    justify: {type:"string", default: "left"},
    page: "string",
    pills: {type:"boolean", default: "false"},
    tabs: {type:"boolean", default: "false"},
    type: {type:"string", default: "nav"},
    vertical: {type:"boolean", default: "false"},
    get hasContent() {
        if (this.contents.length) {
           return true;
        }
        return false;
    },
    get role() {
        if (this.contents.length) {
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

        if(typeof $(element).attr("contentOuterClass") !== "undefined") {
            this.contentOuterClass = $(element).attr("contentOuterClass");
        }

        if(typeof $(element).attr("id") !== "undefined") {
            console.log($(element).attr("id"));
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

        element.querySelectorAll(mainQuery + "faz-nav-content").forEach(
            function(content) {
            var navContent = new FazNavContent();
            content = $(content);
            navContent.id = content.prop("id");
            content.detach();
            navContent.element = content;
            _this.contents.push(navContent);
        });

        element.querySelectorAll(mainQuery + "faz-nav-item").forEach(function(
            item) {
            var navItem = new FazNavItem();
            item = $(item);
            item.detach();
            navItem.id = item.prop("id");
            navItem.parent = _this;
            if(typeof item.attr("disabled") !== "undefined") {
                navItem.disabled = item.attr("disabled");
            }


            if(typeof item.attr("content") !== "undefined") {
                navItem.content = item.attr("content");
            }

            if(_this.isElDropdown(item)) {
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
        });

        if (this.hasContent){
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
        var _this = this;
        $(el).children().each(function(index, child) {
            dropdown.children.push(_this.buildNavItem(dropdown,
                child, activeItem));
        });
    },
    buildNavItem: function(parent, item, activeItem, detach) {
        if (typeof detach === 'undefined') {
            detach =  false;
        }

        var navItem = new FazNavItem();
        navItem.parent = parent;
        var _this = this;

        item = $(item);

        if (detach) {
            item.detach()
        }

        navItem.id = item.prop("id");

        if(typeof item.attr("disabled") !== "undefined") {
            navItem.disabled = item.attr("disabled");
        }

        if(this.isElDropdown(item)) {
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
        }
        else {
            navItem.value = item.html();
            if(typeof item.attr("href") !== "undefined") {
                navItem.href = item.attr("href");
            }

            if(typeof item.attr("target") !== "undefined") {
                navItem.target = item.attr("target");
            }

            if(activeItem!="" && navItem.id == activeItem) {
                navItem.active = true;
            }
        }

        return navItem;
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

export default FazNavViewModel;
