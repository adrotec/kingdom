define(['di', './Module'], function($__0,$__1) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var Injector = $traceurRuntime.assertObject($__0).Injector;
  var Module = $traceurRuntime.assertObject($__1).Module;
  var moduleInjector = new Injector();
  var isFunction = function(param) {
    return param instanceof Function;
  };
  function _loadModule(module) {
    var dummyInstance;
    try {
      dummyInstance = new module();
    } catch (e) {}
    if (dummyInstance instanceof Module) {
      module = moduleInjector.get(module);
    } else {
      var injector = new Injector();
      module = injector.get(module);
    }
    return module;
  }
  var ModuleLoader = function ModuleLoader() {};
  ($traceurRuntime.createClass)(ModuleLoader, {}, {
    get injector() {
      return moduleInjector;
    },
    loadModule: function(module) {
      var moduleId = module.__moduleId__;
      if (module.__esModule && module['default']) {
        module = module['default'];
        module.__moduleId__ = moduleId;
        if (isFunction(module)) {
          module = _loadModule(module);
          module.__moduleId__ = moduleId;
        }
        return module;
      } else {
        if (isFunction(module)) {
          module = _loadModule(module);
          return module;
        } else {
          return module;
        }
      }
    }
  });
  return {
    get ModuleLoader() {
      return ModuleLoader;
    },
    __esModule: true
  };
});
