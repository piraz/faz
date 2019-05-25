import QUnit from "steal-qunit";

import { default as FazItem } from "../item";

QUnit.module("faz/item");

let item = new FazItem();

QUnit.test("Item tests.", function(assert) {
    assert.equal(
        item.isLink,
        false,
        "Item isLink default is: false."
    );

    let aLink = "a/link";
    item.href = aLink;

    assert.equal(
        item.isLink,
        true,
        "Item isLink is true if href is not null and undefined."
    );

    assert.equal(
        item.href,
        aLink,
        "Item href is set correctly."
    );
});
