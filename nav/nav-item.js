var DefineMap = require("can-define/map/map");
var DefineList = require("can-define/list/list");
var namespace = require("can-namespace");

/**
 *
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
var NavItem = DefineMap.extend({
    id: "string",
    active: {type: "boolean", default: false},
    children: {type: "observable", default: function() {
        return new NavItem.List([]);
    }},
    parent: {type: "observable", default: null},
    disabled: {type: "boolean", default: false},
    dropdown: {type: "boolean", default: false},
    href: {type: "string", default: "javascript:void(0)"},
    value: "string"
});

NavItem.List = DefineList.extend({
    "#": NavItem,
    get enabled() {
        return this.filter({disabled: false});
    },
    get active() {
        return this.filter({active: true});
    }
});

module.exports = namespace.NavItem = NavItem;
