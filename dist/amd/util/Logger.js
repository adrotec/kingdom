define(["assert", '../core/ConfigInterface'], function($__0,$__1) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var assert = $traceurRuntime.assertObject($__0).assert;
  var ConfigInterface = $traceurRuntime.assertObject($__1).ConfigInterface;
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
  Logger.parameters = [[ConfigInterface]];
  return {
    get Logger() {
      return Logger;
    },
    __esModule: true
  };
});
