define(["assert", 'breeze', '../core/Deferred', 'breeze.sugar', 'breeze.koES5', 'jquery', './Storage'], function($__0,$__2,$__4,$__6,$__8,$__10,$__12) {
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
  var breeze = $__2.default;
  var Deferred = $__4.Deferred;
  var sugar = $__6.default;
  var koES5 = $__8.default;
  var $ = $__10.default;
  var Storage = $__12.Storage;
  breeze.config.initializeAdapterInstance('modelLibrary', 'koES5', true);
  var _queriesFetched = new Map();
  var $__19 = breeze,
      EntityManager = $__19.EntityManager,
      EntityQuery = $__19.EntityQuery,
      EntityState = $__19.EntityState,
      Predicate = $__19.Predicate,
      FetchStrategy = $__19.FetchStrategy;
  var DataService = function DataService(entityManager, storage) {
    assert.argumentTypes(entityManager, EntityManager, storage, Storage);
    this.entityManager = entityManager;
    this.storage = storage;
  };
  ($traceurRuntime.createClass)(DataService, {
    find: function() {
      var $__20;
      for (var params = [],
          $__16 = 0; $__16 < arguments.length; $__16++)
        params[$__16] = arguments[$__16];
      return ($__20 = this).findAll.apply($__20, $traceurRuntime.spread(params));
    },
    findAll: function(from) {
      var criteria = arguments[1] !== (void 0) ? arguments[1] : {};
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      var $__14 = this;
      var queryId = JSON.stringify({
        from: from,
        criteria: criteria,
        options: options
      });
      var query = sugar.createQuery(from, criteria, options);
      if (options.count) {
        query = query.inlineCount(true);
      }
      var localFirst = options.localFirst;
      if (options.expand && !_queriesFetched.get(queryId)) {
        localFirst = false;
      }
      _queriesFetched.set(queryId, true);
      var deferred = new Deferred();
      var findFromServer = true;
      if (localFirst !== false) {
        var results = this.getAll(from, criteria, options);
        if (results.length) {
          deferred.resolve(results);
          findFromServer = false;
        }
      }
      if (findFromServer) {
        this.findResultsByQuery(query, false, false, true).then((function(results) {
          if (localFirst === false) {
            deferred.resolve(results);
          } else {
            deferred.resolve($__14.getAll(from, criteria, options, results.count));
          }
        }), (function(error) {
          deferred.reject(error);
        }));
      }
      return deferred.promise;
    },
    findOne: function(from, criteria) {
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      options.limit = 1;
      var queryId = JSON.stringify({
        from: from,
        criteria: criteria,
        options: options
      });
      var queryIdOne = 'ONE:' + queryId;
      var query = sugar.createQuery(from, criteria, options);
      if (options.expand && (!_queriesFetched.get(queryId) || _queriesFetched.get(queryIdOne))) {
        options.localFirst = false;
      }
      _queriesFetched.set(queryIdOne, query);
      return this.findResultsByQuery(query, options.localFirst !== false, true, true);
    },
    getAll: function(from, criteria) {
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      var inlineCount = arguments[3] !== (void 0) ? arguments[3] : null;
      var queryId = JSON.stringify({
        from: from,
        criteria: criteria,
        options: options
      });
      var query = sugar.createQuery(from, criteria, options);
      var results = this.getResults(query, false);
      if (options.count) {
        var countOptions = {sort: options.sort};
        var countQuery = sugar.createQuery(from, criteria, countOptions);
        var allResults = this.getResults(countQuery, false);
        results.count = allResults.length;
        if (inlineCount > results.count) {
          results.count = inlineCount;
        }
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
      var $__20;
      for (var params = [],
          $__17 = 0; $__17 < arguments.length; $__17++)
        params[$__17] = arguments[$__17];
      return ($__20 = this).createEntity.apply($__20, $traceurRuntime.spread(params));
    },
    getResults: function(query) {
      var singleResult = arguments[1] !== (void 0) ? arguments[1] : false;
      assert.argumentTypes(query, EntityQuery, singleResult, $traceurRuntime.type.boolean);
      try {
        var results = this.entityManager.executeQueryLocally(query);
        return singleResult ? results[0] : results;
      } catch (e) {
        console.log(e);
        console.log(e.stack);
        return singleResult ? null : [];
      }
    },
    findResultsByQueryNEW: function(query) {
      var localFirst = arguments[1] !== (void 0) ? arguments[1] : true;
      var singleResult = arguments[2] !== (void 0) ? arguments[2] : false;
      var $__14 = this;
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
            executeServer.apply($__14);
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
    remove: function() {
      var $__20;
      for (var params = [],
          $__18 = 0; $__18 < arguments.length; $__18++)
        params[$__18] = arguments[$__18];
      return ($__20 = this).removeEntity.apply($__20, $traceurRuntime.spread(params));
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
  Object.defineProperty(DataService, "parameters", {get: function() {
      return [[EntityManager], [Storage]];
    }});
  Object.defineProperty(DataService.prototype.getResults, "parameters", {get: function() {
      return [[EntityQuery], [$traceurRuntime.type.boolean]];
    }});
  Object.defineProperty(DataService.prototype.findResultsByQueryNEW, "parameters", {get: function() {
      return [[EntityQuery], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean]];
    }});
  Object.defineProperty(DataService.prototype.findResultsByQuery, "parameters", {get: function() {
      return [[EntityQuery], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean], []];
    }});
  return {
    get DataService() {
      return DataService;
    },
    __esModule: true
  };
});
