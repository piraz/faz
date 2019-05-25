import QUnit from "steal-qunit";

import $ from "jquery";

import { default as FazAlertViewModel } from "alert/alert-view-model";

QUnit.module("faz/alert/alert-view-model");

let alertViewModel = new FazAlertViewModel();

QUnit.test("Alert view model defaults.", function(assert) {
    assert.equal(
        alertViewModel.isLoading,
        false,
        "Alert view model isLoading default is: false."
    );
});
