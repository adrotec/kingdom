define(['durandal/app', 'plugins/dialog', '../core/RouteBuilder'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var app = $__0.default;
  var dialog = $__2.default;
  var RouteBuilder = $__4.RouteBuilder;
  var Dialog = function Dialog() {};
  ($traceurRuntime.createClass)(Dialog, {
    closeAll: function() {},
    open: function() {
      var $__9;
      for (var params = [],
          $__7 = 0; $__7 < arguments.length; $__7++)
        params[$__7] = arguments[$__7];
      return ($__9 = this).show.apply($__9, $traceurRuntime.spread(params));
    },
    show: function() {
      for (var params = [],
          $__8 = 0; $__8 < arguments.length; $__8++)
        params[$__8] = arguments[$__8];
      return app.showModal(this, params);
    },
    close: function(result) {
      dialog.close(this, result);
    }
  }, {showDialog: function(moduleId, activationData) {
      var idSplit = moduleId.split('/');
      idSplit.push('' + idSplit[idSplit.length - 1]);
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
