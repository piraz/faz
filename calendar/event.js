import DefineMap from "can-define/map/map";
import DefineList from "can-define/list/list";
import namespace from "can-namespace";

/**
 *
 * @constructor
 * @param {Object} event. An object representing the event.
 * @param {number} event.id
 * @param {Date} event.date
 * @param {string} event.title
 * @param {string} event.description
 * @param {string} event.status
 */
var Event = DefineMap.extend({
    id: "number",
    date: "date",
    title: "string",
    description: "string",
    status: "string"
});

Event.List = DefineList.extend({
    "#": Event
});

export default namespace.Event = Event;
