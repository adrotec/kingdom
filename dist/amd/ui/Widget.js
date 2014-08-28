define([], function() {
  "use strict";
  var Widget = function Widget() {};
  ($traceurRuntime.createClass)(Widget, {}, {});
  return {
    get Widget() {
      return Widget;
    },
    __esModule: true
  };
});
