define(["assert", 'knockout', 'breeze', '../core/Deferred', './Entity', './DataService', './Validator'], function($__0,$__2,$__4,$__6,$__8,$__10,$__12) {
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
  var assert = $__0.assert;
  var ko = $__2.default;
  var breeze = $__4.default;
  var Deferred = $__6.Deferred;
  var Entity = $__8.Entity;
  var DataService = $__10.DataService;
  var Validator = $__12.Validator;
  var EntityManager = breeze.EntityManager;
  var _initializedEntityTypesMap = {};
  var EntityInitializer = function EntityInitializer(dataService, validator) {
    assert.argumentTypes(dataService, DataService, validator, Validator);
    this.dataService = dataService;
    this.validator = validator;
    this.entityManager = this.dataService.entityManager;
  };
  ($traceurRuntime.createClass)(EntityInitializer, {
    initialize: function(entityTypeName, ctor, initializer) {
      if (_initializedEntityTypesMap[entityTypeName]) {
        return false;
      }
      _initializedEntityTypesMap[entityTypeName] = true;
      return this.entityManager.metadataStore.registerEntityTypeCtor(entityTypeName, ctor, initializer);
    },
    ensureInitializers: function() {
      var initializers = arguments[0] !== (void 0) ? arguments[0] : {};
      var deferred = new Deferred();
      var entityTypes = this.entityManager.metadataStore.getEntityTypes();
      for (var i in entityTypes) {
        var shortName = entityTypes[i].shortName;
        if (_initializedEntityTypesMap[shortName]) {
          continue;
        }
        if (entityTypes.hasOwnProperty(i)) {
          var ctor = initializers[shortName];
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
                if (typeof entity[prop] === "function") {
                  var matches = prop.match(/(.+?)Computed$/);
                  if (matches) {
                    entity.defineProperty(matches[1], entity[prop].bind(entity));
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
  Object.defineProperty(EntityInitializer, "parameters", {get: function() {
      return [[DataService], [Validator]];
    }});
  return {
    get EntityInitializer() {
      return EntityInitializer;
    },
    __esModule: true
  };
});
