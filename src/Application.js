import system from 'durandal/system';
import app from 'durandal/app';
import {ModuleLoader} from 'kingdom';

export class Application {
  constructor(config){
    this.config = config || {};
  }
  init(){
    system.debug(this.config.debug === true);
    system.resolveObject = ModuleLoader.loadModule;
    app.title = this.config.title || 'Kingdom Application';
    app.configurePlugins({
      router:true,
      dialog: true,
      observable: true,
    });
  }
  run(){
    this.init();
    return app.start().then(function() {
      app.setRoot('app', 'entrance');
    });
  }
}
