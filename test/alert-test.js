import QUnit from "steal-qunit";

import $ from "jquery";

import FazAlert from "../alert/alert";

QUnit.module("faz/alert/alert");

let alert = new FazAlert();

QUnit.test("Alert view model defaults.", function(assert) {
    assert.equal(
        alert.isLoading,
        true,
        "Alert view model isLoading default is: true."
    );
});
