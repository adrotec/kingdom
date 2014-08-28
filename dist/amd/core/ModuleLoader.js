define(['di', './Module', '../ui/Widget', 'jquery'], function($__0,$__1,$__2,$__3) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  var $__5 = $traceurRuntime.assertObject($__0),
      Provide = $__5.Provide,
      Injector = $__5.Injector,
      annotate = $__5.annotate,
      TransientScope = $__5.TransientScope;
  var Module = $traceurRuntime.assertObject($__1).Module;
  var Widget = $traceurRuntime.assertObject($__2).Widget;
  var $ = $traceurRuntime.assertObject($__3).default;
  var moduleInjector = new Injector();
  var widgetInjector = new Injector();
  var widgetsCache = new Map();
  var _allModules = [];
  var isFunction = function(param) {
    return param instanceof Function;
  };
  function _loadModule(module) {
    var objectOnly = arguments[1] !== (void 0) ? arguments[1] : false;
    moduleInjector = moduleInjector.createChild(_allModules);
    var moduleInstance = moduleInjector.get(module);
    if (!objectOnly && moduleInstance instanceof Widget) {
      var newInstance = $.extend(true, {}, moduleInstance);
      return newInstance;
      return moduleInjector.get(module);
      if (moduleInjector.providers.has(module)) {
        var provider = moduleInjector.providers.get(module);
        var args = provider.params.map((function(param) {
          return moduleInjector.get(param.token);
        }));
        return provider.create(args);
      }
    }
    return moduleInstance;
  }
  var ModuleLoader = function ModuleLoader() {};
  var $ModuleLoader = ModuleLoader;
  ($traceurRuntime.createClass)(ModuleLoader, {}, {
    get injector() {
      return moduleInjector;
    },
    registerProvider: function(Module, module) {
      annotate(module, new Provide(Module));
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
    },
    loadObject: function(obj) {
      if (isFunction(obj)) {
        obj = _loadModule(obj, true);
      }
      return obj;
    }
  });
  return {
    get ModuleLoader() {
      return ModuleLoader;
    },
    __esModule: true
  };
});
