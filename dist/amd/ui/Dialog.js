define(['durandal/app', 'plugins/dialog', '../core/RouteBuilder'], function($__0,$__1,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var app = $traceurRuntime.assertObject($__0).default;
  var dialog = $traceurRuntime.assertObject($__1).default;
  var RouteBuilder = $traceurRuntime.assertObject($__2).RouteBuilder;
  var Dialog = function Dialog() {};
  ($traceurRuntime.createClass)(Dialog, {
    closeAll: function() {},
    open: function() {
      var $__7;
      for (var params = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        $traceurRuntime.setProperty(params, $__4, arguments[$traceurRuntime.toProperty($__4)]);
      return ($__7 = this).show.apply($__7, $traceurRuntime.toObject(params));
    },
    show: function() {
      for (var params = [],
          $__5 = 0; $__5 < arguments.length; $__5++)
        $traceurRuntime.setProperty(params, $__5, arguments[$traceurRuntime.toProperty($__5)]);
      return app.showModal(this, params);
    },
    close: function(result) {
      dialog.close(this, result);
    }
  }, {showDialog: function(moduleId, activationData) {
      var idSplit = moduleId.split('/');
      idSplit.push('' + idSplit[$traceurRuntime.toProperty(idSplit.length - 1)]);
      var moduleIdReal = idSplit.join('/');
      moduleIdReal = RouteBuilder.getRoutePrefix() + moduleIdReal;
      return app.showModal(moduleIdReal, activationData);
    }});
  return {
    get Dialog() {
      return Dialog;
    },
    __esModule: true
  };
});
