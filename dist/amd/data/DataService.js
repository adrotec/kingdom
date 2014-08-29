define(["assert", 'breeze', 'prophecy', 'breeze-sugar', 'breeze.koES5', 'jquery', './Storage'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6) {
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
  var breeze = $traceurRuntime.assertObject($__1).default;
  var Deferred = $traceurRuntime.assertObject($__2).Deferred;
  var sugar = $traceurRuntime.assertObject($__3).default;
  var koES5 = $traceurRuntime.assertObject($__4).default;
  var $ = $traceurRuntime.assertObject($__5).default;
  var Storage = $traceurRuntime.assertObject($__6).Storage;
  breeze.config.initializeAdapterInstance('modelLibrary', 'koES5', true);
  var _queriesFetched = new Map();
  var $__11 = $traceurRuntime.assertObject(breeze),
      EntityManager = $__11.EntityManager,
      EntityQuery = $__11.EntityQuery,
      EntityState = $__11.EntityState,
      Predicate = $__11.Predicate,
      FetchStrategy = $__11.FetchStrategy;
  var DataService = function DataService(entityManager, storage) {
    assert.argumentTypes(entityManager, EntityManager, storage, Storage);
    this.entityManager = entityManager;
    this.storage = storage;
  };
  ($traceurRuntime.createClass)(DataService, {
    find: function() {
      var $__12;
      for (var params = [],
          $__9 = 0; $__9 < arguments.length; $__9++)
        $traceurRuntime.setProperty(params, $__9, arguments[$traceurRuntime.toProperty($__9)]);
      return ($__12 = this).findAll.apply($__12, $traceurRuntime.toObject(params));
    },
    findAll: function(from, criteria) {
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      var queryId = JSON.stringify({
        from: from,
        criteria: criteria,
        options: options
      });
      var query = sugar.createQuery(from, criteria, options);
      if (options.count) {
        query = query.inlineCount(true);
      }
      if (options.expand && !_queriesFetched.get(queryId)) {
        options.localFirst = false;
      }
      _queriesFetched.set(queryId, query);
      return this.findResultsByQuery(query, options.localFirst !== false, false, true);
    },
    findOne: function(from, criteria) {
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      options.limit = 1;
      var queryId = JSON.stringify({
        from: from,
        criteria: criteria,
        options: options
      });
      var query = sugar.createQuery(from, criteria, options);
      if (options.expand && !_queriesFetched.get(queryId)) {
        options.localFirst = false;
      }
      _queriesFetched.set(queryId, query);
      return this.findResultsByQuery(query, options.localFirst !== false, true, true);
    },
    getAll: function(from, criteria) {
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      var query = sugar.createQuery(from, criteria, options);
      var results = this.getResults(query, false);
      if (options.count) {
        var countOptions = {sort: options.sort};
        var countQuery = sugar.createQuery(from, criteria, countOptions);
        var allResults = this.getResults(countQuery, false);
        results.count = allResults.length;
      }
      return results;
    },
    getOne: function(from, criteria) {
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      options.limit = 1;
      var query = sugar.createQuery(from, criteria, options);
      return this.getResults(query, true);
    },
    createEntity: function(entityTypeName, data) {
      return this.entityManager.createEntity(entityTypeName, data);
    },
    create: function() {
      var $__12;
      for (var params = [],
          $__10 = 0; $__10 < arguments.length; $__10++)
        $traceurRuntime.setProperty(params, $__10, arguments[$traceurRuntime.toProperty($__10)]);
      return ($__12 = this).createEntity.apply($__12, $traceurRuntime.toObject(params));
    },
    getResults: function(query) {
      var singleResult = arguments[1] !== (void 0) ? arguments[1] : false;
      assert.argumentTypes(query, EntityQuery, singleResult, $traceurRuntime.type.boolean);
      var results = this.entityManager.executeQueryLocally(query);
      return singleResult ? results[0] : results;
    },
    findResultsByQueryNEW: function(query) {
      var localFirst = arguments[1] !== (void 0) ? arguments[1] : true;
      var singleResult = arguments[2] !== (void 0) ? arguments[2] : false;
      var $__7 = this;
      assert.argumentTypes(query, EntityQuery, localFirst, $traceurRuntime.type.boolean, singleResult, $traceurRuntime.type.boolean);
      var deferred = new Deferred();
      var executeServer = function() {
        this.entityManager.executeQuery(query).then(function(data) {
          deferred.resolve(singleResult ? data.results[0] : data.results);
        }, function(error) {
          deferred.reject(error);
        });
      };
      if (localFirst) {
        query.using(FetchStrategy.FromLocalCache).using(this.entityManager.original).execute().then((function(data) {
          if (data.results.length) {
            deferred.resolve(singleResult ? data.results[0] : data.results);
          } else {
            executeServer.apply($__7);
          }
        }), (function(error) {
          deferred.reject(error);
        }));
      } else {
        executeServer.apply(this);
      }
      return assert.returnType((deferred.promise), Promise);
    },
    findResultsByQuery: function(query) {
      var localFirst = arguments[1] !== (void 0) ? arguments[1] : true;
      var singleResult = arguments[2] !== (void 0) ? arguments[2] : false;
      var resultsOnly = arguments[3] !== (void 0) ? arguments[3] : true;
      assert.argumentTypes(query, EntityQuery, localFirst, $traceurRuntime.type.boolean, singleResult, $traceurRuntime.type.boolean, resultsOnly, $traceurRuntime.type.any);
      var deferred = new Deferred();
      var results = [];
      if (localFirst) {
        results = this.getResults(query, singleResult) || [];
        if (results.length) {
          deferred.resolve(resultsOnly ? results : {results: results});
        }
      }
      if (!localFirst || !results.length) {
        this.entityManager.executeQuery(query).then(function(data) {
          if (data.inlineCount) {
            data.results.count = data.inlineCount;
          }
          deferred.resolve(singleResult ? data.results[0] : (resultsOnly ? data.results : data));
        }, function(error) {
          deferred.reject(error);
        });
      }
      return assert.returnType((deferred.promise), Promise);
    },
    getEntityByCode: function(entityTypeName, code) {
      var query = new EntityQuery().from(entityTypeName).where('code', '==', code);
      var results = this.entityManager.executeQueryLocally(query);
      var entity;
      if (results.length) {
        entity = results[0];
      } else {
        var name = code;
        entity = this.entityManager.createEntity(entityTypeName, {
          code: code,
          name: name
        });
      }
      return entity;
    },
    removeEntity: function(entity) {
      if (entity.entityAspect) {
        entity.entityAspect.setDeleted();
      }
    },
    saveChanges: function(entities) {
      if (entities) {
        var deletedEntities = this.entityManager.getEntities(null, EntityState.Deleted);
        entities = entities.concat(deletedEntities);
        return this.entityManager.saveChanges(entities);
      } else {
        return this.entityManager.saveChanges();
      }
    },
    saveEntities: function(entities) {
      return this.saveChanges(entities);
    }
  }, {});
  DataService.parameters = [[EntityManager], [Storage]];
  DataService.prototype.getResults.parameters = [[EntityQuery], [$traceurRuntime.type.boolean]];
  DataService.prototype.findResultsByQueryNEW.parameters = [[EntityQuery], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean]];
  DataService.prototype.findResultsByQuery.parameters = [[EntityQuery], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean], []];
  return {
    get DataService() {
      return DataService;
    },
    __esModule: true
  };
});
