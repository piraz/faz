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

import FazDatepicker from "./datepicker";
import { domEvents }  from "can";
import DateUtil from "../date";
import { FazStacheItem } from "../item";
import inputDatepickerTemplate from "./stache/input-datepicker.stache";


export default class FazInputDatepicker extends FazStacheItem {

    static view = inputDatepickerTemplate;

    static get props() {
        return $.extend(super.props, {
            datepicker: {type: Object, get default () {
                let datepicker = new FazDatepicker();
                datepicker.id = this.id + "-datepicker";
                datepicker.render();
                return datepicker;
            }}
        });
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

    getDayLinkClass(day) {
        let classes = ["btn", "btn-sm"];

        if(DateUtil.isToday(day)){
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

    showPopover() {
        $("#" + this.id).popover("show");
        $("#" + this.id + "-popover").append(this.datepicker);
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

    dispatchDayClick(event, day) {
        let eventData = {
            type: "day-click",
            originalEvent: event,
            day: day
        }
        domEvents.dispatch(this, eventData);
    }

    show() {
        $(this).addClass("faz-datepicker-rendered");
        $(function () {
            $("#" + this.id).popover({
                content: this.datepicker,
                placement: "top",
                trigger: "focus",
                html: true
            })
        }.bind(this));
        console.log(this.id + "-popover");
    }

    static get seal() {
        return true;
    }
}



customElements.define("faz-input-datepicker", FazInputDatepicker);

