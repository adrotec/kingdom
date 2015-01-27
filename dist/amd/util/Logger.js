define(["assert", '../core/ConfigInterface'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var assert = $__0.assert;
  var ConfigInterface = $__2.ConfigInterface;
  var Logger = function Logger(config) {
    assert.argumentTypes(config, ConfigInterface);
    this.config = config;
  };
  ($traceurRuntime.createClass)(Logger, {
    log: function(message) {
      console.log(message);
    },
    error: function(message) {
      console.error(message);
      if (message instanceof Error) {
        console.log(message.stack);
      }
    }
  }, {});
  Object.defineProperty(Logger, "parameters", {get: function() {
      return [[ConfigInterface]];
    }});
  return {
    get Logger() {
      return Logger;
    },
    __esModule: true
  };
});
