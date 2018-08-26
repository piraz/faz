var QUnit = require("steal-qunit");

var $ = require("jquery");

var NavItem = require("nav/item");
var NavViewModel = require("nav/nav-view-model");

QUnit.module("nav/item");

var item = new NavItem();

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

QUnit.module("nav/nav-view-model");

var viewModel = new NavViewModel();

QUnit.test("NavViewModel defaults.", function(assert) {
    assert.equal(
        viewModel.justify,
        "left",
        "View model justify default is left."
    );
    assert.equal(viewModel.fill, false, "View model fill default is false.");
});
