define(["assert", 'breeze', 'prophecy', './Entity', './DataService'], function($__0,$__1,$__2,$__3,$__4) {
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
  var assert = $traceurRuntime.assertObject($__0).assert;
  var breeze = $traceurRuntime.assertObject($__1).default;
  var Deferred = $traceurRuntime.assertObject($__2).Deferred;
  var Entity = $traceurRuntime.assertObject($__3).Entity;
  var DataService = $traceurRuntime.assertObject($__4).DataService;
  var EntityManager = $traceurRuntime.assertObject(breeze).EntityManager;
  var _initializedEntityTypesMap = {};
  var EntityInitializer = function EntityInitializer(dataService) {
    assert.argumentTypes(dataService, DataService);
    this.dataService = dataService;
    this.entityManager = this.dataService.entityManager;
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
          var that = this;
          var initializer = function(entity) {
            if (entity.init) {
              entity.init.apply(entity, [that.dataService]);
            }
            entity.dataService = that.dataService;
            if (false) {
              for (var prop in entity) {
                if (typeof entity[$traceurRuntime.toProperty(prop)] === "function") {
                  var matches = prop.match(/(.+?)Computed$/);
                  if (matches) {
                    entity.defineProperty(matches[1], entity[$traceurRuntime.toProperty(prop)].bind(entity));
                  }
                }
              }
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
  EntityInitializer.parameters = [[DataService]];
  return {
    get EntityInitializer() {
      return EntityInitializer;
    },
    __esModule: true
  };
});
