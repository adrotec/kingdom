define(['prophecy'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var DeferredBase = $traceurRuntime.assertObject($__0).Deferred;
  var Deferred = function Deferred() {
    $traceurRuntime.defaultSuperCall(this, $Deferred.prototype, arguments);
  };
  var $Deferred = Deferred;
  ($traceurRuntime.createClass)(Deferred, {}, {}, DeferredBase);
  return {
    get Deferred() {
      return Deferred;
    },
    __esModule: true
  };
});
