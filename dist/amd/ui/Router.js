define(['plugins/router'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var router = $traceurRuntime.assertObject($__0).default;
  var Router = function Router() {};
  ($traceurRuntime.createClass)(Router, {}, {redirect: function(url) {
      router.navigate(url);
    }});
  return {
    get Router() {
      return Router;
    },
    __esModule: true
  };
});
