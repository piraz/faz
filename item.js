import {DefineMap} from "can";

let FazItem = DefineMap.extend({
    id: "string",
    content: "string",
    element: "observable",
    href: "string",
    parent: {type: "observable"},
    get isLink() {
        return this.href !== null && this.href !== undefined;
    },
});

export default FazItem;
