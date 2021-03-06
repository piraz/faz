/**
 * Copyright 2018-2020 Flavio Garcia
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


import {domEvents, ObservableObject, type} from "can";
import DateUtil from "../date";
import { FazStacheItem } from "../item";
import datepickerTemplate from "./stache/datepicker.stache";


export default class FazDatepicker extends FazStacheItem {

    static view = datepickerTemplate;

    static get props() {
        return $.extend(super.props, {
            currentDate: {type: Date, get default() {
                return new Date();
            }},
            selectedDate: {type: Date},
            type: {type: String, default: "fixed"},
            overDatePicker: {type: Boolean, default: false},
            today: {type: Date, get default() {
                return new Date();
            }}
        });
    }


    beOverDatePicker() {
        this.overDatePicker = true;
    }

    leaveDatePicker() {
        this.overDatePicker = false;
    }

    get year() {
        return this.currentDate.getFullYear();
    }

    get componentClass() {
        let classes = ["container", "m-0", "p-0"];
        if(this.type=="expanded"){
            classes.push("datepicker-container-expanded");
        } else {
            classes.push("datepicker-container-fixed");
        }
        return classes.join(" ");
    }

    isSelected(day) {
        if (DateUtil.dateString(day) == this.selectedDay) {
            return true;
        }
        return false;
    }

    getDayLinkClass(day) {
        let classes = ["btn", "btn-sm"];

        if(this.isSelected(day)) {
            classes.push("btn-primary");
        } else if (DateUtil.isToday(day)) {
            classes.push("btn-info");
        } else {
            classes.push("btn-day");
        }

        return classes.join(" ");
    }

    get monthName() {
        return DateUtil.getMonthName(this.currentDate.getMonth());
    }

    get dateMatrix() {
        return DateUtil.daysOfMonthMatrix(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth()
        );
    }

    afterConnectedCallback() {
    }

    beforeConnectedCallback() {
        for(let attribute of this.attributes) {
            switch (attribute.name) {
                case "type":
                    this.type = attribute.value;
                    break;
            }
        }
    }

    goToPreviousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
    }

    goToNextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    }

    dispatchDayClick(event, day) {
        this.selectedDay = DateUtil.dateString(day) ;
        let eventData = {
            type: "day-click",
            originalEvent: event,
            day: day
        }
        domEvents.dispatch(this, eventData);
    }

    show() {
        $(this).addClass("faz-datepicker-rendered");
    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-datepicker", FazDatepicker);
