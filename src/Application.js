import system from 'durandal/system';
import app from 'durandal/app';
import {ModuleLoader} from './ModuleLoader';
import {RouteBuilder} from './RouteBuilder';
import ko from 'knockout';
import koPunches from 'durandal-punches';

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
  bootstrap(){
    ko.punches.enableAll();
  }
  run(){
    this.init();
    this.bootstrap();
    return app.start().then(function() {
      app.setRoot(RouteBuilder.getRoutePrefix() + 'app', 'entrance');
    });
  }
}
