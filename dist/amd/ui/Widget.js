define(['di'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var $__1 = $__0,
      annotate = $__1.annotate,
      TransientScope = $__1.TransientScope;
  var Widget = function Widget() {};
  ($traceurRuntime.createClass)(Widget, {}, {});
  annotate(Widget, new TransientScope);
  return {
    get Widget() {
      return Widget;
    },
    __esModule: true
  };
});
