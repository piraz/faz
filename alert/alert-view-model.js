import { ObservableObject, type } from "can";

import alertTemplate from "./stache/alert.stache"
import $ from "jquery";

/**
 * Nav View Model
 * @constructor
 * @param {Object} event. An object representing a nav item.
 * @param {string} event.value
 */
class FazAlertViewModel extends ObservableObject {
    static get props() {
        return {
            isLoading: {type: type.maybeConvert(Boolean), default: true},
            content: {type: type.maybeConvert(observable)},

            get html() {
                return alertTemplate(this);
            }
        };
    }

    show() {
        this.isLoading = false;
        $(this).addClass("faz-navbar-loaded");
    }

    connected() {
        this.content = $(this).html();
        $(this).contents().detach();
        $(this).append(this.html);
        $(this).isLoading = false;
        $(this).contents().unwrap();
    }
}

export default FazAlertViewModel;
