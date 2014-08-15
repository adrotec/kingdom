define(['plugins/observable'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var observable = $traceurRuntime.assertObject($__0).default;
  var Observer = function Observer() {};
  ($traceurRuntime.createClass)(Observer, {}, {observe: function(object, prop, fn) {
      observable(object, prop).subscribe(function(newValue) {
        object[$traceurRuntime.toProperty(fn)](newValue);
      });
    }});
  return {
    get Observer() {
      return Observer;
    },
    __esModule: true
  };
});
