import NavItem from "./item";

import Component from "can-component";
import DefineMap from "can-define/map/map";

//import template from "./nav.stache";
var navTemplate;
var dropTemplate;

var promise = steal("nav/nav.stache", "nav/dropdown.stache",
    function(_navTemplate, _dropTemplate){
        navTemplate = _navTemplate;
        dropTemplate = _dropTemplate;
    }
);

import canMap from "can-connect/can/map/map";
import connect from "can-connect";
import dataUrl from "can-connect/data/url/url";
import constructor from "can-connect/constructor/constructor";


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

        element.querySelectorAll("nav-item").forEach(function(item) {
            item = $(item);
            item.detach();
            var navItem = new NavItem();

            navItem.id = item.prop("id");

            if(typeof item.attr("disabled") !== "undefined") {
                navItem.disabled = item.attr("disabled");
            }

            if(_this.isElDropdown(item)) {
                navItem.dropdown = true;
                var title = "";
                var children = [];
                item.children().each(function(index, child) {
                    if($(child).prop("tagName").toLowerCase() == "title") {
                        navItem.value = $(child).html();
                    }
                });
                console.debug(item);
            } else {
                navItem.value = item.html();
            }

            if(typeof item.attr("href") !== "undefined") {
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
        el.children().each(function(index, child){
            if($(child).prop("tagName").toLowerCase() == "title") {

                isDropdown = true;
                return isDropdown;
            }
        });
        return isDropdown;
    }
});

var events = {

};

var helpers = {
    getComponentClass: function () {
        var classes = ["nav"];

        if (this.fill) {
            classes.push("nav-fill");
        }

        if (this.justify == "center") {
            classes.push("justify-content-center");
        } else if (this.justify == "right") {
            classes.push("justify-content-end");
        }

        if (this.pills) {
            classes.push("nav-pills");
        }

        if (this.tabs) {
            classes.push("nav-tabs");
        }

        if (this.vertical) {
            classes.push("flex-column");
        }

        return classes.join(" ");
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
        if (this.fill) {
            classes.push("nav-item");
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
    }
};

promise.then(function(){

    Component.extend({
        tag: "nav-base",
        view: navTemplate,
        ViewModel: NavViewModel,
        events: events,
        helpers: helpers
    });

});