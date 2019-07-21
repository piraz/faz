import { DefineMap } from "can";

let FazItem = DefineMap.extend("FazItem", {
    id: "string",
    active: {type: "boolean", default: false},
    content: "string",
    element: "observable",
    href: "string",
    parent: {type: "observable"},
    get isLink() {
        return this.href !== null && this.href !== undefined;
    },
});

export default FazItem;
