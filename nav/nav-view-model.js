/**
 * Copyright 2018-2019 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DefineMap, route } from "can";
import each from "can-util/js/each/each";

import FazNavItem from "./nav-item";
import FazNavTabContent from "./nav-tab-content";

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
let FazNavViewModel = DefineMap.extend("FazNavViewModel", {
    id: {type:"string", default: ""},
    isLoading: {type: "boolean", default: false},
    items: {type: "observable", default: function() {
        return new FazNavItem.List([]);
    }},
    tabContentList: {type: "observable", default: function() {
        return new FazNavTabContent.List([]);
    }},
    navOuterClass: {type: "string", default: "row"},
    tabsClass: {type: "string", default: ""},
    fill: {type:"boolean", default: "false"},
    justify: {type:"string", default: "left"},
    page: "string",
    pills: {type:"boolean", default: "false"},
    tabs: {type:"boolean", default: "false"},
    vertical: {type:"boolean", default: "false"},
    get hasTabContents() {
        if (this.tabContentList.length) {
           return true;
        }
        return false;
    },
    get role() {
        if (this.hasTabContents()) {
           return "tablist";
        }
        return "";
    },
    get orientation() {
        if (this.vertical){
            return "vertical";
        }
        return "";
    },
    /**
     *
     * @param element
     */
    connectedCallback: function(element) {
        route.data = new DefineMap( { page: "" } );
        route.register( "{page}");
        route.start();

        let activeItem = "";

        each(element.attributes, function(attribute) {
            let attributeName = attribute.name.toLowerCase();
            switch (attributeName) {
                case "active":
                    activeItem = attribute.value;
                    break;
                case "fill":
                    this.fill = attribute.value;
                    break;
                case "justify":
                    this.justify = attribute.value;
                    break;
                case "id":
                    console.log(this);
                    this.id = attribute.value;
                    break;
                case "pills":
                    this.pills = true;
                    break;
                case "tabs":
                    this.tabs = true;
                    break;
                case "vertical":
                    this.vertical = true;
                    break;
            }
        }.bind(this));

        element.querySelectorAll("faz-nav > faz-nav-tab-content").forEach(
            function(tabContent) {
            let navTabContent = new FazNavTabContent();
            navTabContent.parent = this;
            tabContent = $(tabContent);
            navTabContent.id = tabContent.prop("id");
            if (tabContent.attr("fade") !== undefined) {
                tabContent.fade = true;
            }
            tabContent.detach();
            navTabContent.element = tabContent;
            this.tabContentList.push(navTabContent);
        }.bind(this));

        element.querySelectorAll("faz-nav > faz-nav-item").forEach(
            function(item) {
            let navItem = new FazNavItem();
            navItem.process(this, $(item), activeItem);
            this.items.push(navItem);
        }.bind(this));

        if (this.hasTabContents) {
            this.items.active[0].activate();
        }

        $(element).children().unwrap();
    }
});

export default FazNavViewModel;
