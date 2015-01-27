define([], function() {
  "use strict";
  var Deferred = function Deferred() {
    var $__0 = this;
    this.promise = new Promise((function(resolve, reject) {
      $__0.resolve_ = resolve;
      $__0.reject_ = reject;
    }));
  };
  ($traceurRuntime.createClass)(Deferred, {
    resolve: function(value) {
      this.resolve_.call(this.promise, value);
    },
    reject: function(reason) {
      this.reject_.call(this.promise, reason);
    }
  }, {});
  return {
    get Deferred() {
      return Deferred;
    },
    __esModule: true
  };
});
