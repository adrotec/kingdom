import {Provide, Injector, annotate, TransientScope} from 'di';
import {Module} from './Module';
import {Widget} from '../ui/Widget';
import $ from 'jquery';

var moduleInjector = new Injector();
var widgetInjector = new Injector();
var widgetsCache = new Map();

var _allModules = [];

var isFunction = function(param){
  return param instanceof Function;
}

function _loadModule(module, objectOnly = false){
  moduleInjector = moduleInjector.createChild(_allModules);
  var moduleInstance = moduleInjector.get(module);
  if(!objectOnly && moduleInstance instanceof Widget){
//    if(widgetsCache.has(module)){
//      return widgetsCache.get(module);
//    }
    var newInstance = $.extend(true, {}, moduleInstance);
//    widgetsCache.set(module, newInstance);
    return newInstance;
//    annotate(module, new TransientScope);
    return moduleInjector.get(module);
    if(moduleInjector.providers.has(module)){
      var provider = moduleInjector.providers.get(module);
      var args = provider.params.map((param) => {
        return moduleInjector.get(param.token);
      });
      return provider.create(args);
    }
  }
  return moduleInstance;
}

export class ModuleLoader { 

  static get injector(){
    return moduleInjector;
  }

  static registerProvider(Module, module){
//    module.annotations = [
//      new Provide(Module)
//    ];
    annotate(module, new Provide(Module));
    _allModules.push(module);
  }

  static load(module){
    return ModuleLoader.loadModule(module);
  }

  static setModuleId(obj, id) {
    if (obj.__esModule && obj['default']) {
      if (typeof obj['default'] == 'function' && obj['default'].prototype) {
        obj['default'].prototype.__moduleId__ = id;
      }
      else {
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
  }

  static loadModule(module) {
    var moduleId = module.__moduleId__;
    if (module.__esModule && module['default']) {
        module = module['default'];
        // module.__moduleId__ = moduleId;
        // if (isFunction(module)) {
        //     module = _loadModule(module);
        //     module.__moduleId__ = moduleId;
        // }
        // return module;
    }
    if(false){}
    else {
        if (isFunction(module)) {
          module = _loadModule(module);
          return module;
        } else {
            return module;
        }
    }
  }
  static loadObject(obj) {
    if(isFunction(obj)){
      obj = _loadModule(obj, true);
    }
    return obj;
  }

}
