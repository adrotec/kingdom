define([], function() {
  "use strict";
  var Config = function Config() {};
  ($traceurRuntime.createClass)(Config, {}, {});
  return {
    get Config() {
      return Config;
    },
    __esModule: true
  };
});
