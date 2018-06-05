var QUnit = require("steal-qunit");

var define = require("can-define");
var NavItem = require("nav/nav-item");
var NavViewModel = require("nav/nav-view-model");

QUnit.module("nav/nav-item");

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
