import QUnit from "steal-qunit";

import $ from "jquery";

import FazAlertViewModel from "alert/alert-view-model";

QUnit.module("alert/alert-view-model");

let alertViewModel = new FazAlertViewModel();

QUnit.test("NavItem defaults.", function(assert) {
    assert.equal(
        item.active,
        false,
        "Item href default is: false."
    );

    assert.equal(
        item.href,
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

    assert.equal(
        item.getHref(),
        "javascript:void(0)",
        "When enabled and content and href are null: default href."
    );


    item.content = "my-content";

    assert.equal(
        item.getHref(),
        "#" + item.content,
        "When enabled and content isn't empty: \"# + item.content\"."
    );

    item.content = null;
    item.href = "http://a_url.com";

    assert.equal(
        item.getHref(),
        item.href,
        "When enabled and not content and url isn't empty: \"item.html\"."
    );
});
