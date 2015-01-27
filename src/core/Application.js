import system from 'durandal/system';
import binder from 'durandal/binder';
import app from 'durandal/app';
import {ModuleLoader} from './ModuleLoader';
import {RouteBuilder} from './RouteBuilder';
import ko from 'knockout';
//import koPunches from 'kingdom-punches';
import {Authenticator} from './../security/Authenticator';
import {Widget} from '../ui/Widget';

export class Application {

  constructor(authenticator: Authenticator){
    this.authenticator = authenticator;
    this.config = {};
    this._root = 'app';
  }
  
  setRoot(root){
    this._root = root;
  }

  enableAuthentication(){ 
    this.authenticator.guardRoutes();
  }

  init(){
    system.debug(this.config.debug === true);
    system.resolveObject = ModuleLoader.load;
    system.setModuleId = ModuleLoader.setModuleId;
    var originalBindContext = binder.bindContext;
    binder.bindContextx = function(bindingContext, view, obj, dataAlias){
//      obj = ModuleLoader.loadObject(obj);
      if(obj instanceof Widget){
        obj = ModuleLoader.load(obj.constructor);
      }
      return originalBindContext(bindingContext, view, obj, dataAlias);
    }
    app.title = this.config.title || 'Kingdom Application';
    app.configurePlugins({
      router:true,
      dialog: true,
      observable: true,
    });
  }
  bootstrap(){
    ko.punches.enableAll();
  }
  run(){
    this.init();
    this.bootstrap();
    return app.start().then(()=> {
      ko.bindingHandlers.viewPort = ko.bindingHandlers.routerViewPort = ko.bindingHandlers.router;
      app.setRoot(RouteBuilder.getRoutePrefix() + this._root, this.config.transition || 'entrance');
    });
  }
}
