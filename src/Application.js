import system from 'durandal/system';
import app from 'durandal/app';
import {ModuleLoader} from './ModuleLoader';
import {RouteBuilder} from './RouteBuilder';
import ko from 'knockout';
import koPunches from 'durandal-punches';
import {Authenticator} from './security/Authenticator';

export class Application {

  constructor(authenticator: Authenticator){
    this.authenticator = authenticator;
    this.config = {};
  }

  enableAuthentication(){
    this.authenticator.guardRoutes();
  }

  init(){
    system.debug(this.config.debug === true);
    system.resolveObject = ModuleLoader.load;
    system.setModuleId = ModuleLoader.setModuleId;
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
