define(['durandal/app', 'plugins/dialog'], function($__0,$__1) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var app = $traceurRuntime.assertObject($__0).default;
  var dialog = $traceurRuntime.assertObject($__1).default;
  var Dialog = function Dialog() {};
  ($traceurRuntime.createClass)(Dialog, {
    closeAll: function() {},
    open: function() {
      var $__6;
      for (var params = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        $traceurRuntime.setProperty(params, $__3, arguments[$traceurRuntime.toProperty($__3)]);
      return ($__6 = this).show.apply($__6, $traceurRuntime.toObject(params));
    },
    show: function() {
      for (var params = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        $traceurRuntime.setProperty(params, $__4, arguments[$traceurRuntime.toProperty($__4)]);
      return app.showModal(this, params);
    },
    close: function(result) {
      dialog.close(this, result);
    }
  }, {});
  return {
    get Dialog() {
      return Dialog;
    },
    __esModule: true
  };
});
