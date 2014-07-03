define(['knockout', 'durandal-punches', './Module', './ModuleLoader', './RouteBuilder'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  var ko = $traceurRuntime.assertObject($__0).default;
  var koPunches = $traceurRuntime.assertObject($__1).default;
  ko.punches.enableAll();
  var $__Module__ = $__2;
  var $__ModuleLoader__ = $__3;
  var $__RouteBuilder__ = $__4;
  return {
    get Module() {
      return $__Module__.Module;
    },
    get RootModule() {
      return $__Module__.RootModule;
    },
    get ModuleLoader() {
      return $__ModuleLoader__.ModuleLoader;
    },
    get RouteBuilder() {
      return $__RouteBuilder__.RouteBuilder;
    },
    __esModule: true
  };
});
