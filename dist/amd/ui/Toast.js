define(['durandal/app', 'toastr'], function($__0,$__1) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var app = $traceurRuntime.assertObject($__0).default;
  var toastr = $traceurRuntime.assertObject($__1).default;
  var Toast = function Toast() {};
  ($traceurRuntime.createClass)(Toast, {
    show: function() {
      var $__7;
      for (var params = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        $traceurRuntime.setProperty(params, $__3, arguments[$traceurRuntime.toProperty($__3)]);
      ($__7 = toastr).info.apply($__7, $traceurRuntime.toObject(params));
    },
    showPositive: function() {
      var $__7;
      for (var params = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        $traceurRuntime.setProperty(params, $__4, arguments[$traceurRuntime.toProperty($__4)]);
      return ($__7 = toastr).success.apply($__7, $traceurRuntime.toObject(params));
    },
    showNegative: function() {
      var $__7;
      for (var params = [],
          $__5 = 0; $__5 < arguments.length; $__5++)
        $traceurRuntime.setProperty(params, $__5, arguments[$traceurRuntime.toProperty($__5)]);
      return ($__7 = toastr).error.apply($__7, $traceurRuntime.toObject(params));
    }
  }, {});
  return {
    get Toast() {
      return Toast;
    },
    __esModule: true
  };
});
