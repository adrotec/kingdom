define(["assert", 'durandal/system', 'durandal/binder', 'durandal/app', './ModuleLoader', './RouteBuilder', 'knockout', 'kingdom-punches', './../security/Authenticator', '../ui/Widget'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {'default': $__5};
  if (!$__6 || !$__6.__esModule)
    $__6 = {'default': $__6};
  if (!$__7 || !$__7.__esModule)
    $__7 = {'default': $__7};
  if (!$__8 || !$__8.__esModule)
    $__8 = {'default': $__8};
  if (!$__9 || !$__9.__esModule)
    $__9 = {'default': $__9};
  var assert = $traceurRuntime.assertObject($__0).assert;
  var system = $traceurRuntime.assertObject($__1).default;
  var binder = $traceurRuntime.assertObject($__2).default;
  var app = $traceurRuntime.assertObject($__3).default;
  var ModuleLoader = $traceurRuntime.assertObject($__4).ModuleLoader;
  var RouteBuilder = $traceurRuntime.assertObject($__5).RouteBuilder;
  var ko = $traceurRuntime.assertObject($__6).default;
  var koPunches = $traceurRuntime.assertObject($__7).default;
  var Authenticator = $traceurRuntime.assertObject($__8).Authenticator;
  var Widget = $traceurRuntime.assertObject($__9).Widget;
  var Application = function Application(authenticator) {
    assert.argumentTypes(authenticator, Authenticator);
    this.authenticator = authenticator;
    this.config = {};
  };
  ($traceurRuntime.createClass)(Application, {
    enableAuthentication: function() {
      this.authenticator.guardRoutes();
    },
    init: function() {
      system.debug(this.config.debug === true);
      system.resolveObject = ModuleLoader.load;
      system.setModuleId = ModuleLoader.setModuleId;
      var originalBindContext = binder.bindContext;
      binder.bindContextx = function(bindingContext, view, obj, dataAlias) {
        if (obj instanceof Widget) {
          obj = ModuleLoader.load(obj.constructor);
        }
        return originalBindContext(bindingContext, view, obj, dataAlias);
      };
      app.title = this.config.title || 'Kingdom Application';
      app.configurePlugins({
        router: true,
        dialog: true,
        observable: true
      });
    },
    bootstrap: function() {
      ko.punches.enableAll();
    },
    run: function() {
      this.init();
      this.bootstrap();
      return app.start().then(function() {
        ko.bindingHandlers.viewPort = ko.bindingHandlers.routerViewPort = ko.bindingHandlers.router;
        app.setRoot(RouteBuilder.getRoutePrefix() + 'app', 'entrance');
      });
    }
  }, {});
  Application.parameters = [[Authenticator]];
  return {
    get Application() {
      return Application;
    },
    __esModule: true
  };
});
