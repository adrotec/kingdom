define([], function() {
  "use strict";
  var Storage = function Storage() {};
  ($traceurRuntime.createClass)(Storage, {
    get: function(key) {},
    set: function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, {});
  return {
    get Storage() {
      return Storage;
    },
    __esModule: true
  };
});
