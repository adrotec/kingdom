define(['durandal/app'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var app = $__0.default;
  var MessageBox = function MessageBox() {};
  ($traceurRuntime.createClass)(MessageBox, {
    show: function() {
      var $__9;
      for (var params = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        params[$__3] = arguments[$__3];
      return ($__9 = app).showMessage.apply($__9, $traceurRuntime.spread(params));
    },
    showConfirm: function() {
      var $__9;
      for (var params = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        params[$__4] = arguments[$__4];
      return ($__9 = app).showConfirm.apply($__9, $traceurRuntime.spread(params));
    },
    showNegative: function() {
      var $__9;
      for (var params = [],
          $__5 = 0; $__5 < arguments.length; $__5++)
        params[$__5] = arguments[$__5];
      return ($__9 = app).showDangerMessage.apply($__9, $traceurRuntime.spread(params));
    },
    showPositive: function() {
      var $__9;
      for (var params = [],
          $__6 = 0; $__6 < arguments.length; $__6++)
        params[$__6] = arguments[$__6];
      return ($__9 = app).showSuccessMessage.apply($__9, $traceurRuntime.spread(params));
    },
    showConfirmNegative: function() {
      var $__9;
      for (var params = [],
          $__7 = 0; $__7 < arguments.length; $__7++)
        params[$__7] = arguments[$__7];
      return ($__9 = app).showDangerConfirm.apply($__9, $traceurRuntime.spread(params));
    },
    showConfirmPositive: function() {
      var $__9;
      for (var params = [],
          $__8 = 0; $__8 < arguments.length; $__8++)
        params[$__8] = arguments[$__8];
      return ($__9 = app).showSuccessConfirm.apply($__9, $traceurRuntime.spread(params));
    }
  }, {});
  return {
    get MessageBox() {
      return MessageBox;
    },
    __esModule: true
  };
});
