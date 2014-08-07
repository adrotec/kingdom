define(['./Module', './ModuleLoader', './RouteBuilder', './Application', './security/AuthenticationProviderInterface', './security/Authenticator', './data/Entity', './data/DataService', './data/EntityInitializer', './data/Preloader', './data/Storage', './ui/Dialog'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9,$__10,$__11) {
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
  if (!$__10 || !$__10.__esModule)
    $__10 = {'default': $__10};
  if (!$__11 || !$__11.__esModule)
    $__11 = {'default': $__11};
  var $__Module__ = $__0;
  var $__ModuleLoader__ = $__1;
  var $__RouteBuilder__ = $__2;
  var $__Application__ = $__3;
  var $__security_47_AuthenticationProviderInterface__ = $__4;
  var $__security_47_Authenticator__ = $__5;
  var $__data_47_Entity__ = $__6;
  var $__data_47_DataService__ = $__7;
  var $__data_47_EntityInitializer__ = $__8;
  var $__data_47_Preloader__ = $__9;
  var $__data_47_Storage__ = $__10;
  var $__ui_47_Dialog__ = $__11;
  return {
    get Module() {
      return $__Module__.Module;
    },
    get RootModule() {
      return $__Module__.RootModule;
    },
    get ModuleLoader() {
      return $__ModuleLoader__.ModuleLoader;
    },
    get RouteBuilder() {
      return $__RouteBuilder__.RouteBuilder;
    },
    get Application() {
      return $__Application__.Application;
    },
    get AuthenticationProviderInterface() {
      return $__security_47_AuthenticationProviderInterface__.AuthenticationProviderInterface;
    },
    get Authenticator() {
      return $__security_47_Authenticator__.Authenticator;
    },
    get Entity() {
      return $__data_47_Entity__.Entity;
    },
    get DataService() {
      return $__data_47_DataService__.DataService;
    },
    get EntityInitializer() {
      return $__data_47_EntityInitializer__.EntityInitializer;
    },
    get Preloader() {
      return $__data_47_Preloader__.Preloader;
    },
    get Storage() {
      return $__data_47_Storage__.Storage;
    },
    get Dialog() {
      return $__ui_47_Dialog__.Dialog;
    },
    __esModule: true
  };
});
