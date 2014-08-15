define(['./MessageBox', './Toast', './Dialog'], function($__0,$__1,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var $__MessageBox__ = $__0;
  var $__Toast__ = $__1;
  var $__Dialog__ = $__2;
  return {
    get MessageBox() {
      return $__MessageBox__.MessageBox;
    },
    get Toast() {
      return $__Toast__.Toast;
    },
    get Dialog() {
      return $__Dialog__.Dialog;
    },
    __esModule: true
  };
});
