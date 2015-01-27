define(['plugins/observable'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var observable = $__0.default;
  var Entity = function Entity() {};
  ($traceurRuntime.createClass)(Entity, {defineProperty: function(property, getter, setter) {
      var evaluator = getter;
      if (setter) {
        evaluator = {
          read: getter,
          write: setter
        };
      }
      observable.defineProperty(this, property, evaluator);
    }}, {});
  return {
    get Entity() {
      return Entity;
    },
    __esModule: true
  };
});
