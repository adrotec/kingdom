define(['durandal/app'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var app = $traceurRuntime.assertObject($__0).default;
  var MessageBox = function MessageBox() {};
  ($traceurRuntime.createClass)(MessageBox, {
    show: function() {
      var $__9;
      for (var params = [],
          $__2 = 0; $__2 < arguments.length; $__2++)
        $traceurRuntime.setProperty(params, $__2, arguments[$traceurRuntime.toProperty($__2)]);
      return ($__9 = app).showMessage.apply($__9, $traceurRuntime.toObject(params));
    },
    showConfirm: function() {
      var $__9;
      for (var params = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        $traceurRuntime.setProperty(params, $__3, arguments[$traceurRuntime.toProperty($__3)]);
      return ($__9 = app).showConfirm.apply($__9, $traceurRuntime.toObject(params));
    },
    showNegative: function() {
      var $__9;
      for (var params = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        $traceurRuntime.setProperty(params, $__4, arguments[$traceurRuntime.toProperty($__4)]);
      return ($__9 = app).showDangerMessage.apply($__9, $traceurRuntime.toObject(params));
    },
    showPositive: function() {
      var $__9;
      for (var params = [],
          $__5 = 0; $__5 < arguments.length; $__5++)
        $traceurRuntime.setProperty(params, $__5, arguments[$traceurRuntime.toProperty($__5)]);
      return ($__9 = app).showSuccessMessage.apply($__9, $traceurRuntime.toObject(params));
    },
    showConfirmNegative: function() {
      var $__9;
      for (var params = [],
          $__6 = 0; $__6 < arguments.length; $__6++)
        $traceurRuntime.setProperty(params, $__6, arguments[$traceurRuntime.toProperty($__6)]);
      return ($__9 = app).showDangerConfirm.apply($__9, $traceurRuntime.toObject(params));
    },
    showConfirmPositive: function() {
      var $__9;
      for (var params = [],
          $__7 = 0; $__7 < arguments.length; $__7++)
        $traceurRuntime.setProperty(params, $__7, arguments[$traceurRuntime.toProperty($__7)]);
      return ($__9 = app).showSuccessConfirm.apply($__9, $traceurRuntime.toObject(params));
    }
  }, {});
  return {
    get MessageBox() {
      return MessageBox;
    },
    __esModule: true
  };
});
