define(['plugins/router', './RouteBuilder', 'knockout', 'durandal/app'], function($__0,$__1,$__2,$__3) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  var router = $traceurRuntime.assertObject($__0).default;
  var RouteBuilder = $traceurRuntime.assertObject($__1).RouteBuilder;
  var ko = $traceurRuntime.assertObject($__2).default;
  var app = $traceurRuntime.assertObject($__3).default;
  var cachedRouters = {};
  var Module = function Module() {};
  ($traceurRuntime.createClass)(Module, {
    showModal: function(moduleId, activationData) {
      var idSplit = moduleId.split('/');
      idSplit.push('' + idSplit[$traceurRuntime.toProperty(idSplit.length - 1)]);
      var moduleIdReal = idSplit.join('/');
      moduleIdReal = this.__moduleBaseId__ + '/' + moduleIdReal;
      return app.showModal(moduleIdReal, activationData);
    },
    showDialog: function() {
      var $__9;
      for (var params = [],
          $__7 = 0; $__7 < arguments.length; $__7++)
        $traceurRuntime.setProperty(params, $__7, arguments[$traceurRuntime.toProperty($__7)]);
      return ($__9 = this).showModal.apply($__9, $traceurRuntime.toObject(params));
    },
    get __moduleBaseId__() {
      var idSplit = this.__moduleId__.split('/');
      if (idSplit.length > 1 && idSplit[$traceurRuntime.toProperty(idSplit.length - 1)] === idSplit[$traceurRuntime.toProperty(idSplit.length - 2)]) {
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
      for (var $__5 = ko.unwrap(this.router.navigationModel)[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__6; !($__6 = $__5.next()).done; ) {
        var route = $__6.value;
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
          parentRouter = cachedRouters[$traceurRuntime.toProperty(parentId)];
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
      for (var $__5 = routes[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__6; !($__6 = $__5.next()).done; ) {
        var route = $__6.value;
        {
          route = RouteBuilder.buildRouteConfig(route, includeRoutePrefix);
          preparedRoutes.push(route);
        }
      }
      return preparedRoutes;
    },
    registerRoutes: function() {
      var idSplit = this.__moduleId__.split('/');
      if (idSplit.length > 1 && idSplit[$traceurRuntime.toProperty(idSplit.length - 1)] === idSplit[$traceurRuntime.toProperty(idSplit.length - 2)]) {
        idSplit.pop();
      }
      var baseId = idSplit.join('/');
      var cacheId = baseId;
      var _router = cachedRouters[$traceurRuntime.toProperty(cacheId)];
      if (!_router && this.routes) {
        _router = this.findRouter(baseId);
        _router.map(this.buildRoutes(this.routes)).buildNavigationModel();
        if (baseId) {
          $traceurRuntime.setProperty(cachedRouters, cacheId, _router);
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
