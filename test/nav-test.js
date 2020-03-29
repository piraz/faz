import QUnit from "steal-qunit";

import { default as FazNav } from "nav/nav";
import { FazNavItem } from "nav/nav-item";
import $ from "jquery"

QUnit.module("faz/nav/nav-item");

let item = new FazNavItem();

QUnit.test("NavItem defaults.", function(assert) {
    assert.equal(
        item.active,
        false,
        "Item href default is: false."
    );

    assert.equal(
        item.getHref(),
        "javascript:void(0)",
        "Item href default is: \"javascript:void(0)\"."
    );
});


QUnit.test("NavItem getHref.", function(assert) {
    item.disabled = true;

    assert.equal(
        item.getHref(),
        "javascript:void(0)",
        "When disable is true: default href."
    );

    item.disabled = false;
    item.parent = new FazNav();

    assert.equal(
        item.getHref(),
        "javascript:void(0)",
        "When enabled and content and href are null: default href."
    );


    item.href = "my-content";
    item.parent.tabs = true;

    assert.equal(
        item.getHref(),
        "#" + item.href,
        "When enabled and parent tabs is true and href starts with #: \"# + item.content\"."
    );

    item.href = "#my-content";
    item.parent.tabs = true;

    assert.equal(
        item.getHref(),
        item.href,
        "When enabled and parent tabs is true and href doesn't starts with #: \"# + item.content\"."
    );

    item.disabled = false;
    item.parent.tabs = false;
    item.href = "http://a_url.com";

    assert.equal(
        item.getHref(),
        item.href,
        "When enabled and parent tabs isn't true and url isn't empty: \"item.html\"."
    );
});

QUnit.module("faz/nav/nav-view-model");

let fazNav = new FazNav();

QUnit.test("FazNav defaults.", function(assert) {
    assert.equal(
        fazNav.justify,
        "left",
        "View model justify default is left."
    );
    assert.equal(fazNav.fill, false, "View model fill default is false.");
});
