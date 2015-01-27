define(['plugins/router', './RouteBuilder', 'knockout', 'durandal/app'], function($__0,$__2,$__4,$__6) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  var router = $__0.default;
  var RouteBuilder = $__2.RouteBuilder;
  var ko = $__4.default;
  var app = $__6.default;
  var cachedRouters = {};
  var Module = function Module() {};
  ($traceurRuntime.createClass)(Module, {
    showModal: function(moduleId, activationData) {
      var idSplit = moduleId.split('/');
      idSplit.push('' + idSplit[idSplit.length - 1]);
      var moduleIdReal = idSplit.join('/');
      moduleIdReal = this.__moduleBaseId__ + '/' + moduleIdReal;
      return app.showModal(moduleIdReal, activationData);
    },
    showDialog: function() {
      var $__12;
      for (var params = [],
          $__11 = 0; $__11 < arguments.length; $__11++)
        params[$__11] = arguments[$__11];
      return ($__12 = this).showModal.apply($__12, $traceurRuntime.spread(params));
    },
    get __moduleBaseId__() {
      var idSplit = this.__moduleId__.split('/');
      if (idSplit.length > 1 && idSplit[idSplit.length - 1] === idSplit[idSplit.length - 2]) {
        idSplit.pop();
      }
      var baseId = idSplit.join('/');
      return baseId;
    },
    canActivate: function() {
      this.registerRoutes();
      return true;
    },
    get navigation() {
      var navs = [];
      for (var $__9 = ko.unwrap(this.router.navigationModel)[Symbol.iterator](),
          $__10; !($__10 = $__9.next()).done; ) {
        var route = $__10.value;
        {
          route.href = route.hash;
          navs.push(route);
        }
      }
      return navs;
    },
    get title() {
      if (this.router.activeInstruction()) {
        return this.router.activeInstruction().config.title;
      }
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
      for (var $__9 = routes[Symbol.iterator](),
          $__10; !($__10 = $__9.next()).done; ) {
        var route = $__10.value;
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
        _router.map(this.buildRoutes(this.routes)).buildNavigationModel();
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
