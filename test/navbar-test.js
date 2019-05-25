import QUnit from "steal-qunit";

import FazNavbarBrand from "navbar/brand";
import FazNavbarViewModel from "navbar/view-model";

QUnit.module("navbar/brand");

let navbarBrand = new FazNavbarBrand();

QUnit.test("Navbar Brand defaults.", function(assert) {
    assert.equal(
        navbarBrand.isLink,
        false,
        "Brand isLink default is: false."
    );
});


QUnit.module("navbar/view-model");

let navbarViewModel = new FazNavbarViewModel();

QUnit.test("Navbar View Model defaults.", function(assert) {
    assert.equal(
        navbarViewModel.brand,
        null,
        "View Model brand default is: null."
    );
    assert.equal(
        navbarViewModel.id,
        "",
        "View Model id default is: \"\"."
    );
});
