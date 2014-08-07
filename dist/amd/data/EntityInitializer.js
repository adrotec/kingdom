define(["assert", 'breeze', 'prophecy', './Entity'], function($__0,$__1,$__2,$__3) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  var assert = $traceurRuntime.assertObject($__0).assert;
  var breeze = $traceurRuntime.assertObject($__1).default;
  var Deferred = $traceurRuntime.assertObject($__2).Deferred;
  var Entity = $traceurRuntime.assertObject($__3).Entity;
  var EntityManager = $traceurRuntime.assertObject(breeze).EntityManager;
  var _initializedEntityTypesMap = {};
  var EntityInitializer = function EntityInitializer(entityManager) {
    assert.argumentTypes(entityManager, EntityManager);
    this.entityManager = entityManager;
  };
  ($traceurRuntime.createClass)(EntityInitializer, {
    initialize: function(entityTypeName, ctor, initializer) {
      if (_initializedEntityTypesMap[$traceurRuntime.toProperty(entityTypeName)]) {
        return false;
      }
      $traceurRuntime.setProperty(_initializedEntityTypesMap, entityTypeName, true);
      return this.entityManager.metadataStore.registerEntityTypeCtor(entityTypeName, ctor, initializer);
    },
    ensureInitializers: function() {
      var initializers = arguments[0] !== (void 0) ? arguments[0] : {};
      var deferred = new Deferred();
      var entityTypes = this.entityManager.metadataStore.getEntityTypes();
      for (var i in entityTypes) {
        var shortName = entityTypes[$traceurRuntime.toProperty(i)].shortName;
        if (_initializedEntityTypesMap[$traceurRuntime.toProperty(shortName)]) {
          continue;
        }
        if (entityTypes.hasOwnProperty(i)) {
          var ctor = initializers[$traceurRuntime.toProperty(shortName)];
          if (!ctor) {
            ctor = new Function("return function " + shortName + "(){}")();
            ctor.prototype = new Entity();
          }
          var initializer = function(entity) {
            if (entity.init) {
              entity.init.apply(entity);
            }
          };
          this.initialize(shortName, ctor, initializer);
        }
      }
      window.setTimeout((function() {
        return deferred.resolve();
      }), 1);
      return deferred.promise;
    }
  }, {});
  EntityInitializer.parameters = [[EntityManager]];
  return {
    get EntityInitializer() {
      return EntityInitializer;
    },
    __esModule: true
  };
});
