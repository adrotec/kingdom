define(["assert", 'knockout', 'breeze', 'prophecy', './Entity', './DataService', './Validator'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6) {
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
  var assert = $traceurRuntime.assertObject($__0).assert;
  var ko = $traceurRuntime.assertObject($__1).default;
  var breeze = $traceurRuntime.assertObject($__2).default;
  var Deferred = $traceurRuntime.assertObject($__3).Deferred;
  var Entity = $traceurRuntime.assertObject($__4).Entity;
  var DataService = $traceurRuntime.assertObject($__5).DataService;
  var Validator = $traceurRuntime.assertObject($__6).Validator;
  var EntityManager = $traceurRuntime.assertObject(breeze).EntityManager;
  var _initializedEntityTypesMap = {};
  var EntityInitializer = function EntityInitializer(dataService, validator) {
    assert.argumentTypes(dataService, DataService, validator, Validator);
    this.dataService = dataService;
    this.validator = validator;
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
            that.validator.addValidationForEntity(entity);
            if (entity.init) {
              entity.init.apply(entity, [that.dataService]);
            }
            entity.dataService = that.dataService;
            entity.__validationErrors = ko.observableArray();
            entity.entityAspect.validationErrorsChanged.subscribe(function() {
              entity.__validationErrors(entity.entityAspect.getValidationErrors());
            });
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
  EntityInitializer.parameters = [[DataService], [Validator]];
  return {
    get EntityInitializer() {
      return EntityInitializer;
    },
    __esModule: true
  };
});
