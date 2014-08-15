import {Provide, Injector} from 'di';
import {Module} from './Module';

var moduleInjector = new Injector();

var _allModules = [];

var isFunction = function(param){
  return param instanceof Function;
}

function _loadModule(module){
  moduleInjector = moduleInjector.createChild(_allModules);
  module = moduleInjector.get(module);
  return module;
}

export class ModuleLoader { 

  static get injector(){
    return moduleInjector;
  }

  static registerProvider(Module, module){
    module.annotations = [
      new Provide(Module)
    ];
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
}
