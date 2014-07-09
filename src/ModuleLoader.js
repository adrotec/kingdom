import {Injector} from 'di';
import {Module} from './Module';

var moduleInjector = new Injector();

var isFunction = function(param){
  return param instanceof Function;
}

function _loadModule(module){
  // @TODO implement a better way to know if the class extends Module
  var dummyInstance;
  try {
      dummyInstance = new module();
  }
  catch(e){}
  if(dummyInstance instanceof Module){
      module = moduleInjector.get(module);
  }
  else {
      var injector = new Injector();
      module = injector.get(module);
  }
  return module;
}

export class ModuleLoader {
  static get injector(){
    return moduleInjector;
  }
  static loadModule(module) {
    var moduleId = module.__moduleId__;
    if (module.__esModule && module['default']) {
        module = module['default'];
        module.__moduleId__ = moduleId;
        if (isFunction(module)) {
            module = _loadModule(module);
            module.__moduleId__ = moduleId;
        }
        return module;
    }
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
