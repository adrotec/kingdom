define([], function() {
  "use strict";
  var RouteBuilder = function RouteBuilder() {};
  ($traceurRuntime.createClass)(RouteBuilder, {}, {buildRouteConfig: function(route) {
      if (typeof route === "string") {
        route = {route: route};
      }
      if (typeof route.pattern !== "undefined") {
        route.route = route.pattern;
        delete route.pattern;
      }
      if (!route.moduleId) {
        route.moduleId = route.route;
      }
      if (route.moduleId.indexOf(':') !== -1) {
        route.moduleId = route.moduleId.split(':')[0];
      }
      if (route.moduleId.indexOf('/') !== -1) {
        route.moduleId = route.moduleId.replace(/\//g, '');
      }
      if (!route.moduleId) {
        throw new Error('"moduleId" not set for route: "' + route.route + '"');
      }
      route.moduleId = route.moduleId.replace('*details', '');
      route.moduleId = route.moduleId + '/' + route.moduleId;
      return route;
    }});
  return {
    get RouteBuilder() {
      return RouteBuilder;
    },
    __esModule: true
  };
});
