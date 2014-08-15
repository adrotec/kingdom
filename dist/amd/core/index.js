define(['./Module', './ModuleLoader', './RouteBuilder', './Application', './Observer', './ConfigInterface'], function($__0,$__1,$__2,$__3,$__4,$__5) {
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
  if (!$__5 || !$__5.__esModule)
    $__5 = {'default': $__5};
  var $__Module__ = $__0;
  var $__ModuleLoader__ = $__1;
  var $__RouteBuilder__ = $__2;
  var $__Application__ = $__3;
  var $__Observer__ = $__4;
  var $__ConfigInterface__ = $__5;
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
    get Application() {
      return $__Application__.Application;
    },
    get Observer() {
      return $__Observer__.Observer;
    },
    get ConfigInterface() {
      return $__ConfigInterface__.ConfigInterface;
    },
    __esModule: true
  };
});
