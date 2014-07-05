import router from 'plugins/router';
import {RouteBuilder} from './RouteBuilder';
import ko from 'knockout';

var cachedRouters = {};

export class Module {

	canActivate(){
		this.registerRoutes();
		return true;
	}

  get navigation(){
      var navs = [];
      for(var route of ko.unwrap(this.router.navigationModel)){
          route.href = route.hash;
          navs.push(route);
      }
      return navs;
  }

  get title(){
      return this.router.activeInstruction().config.title;
  }

  findRouter(baseId){
    if(baseId){

      var parentRouter;

      if(baseId.indexOf('/') !== -1){
        var parentId = baseId.replace(/(.+)\/.+/, '$1');
        parentRouter = cachedRouters[parentId];
      }

      return (parentRouter || router).createChildRouter()
                  .makeRelative({
                    moduleId: baseId,
                    fromParent: true
                  });
    }

    return router;
  }

  buildRoutes(routes, includeRoutePrefix = false) {
    var preparedRoutes = [];
    for(var route of routes) {
      route = RouteBuilder.buildRouteConfig(route, includeRoutePrefix);
      preparedRoutes.push(route);
    }
    return preparedRoutes;
  }

  registerRoutes(){
    var idSplit = this.__moduleId__.split('/');
    if(idSplit.length > 1 && idSplit[idSplit.length - 1]
       === idSplit[idSplit.length - 2]){
      idSplit.pop();
    }
    var baseId = idSplit.join('/');
    var cacheId = baseId;
    var _router = cachedRouters[cacheId];
    if(!_router && this.routes){
      _router = this.findRouter(baseId);
      _router.map(this.buildRoutes(this.routes, baseId)).buildNavigationModel();
      if(baseId){
        cachedRouters[cacheId] = _router;
      }
    }
    this.router = _router;
  }
}

export class RootModule extends Module {

  registerRoutes(){
    super.registerRoutes();
  }

  findRouter(baseId){
    return super.findRouter(false);
  }

  buildRoutes(routes, includeRoutePrefix = true) {
    return super.buildRoutes(routes, includeRoutePrefix);
  }

  activate(){
    return this.router.activate();
  }

}
