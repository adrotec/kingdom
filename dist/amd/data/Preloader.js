define(["assert", './DataService', 'prophecy', './Storage', '../util/Logger', 'plugins/router'], function($__0,$__1,$__2,$__3,$__4,$__5) {
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
  var assert = $traceurRuntime.assertObject($__0).assert;
  var DataService = $traceurRuntime.assertObject($__1).DataService;
  var Deferred = $traceurRuntime.assertObject($__2).Deferred;
  var Storage = $traceurRuntime.assertObject($__3).Storage;
  var Logger = $traceurRuntime.assertObject($__4).Logger;
  var router = $traceurRuntime.assertObject($__5).default;
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
      var $__6 = this;
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
              metadata = $__6.importMetadata(metadata);
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
      var $__6 = this;
      var deferred = new Deferred();
      this.ensureMetadata().then((function(metadata) {
        $__6.emitProgress({metadata: metadata});
        $__6.preloadEntities(entities).then((function() {
          deferred.resolve();
          if (shouldBlockUi) {
            $__6.unBlockUi();
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
      var $__6 = this;
      var deferred = new Deferred();
      var entityTypes = [];
      for (var i = 0; i < entities.length; i++) {
        var entityType = {
          resourceName: entities[$traceurRuntime.toProperty(i)].entityType || entities[$traceurRuntime.toProperty(i)],
          criteria: entities[$traceurRuntime.toProperty(i)].criteria || {},
          options: entities[$traceurRuntime.toProperty(i)].options || {}
        };
        entityTypes.push(entityType);
      }
      var fetched = {};
      function tryToResolve() {
        var allFetched = true;
        var fetchedEntityTypes = [];
        for (var $__8 = entityTypes[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__9; !($__9 = $__8.next()).done; ) {
          var entityType = $__9.value;
          {
            var resourceName = entityType.resourceName;
            allFetched = allFetched && fetched[$traceurRuntime.toProperty(resourceName)];
            if (fetched[$traceurRuntime.toProperty(resourceName)]) {
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
      for (var $__8 = entityTypes[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__9; !($__9 = $__8.next()).done; ) {
        var entityType = $__9.value;
        {
          try {
            throw undefined;
          } catch (resourceName) {
            resourceName = entityType.resourceName;
            var criteria = entityType.criteria;
            var options = entityType.options;
            if (!options.localFirst) {
              options.localFirst = false;
            }
            this.dataService.find(resourceName, criteria, options).then((function(data) {
              $__6.logger.log('PRELOAD: Fetched ' + resourceName);
              $traceurRuntime.setProperty(fetched, resourceName, true);
              tryToResolve.apply($__6);
            }), (function(error) {
              console.log('PRELOAD: NOT FETCHED ' + resourceName);
              console.error(error);
            }));
          }
        }
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
  Preloader.parameters = [[DataService], [Storage], [Logger]];
  return {
    get Preloader() {
      return Preloader;
    },
    __esModule: true
  };
});
