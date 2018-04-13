var DefineMap = require("can-define/map/map");
var DefineList = require("can-define/list/list");
var namespace = require("can-namespace");

var itemTemplate = require("./item.stache");

/**
 *
 *
 * TODO: Check https://www.codeply.com/go/ji5ijk6yJ4 for submenu on hover
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
var NavItem = DefineMap.extend({
    id: "string",
    active: {type: "boolean", default: false},
    children: {type: "observable", default: function() {
        return new NavItem.List([]);
    }},
    parent: {type: "observable", default: null},
    disabled: {type: "boolean", default: false},
    dropdown: {type: "boolean", default: false},
    href: {type: "string", default: "javascript:void(0)"},
    value: "string",
    get navId() {
        return "fazNavItem" + this.id;
    },
    get html() {
        var context = {
          item: this
        };
        return itemTemplate(context);
    }
});

NavItem.List = DefineList.extend({
    "#": NavItem,
    get enabled() {
        return this.filter({disabled: false});
    },
    get active() {
        return this.filter({active: true});
    }
});

steal.done().then(function() {
    // Got from https://codepen.io/surjithctly/pen/PJqKzQ
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find(
            '.show').removeClass("show");
      }

      var $subMenu = $(this).next(".dropdown-menu");

      $subMenu.toggleClass('show');

      $(this).parents('li.nav-item.dropdown.show').on(
          'hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
      });

      return false;
    });
});

module.exports = namespace.NavItem = NavItem;
