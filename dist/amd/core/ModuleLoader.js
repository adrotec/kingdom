define(['di', './Module', '../ui/Widget', 'jquery'], function($__0,$__2,$__4,$__6) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  var $__1 = $__0,
      Provide = $__1.Provide,
      Injector = $__1.Injector,
      annotate = $__1.annotate,
      TransientScope = $__1.TransientScope;
  var Module = $__2.Module;
  var Widget = $__4.Widget;
  var $ = $__6.default;
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
    if (false && !objectOnly && moduleInstance instanceof Widget) {
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
      if (!obj) {
        return;
      }
      if (obj.__esModule && obj['default']) {
        if (typeof obj['default'] == 'function' && obj['default'].prototype) {
          obj['default'].prototype.__moduleId__ = id;
        } else {
          obj['default'].__moduleId__ = id;
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
      if (module.__esModule && module['default']) {
        module = module['default'];
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
