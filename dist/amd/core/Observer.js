define(['plugins/observable'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var observable = $__0.default;
  var Observer = function Observer() {};
  ($traceurRuntime.createClass)(Observer, {}, {
    observe: function(obj, prop, fn) {
      observable(obj, prop).subscribe(function(newValue) {
        if (typeof fn === "function") {
          fn.apply(obj, [newValue]);
        } else {
          obj[fn](newValue);
        }
      });
    },
    getObservable: function(obj, prop) {
      return observable(obj, prop);
    }
  });
  return {
    get Observer() {
      return Observer;
    },
    __esModule: true
  };
});
