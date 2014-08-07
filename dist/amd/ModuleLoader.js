define(['di', './Module'], function($__0,$__1) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var $__3 = $traceurRuntime.assertObject($__0),
      Provide = $__3.Provide,
      Injector = $__3.Injector;
  var Module = $traceurRuntime.assertObject($__1).Module;
  var moduleInjector = new Injector();
  var _allModules = [];
  var isFunction = function(param) {
    return param instanceof Function;
  };
  function _loadModule(module) {
    moduleInjector = moduleInjector.createChild(_allModules);
    module = moduleInjector.get(module);
    return module;
  }
  var ModuleLoader = function ModuleLoader() {};
  var $ModuleLoader = ModuleLoader;
  ($traceurRuntime.createClass)(ModuleLoader, {}, {
    get injector() {
      return moduleInjector;
    },
    registerProvider: function(Module, module) {
      module.annotations = [new Provide(Module)];
      _allModules.push(module);
    },
    load: function(module) {
      return $ModuleLoader.loadModule(module);
    },
    setModuleId: function(obj, id) {
      if (obj.__esModule && obj[$traceurRuntime.toProperty('default')]) {
        if (typeof obj[$traceurRuntime.toProperty('default')] == 'function' && obj[$traceurRuntime.toProperty('default')].prototype) {
          obj[$traceurRuntime.toProperty('default')].prototype.__moduleId__ = id;
        } else {
          obj[$traceurRuntime.toProperty('default')].__moduleId__ = id;
        }
        return;
      }
      if (!obj) {
        return;
      }
      if (typeof obj == 'function' && obj.prototype) {
        obj.prototype.__moduleId__ = id;
        return;
      }
      if (typeof obj == 'string') {
        return;
      }
      obj.__moduleId__ = id;
    },
    loadModule: function(module) {
      var moduleId = module.__moduleId__;
      if (module.__esModule && module[$traceurRuntime.toProperty('default')]) {
        module = module[$traceurRuntime.toProperty('default')];
      }
      if (false) {} else {
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
