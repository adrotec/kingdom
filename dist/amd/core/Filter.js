define(['knockout'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var ko = $traceurRuntime.assertObject($__0).default;
  var Filter = function Filter(name, fn) {
    $traceurRuntime.setProperty(ko.filters, name, fn);
  };
  ($traceurRuntime.createClass)(Filter, {}, {});
  return {
    get Filter() {
      return Filter;
    },
    __esModule: true
  };
});
