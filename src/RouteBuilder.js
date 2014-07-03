var routePrefix = 'app/';

export class RouteBuilder {

  static getRoutePrefix(){
    return routePrefix;
  }

  static setRoutePrefix(prefix){
    routePrefix = prefix;
  }

  static buildRouteConfig(route){
    if(typeof route === "string"){
      route = {route: route};
    }
    if(typeof route.pattern !== "undefined"){
      route.route = route.pattern;
      delete route.pattern;
    }
    //		if(typeof route.controller !== "undefined"){
    //			route.moduleId = route.controller;
    //			delete route.controller;
    //		}
    if(!route.moduleId){
      route.moduleId = route.route;
    }
    if(route.moduleId.indexOf(':') !== -1){
      route.moduleId = route.moduleId.split(':')[0];
    }
    if(route.moduleId.indexOf('/') !== -1){
      route.moduleId = route.moduleId.replace(/\//g, '');
    }
    if(!route.moduleId){
      throw new Error('"moduleId" not set for route: "' + route.route + '"');
    }
    route.moduleId = route.moduleId.replace('*details', '');
    route.moduleId = route.moduleId + '/' + route.moduleId;
    if(routePrefix){
      route.moduleId = routePrefix + route.moduleId;
    }

    return route;
  }
}
