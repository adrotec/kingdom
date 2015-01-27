define(["assert", 'durandal/system', 'durandal/binder', 'durandal/app', './ModuleLoader', './RouteBuilder', 'knockout', './../security/Authenticator', '../ui/Widget'], function($__0,$__2,$__4,$__6,$__8,$__10,$__12,$__14,$__16) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  if (!$__8 || !$__8.__esModule)
    $__8 = {default: $__8};
  if (!$__10 || !$__10.__esModule)
    $__10 = {default: $__10};
  if (!$__12 || !$__12.__esModule)
    $__12 = {default: $__12};
  if (!$__14 || !$__14.__esModule)
    $__14 = {default: $__14};
  if (!$__16 || !$__16.__esModule)
    $__16 = {default: $__16};
  var assert = $__0.assert;
  var system = $__2.default;
  var binder = $__4.default;
  var app = $__6.default;
  var ModuleLoader = $__8.ModuleLoader;
  var RouteBuilder = $__10.RouteBuilder;
  var ko = $__12.default;
  var Authenticator = $__14.Authenticator;
  var Widget = $__16.Widget;
  var Application = function Application(authenticator) {
    assert.argumentTypes(authenticator, Authenticator);
    this.authenticator = authenticator;
    this.config = {};
    this._root = 'app';
  };
  ($traceurRuntime.createClass)(Application, {
    setRoot: function(root) {
      this._root = root;
    },
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
      var $__18 = this;
      this.init();
      this.bootstrap();
      return app.start().then((function() {
        ko.bindingHandlers.viewPort = ko.bindingHandlers.routerViewPort = ko.bindingHandlers.router;
        app.setRoot(RouteBuilder.getRoutePrefix() + $__18._root, $__18.config.transition || 'entrance');
      }));
    }
  }, {});
  Object.defineProperty(Application, "parameters", {get: function() {
      return [[Authenticator]];
    }});
  return {
    get Application() {
      return Application;
    },
    __esModule: true
  };
});
