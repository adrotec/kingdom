define([], function() {
  "use strict";
  var Event = function Event() {};
  ($traceurRuntime.createClass)(Event, {}, {});
  var EventListener = function EventListener() {};
  ($traceurRuntime.createClass)(EventListener, {listen: function(eventName, listener) {}}, {});
  return {
    get Event() {
      return Event;
    },
    get EventListener() {
      return EventListener;
    },
    __esModule: true
  };
});
