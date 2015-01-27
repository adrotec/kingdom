define(['durandal/app', 'toastr'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var app = $__0.default;
  var toastr = $__2.default;
  var Toast = function Toast() {};
  ($traceurRuntime.createClass)(Toast, {
    show: function() {
      var $__8;
      for (var params = [],
          $__5 = 0; $__5 < arguments.length; $__5++)
        params[$__5] = arguments[$__5];
      ($__8 = toastr).info.apply($__8, $traceurRuntime.spread(params));
    },
    showPositive: function() {
      var $__8;
      for (var params = [],
          $__6 = 0; $__6 < arguments.length; $__6++)
        params[$__6] = arguments[$__6];
      return ($__8 = toastr).success.apply($__8, $traceurRuntime.spread(params));
    },
    showNegative: function() {
      var $__8;
      for (var params = [],
          $__7 = 0; $__7 < arguments.length; $__7++)
        params[$__7] = arguments[$__7];
      return ($__8 = toastr).error.apply($__8, $traceurRuntime.spread(params));
    }
  }, {});
  return {
    get Toast() {
      return Toast;
    },
    __esModule: true
  };
});
