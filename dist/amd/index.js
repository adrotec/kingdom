define(['./core/Module', './core/ModuleLoader', './core/RouteBuilder', './core/Application', './core/Observer', './core/ConfigInterface', './core/Filter', './security/AuthenticationProviderInterface', './security/Authenticator', './data/Entity', './data/DataService', './data/EntityInitializer', './data/Preloader', './data/Storage', './ui/MessageBox', './ui/Toast', './ui/Dialog', './ui/Widget'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9,$__10,$__11,$__12,$__13,$__14,$__15,$__16,$__17) {
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
  if (!$__12 || !$__12.__esModule)
    $__12 = {'default': $__12};
  if (!$__13 || !$__13.__esModule)
    $__13 = {'default': $__13};
  if (!$__14 || !$__14.__esModule)
    $__14 = {'default': $__14};
  if (!$__15 || !$__15.__esModule)
    $__15 = {'default': $__15};
  if (!$__16 || !$__16.__esModule)
    $__16 = {'default': $__16};
  if (!$__17 || !$__17.__esModule)
    $__17 = {'default': $__17};
  var $__core_47_Module__ = $__0;
  var $__core_47_ModuleLoader__ = $__1;
  var $__core_47_RouteBuilder__ = $__2;
  var $__core_47_Application__ = $__3;
  var $__core_47_Observer__ = $__4;
  var $__core_47_ConfigInterface__ = $__5;
  var $__core_47_Filter__ = $__6;
  var $__security_47_AuthenticationProviderInterface__ = $__7;
  var $__security_47_Authenticator__ = $__8;
  var $__data_47_Entity__ = $__9;
  var $__data_47_DataService__ = $__10;
  var $__data_47_EntityInitializer__ = $__11;
  var $__data_47_Preloader__ = $__12;
  var $__data_47_Storage__ = $__13;
  var $__ui_47_MessageBox__ = $__14;
  var $__ui_47_Toast__ = $__15;
  var $__ui_47_Dialog__ = $__16;
  var $__ui_47_Widget__ = $__17;
  return {
    get Module() {
      return $__core_47_Module__.Module;
    },
    get RootModule() {
      return $__core_47_Module__.RootModule;
    },
    get ModuleLoader() {
      return $__core_47_ModuleLoader__.ModuleLoader;
    },
    get RouteBuilder() {
      return $__core_47_RouteBuilder__.RouteBuilder;
    },
    get Application() {
      return $__core_47_Application__.Application;
    },
    get Observer() {
      return $__core_47_Observer__.Observer;
    },
    get ConfigInterface() {
      return $__core_47_ConfigInterface__.ConfigInterface;
    },
    get Filter() {
      return $__core_47_Filter__.Filter;
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
    get MessageBox() {
      return $__ui_47_MessageBox__.MessageBox;
    },
    get Toast() {
      return $__ui_47_Toast__.Toast;
    },
    get Dialog() {
      return $__ui_47_Dialog__.Dialog;
    },
    get Widget() {
      return $__ui_47_Widget__.Widget;
    },
    __esModule: true
  };
});
