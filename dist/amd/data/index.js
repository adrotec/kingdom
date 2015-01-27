define(['./Entity', './DataService', './EntityInitializer', './Preloader', './Storage'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {default: $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {default: $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var $__Entity__ = $__0;
  var $__DataService__ = $__1;
  var $__EntityInitializer__ = $__2;
  var $__Preloader__ = $__3;
  var $__Storage__ = $__4;
  return {
    get Entity() {
      return $__Entity__.Entity;
    },
    get DataService() {
      return $__DataService__.DataService;
    },
    get EntityInitializer() {
      return $__EntityInitializer__.EntityInitializer;
    },
    get Preloader() {
      return $__Preloader__.Preloader;
    },
    get Storage() {
      return $__Storage__.Storage;
    },
    __esModule: true
  };
});
