define(['plugins/router', './RouteBuilder', 'knockout'], function($__0,$__1,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var router = $traceurRuntime.assertObject($__0).default;
  var RouteBuilder = $traceurRuntime.assertObject($__1).RouteBuilder;
  var ko = $traceurRuntime.assertObject($__2).default;
  var cachedRouters = {};
  var Module = function Module() {};
  ($traceurRuntime.createClass)(Module, {
    canActivate: function() {
      this.registerRoutes();
      return true;
    },
    get navigation() {
      var navs = [];
      for (var $__4 = ko.unwrap(this.router.navigationModel)[Symbol.iterator](),
          $__5; !($__5 = $__4.next()).done; ) {
        var route = $__5.value;
        {
          route.href = route.hash;
          navs.push(route);
        }
      }
      return navs;
    },
    get title() {
      return this.router.activeInstruction().config.title;
    },
    findRouter: function(baseId) {
      if (baseId) {
        var parentRouter;
        if (baseId.indexOf('/') !== -1) {
          var parentId = baseId.replace(/(.+)\/.+/, '$1');
          parentRouter = cachedRouters[parentId];
        }
        return (parentRouter || router).createChildRouter().makeRelative({
          moduleId: baseId,
          fromParent: true
        });
      }
      return router;
    },
    buildRoutes: function(routes) {
      var includeRoutePrefix = arguments[1] !== (void 0) ? arguments[1] : false;
      var preparedRoutes = [];
      for (var $__4 = routes[Symbol.iterator](),
          $__5; !($__5 = $__4.next()).done; ) {
        var route = $__5.value;
        {
          route = RouteBuilder.buildRouteConfig(route, includeRoutePrefix);
          preparedRoutes.push(route);
        }
      }
      return preparedRoutes;
    },
    registerRoutes: function() {
      var idSplit = this.__moduleId__.split('/');
      if (idSplit.length > 1 && idSplit[idSplit.length - 1] === idSplit[idSplit.length - 2]) {
        idSplit.pop();
      }
      var baseId = idSplit.join('/');
      var cacheId = baseId;
      var _router = cachedRouters[cacheId];
      if (!_router && this.routes) {
        _router = this.findRouter(baseId);
        _router.map(this.buildRoutes(this.routes, baseId)).buildNavigationModel();
        if (baseId) {
          cachedRouters[cacheId] = _router;
        }
      }
      this.router = _router;
    }
  }, {});
  var RootModule = function RootModule() {
    $traceurRuntime.defaultSuperCall(this, $RootModule.prototype, arguments);
  };
  var $RootModule = RootModule;
  ($traceurRuntime.createClass)(RootModule, {
    registerRoutes: function() {
      $traceurRuntime.superCall(this, $RootModule.prototype, "registerRoutes", []);
    },
    findRouter: function(baseId) {
      return $traceurRuntime.superCall(this, $RootModule.prototype, "findRouter", [false]);
    },
    buildRoutes: function(routes) {
      var includeRoutePrefix = arguments[1] !== (void 0) ? arguments[1] : true;
      return $traceurRuntime.superCall(this, $RootModule.prototype, "buildRoutes", [routes, includeRoutePrefix]);
    },
    activate: function() {
      return this.router.activate();
    }
  }, {}, Module);
  return {
    get Module() {
      return Module;
    },
    get RootModule() {
      return RootModule;
    },
    __esModule: true
  };
});
