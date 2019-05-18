import { DefineList, DefineMap } from "can";

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavContent = DefineMap.extend({
    id: "string",
    element: "observable",
    active: {type: "boolean", default: false},
    fade: {type: "boolean", default: false},
    show: {type: "boolean", default: false},
    get class() {
        var classes = ["tab-pane"];
        if(this.active) {
            classes.push("active");
        }
        if(this.fade) {
            classes.push("fade");
        }
        if(this.show) {
            classes.push("show");
        }
        return classes.join(" ");
    }
});

FazNavContent.List = DefineList.extend({
    "#": FazNavContent,
    get active() {
        return this.filter({active: true});
    }
});

export default FazNavContent;
