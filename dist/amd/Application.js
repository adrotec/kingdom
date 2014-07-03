define(['durandal/system', 'durandal/app', 'kingdom', 'knockout', 'durandal-punches'], function($__0,$__1,$__2,$__3,$__4) {
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
  var system = $traceurRuntime.assertObject($__0).default;
  var app = $traceurRuntime.assertObject($__1).default;
  var ModuleLoader = $traceurRuntime.assertObject($__2).ModuleLoader;
  var ko = $traceurRuntime.assertObject($__3).default;
  var koPunches = $traceurRuntime.assertObject($__4).default;
  var Application = function Application(config) {
    this.config = config || {};
  };
  ($traceurRuntime.createClass)(Application, {
    init: function() {
      system.debug(this.config.debug === true);
      system.resolveObject = ModuleLoader.loadModule;
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
        app.setRoot('app', 'entrance');
      });
    }
  }, {});
  return {
    get Application() {
      return Application;
    },
    __esModule: true
  };
});
