define(["assert", './DataService', '../core/Deferred', './Storage', '../util/Logger', 'plugins/router'], function($__0,$__2,$__4,$__6,$__8,$__10) {
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
  var assert = $__0.assert;
  var DataService = $__2.DataService;
  var Deferred = $__4.Deferred;
  var Storage = $__6.Storage;
  var Logger = $__8.Logger;
  var router = $__10.default;
  var STORAGE_METADATA = 'app.metadata';
  var _metadataFetched = false;
  var _routesGuarded = false;
  var _previousRouteGuard = null;
  var Preloader = function Preloader(dataService, storage, logger) {
    assert.argumentTypes(dataService, DataService, storage, Storage, logger, Logger);
    this.dataService = dataService;
    this.storage = storage;
    this.logger = logger;
  };
  ($traceurRuntime.createClass)(Preloader, {
    importMetadata: function(data) {
      var fromCache = arguments[1] !== (void 0) ? arguments[1] : false;
      var metadata = data;
      if (metadata) {
        try {
          if (!fromCache) {
            this.storage.set(STORAGE_METADATA, metadata);
          }
          this.dataService.entityManager.metadataStore.importMetadata(metadata);
          _metadataFetched = true;
          return metadata;
        } catch (e) {
          throw new Error('Metadata Import Failed: ' + e);
        }
      } else {
        throw new Error('Metadata Query Failed');
      }
    },
    ensureMetadata: function() {
      var localFirst = arguments[0] !== (void 0) ? arguments[0] : true;
      var $__12 = this;
      var deferred = new Deferred();
      if (_metadataFetched) {
        window.setTimeout((function() {
          return deferred.resolve();
        }), 1);
      } else {
        var data;
        if (localFirst) {
          data = this.storage.get(STORAGE_METADATA);
        }
        if (data) {
          try {
            var metadata = this.importMetadata(data, true);
            deferred.resolve(metadata);
          } catch (e) {
            this.logger.error('Metadata Import from Local Cache failed', e);
          }
        } else {
          this.dataService.entityManager.fetchMetadata().then((function(metadata) {
            try {
              metadata = $__12.importMetadata(metadata);
              deferred.resolve(metadata);
            } catch (e) {
              deferred.reject(e);
            }
          }));
        }
      }
      return deferred.promise;
    },
    onProgress: function(listener) {
      this.progressListener = listener;
    },
    emitProgress: function(progress) {
      if (this.progressListener) {
        this.progressListener(progress);
      }
    },
    preload: function() {
      var entities = arguments[0] !== (void 0) ? arguments[0] : [];
      var shouldBlockUi = arguments[1] !== (void 0) ? arguments[1] : false;
      var $__12 = this;
      var deferred = new Deferred();
      this.ensureMetadata().then((function(metadata) {
        $__12.emitProgress({metadata: metadata});
        $__12.preloadEntities(entities).then((function() {
          deferred.resolve();
          if (shouldBlockUi) {
            $__12.unBlockUi();
          }
        }));
      }));
      if (shouldBlockUi) {
        this.blockUi();
      }
      return deferred.promise;
    },
    preloadEntities: function() {
      var entities = arguments[0] !== (void 0) ? arguments[0] : [];
      var $__12 = this;
      var deferred = new Deferred();
      var entityTypes = [];
      for (var i = 0; i < entities.length; i++) {
        var entityType = {
          resourceName: entities[i].entityType || entities[i],
          criteria: entities[i].criteria || {},
          options: entities[i].options || {}
        };
        entityTypes.push(entityType);
      }
      var fetched = {};
      function tryToResolve() {
        var allFetched = true;
        var fetchedEntityTypes = [];
        for (var $__14 = entityTypes[Symbol.iterator](),
            $__15; !($__15 = $__14.next()).done; ) {
          var entityType = $__15.value;
          {
            var resourceName = entityType.resourceName;
            allFetched = allFetched && fetched[resourceName];
            if (fetched[resourceName]) {
              fetchedEntityTypes.push(entityType);
            }
          }
        }
        this.emitProgress({
          fetchedEntityTypes: fetchedEntityTypes,
          entityTypes: entityTypes
        });
        if (allFetched) {
          this.logger.log('PRELOAD: Fetched all');
          deferred.resolve();
        }
      }
      var entityType,
          criteria,
          options,
          $__16 = this,
          $__17 = function() {
            entityType = $__15.value;
            {
              var resourceName = entityType.resourceName;
              criteria = entityType.criteria;
              options = entityType.options;
              if (!options.localFirst) {
                options.localFirst = false;
              }
              $__16.dataService.find(resourceName, criteria, options).then((function(data) {
                $__12.logger.log('PRELOAD: Fetched ' + resourceName);
                fetched[resourceName] = true;
                tryToResolve.apply($__12);
              }), (function(error) {
                console.log('PRELOAD: NOT FETCHED ' + resourceName);
                console.error(error);
              }));
            }
          };
      for (var $__14 = entityTypes[Symbol.iterator](),
          $__15; !($__15 = $__14.next()).done; ) {
        $__17();
      }
      if (!entityTypes.length) {
        deferred.resolve();
      }
      return deferred.promise;
    },
    blockUi: function() {
      if (_routesGuarded) {
        return;
      }
      _previousRouteGuard = router.guardRoute;
      router.guardRoute = function(instance, instruction) {
        if (instruction.fragment == 'loading') {
          return true;
        }
        return false;
      };
      _routesGuarded = true;
    },
    unblockUi: function() {
      router.guardRoute = _previousRouteGuard;
    }
  }, {});
  Object.defineProperty(Preloader, "parameters", {get: function() {
      return [[DataService], [Storage], [Logger]];
    }});
  return {
    get Preloader() {
      return Preloader;
    },
    __esModule: true
  };
});
