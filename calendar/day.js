import DefineMap from "can-define/map/map";
import DefineList from "can-define/list/list";
import event from "event";
import namespace from "can-namespace";

var Day = DefineMap.extend({
    date: "date",
    events: {type: "observable", default: function(){
        return new event.List([])
    }},
});

Event.List = DefineList.extend({
    "#": Event
});

export default namespace.event = Event;