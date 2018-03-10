import DefineMap from "can-define/map/map";
import DefineList from "can-define/list/list";
import namespace from "can-namespace";

/**
 *
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
var NavItem = DefineMap.extend({
    id: "string",
    active: {type: "boolean", default: false},
    disabled: {type: "boolean", default: false},
    href: {type: "string", default: "#"},
    value: "string"
});

NavItem.List = DefineList.extend({
    "#": NavItem,
    get enabled() {
        return this.filter({disabled: false});
    }
});

export default namespace.NavItem = NavItem;
