define(["assert", '../data/DataService', '../core/Observer', 'di'], function($__0,$__1,$__2,$__3) {
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
  var DataService = $traceurRuntime.assertObject($__1).DataService;
  var Observer = $traceurRuntime.assertObject($__2).Observer;
  var Paginator = function Paginator(dataService) {
    assert.argumentTypes(dataService, DataService);
    this.dataService = dataService;
    this.callback = (function() {});
    this.entityType = null;
    this.criteria = {};
    this.options = {};
    this.defaultCriteria = {};
    this.defaultOptions = {};
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = 1;
    this.totalResults = 0;
    this.resultsFrom = 1;
    this.resultsUntil = 1;
    Observer.observe(this, 'currentPage', 'refresh');
  };
  ($traceurRuntime.createClass)(Paginator, {
    fetchResults: function() {
      var forceRefresh = arguments[0] !== (void 0) ? arguments[0] : false;
      var $__4 = this;
      var options = this.options;
      options.skip = (this.currentPage - 1) * this.pageSize;
      options.count = true;
      options.limit = this.pageSize;
      var localFirstBackup = this.options.localFirst;
      if (forceRefresh) {
        options.localFirst = false;
      }
      if (!options.sort && this.defaultOptions.sort) {
        options.sort = this.defaultOptions.sort;
      }
      this.dataService.findAll(this.entityType, this.criteria, options).then((function(results) {
        if (options.count) {
          $__4.totalResults = results.count || 0;
          $__4.totalPages = Math.ceil($__4.totalResults / $__4.pageSize) || 1;
        }
        $__4.resultsFrom = (options.skip + 1);
        $__4.resultsUntil = $__4.resultsFrom + ($__4.pageSize - 1);
        if ($__4.resultsUntil > $__4.totalResults) {
          $__4.resultsUntil = $__4.totalResults;
        }
        console.log('Paginator', $__4);
        $__4.callback(results);
      }));
      this.options.localFirst = localFirstBackup;
    },
    refresh: function() {
      var force = arguments[0] !== (void 0) ? arguments[0] : false;
      var $__4 = this;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      window.setTimeout((function() {
        $__4.fetchResults(force);
      }), 1);
    },
    forceRefresh: function() {
      return this.refresh(true);
    },
    nextPage: function() {
      this.currentPage = this.currentPage + 1;
    },
    previousPage: function() {
      this.currentPage = this.currentPage - 1;
    },
    create: function(entityType) {
      var criteria = arguments[1] !== (void 0) ? arguments[1] : {};
      var options = arguments[2] !== (void 0) ? arguments[2] : {};
      var callback = arguments[3] !== (void 0) ? arguments[3] : (function() {});
      this.entityType = entityType;
      this.criteria = criteria;
      this.options = options;
      this.callback = callback;
      return this;
    },
    onChange: function(callback) {
      this.callback = callback;
      return this;
    },
    activate: function() {
      this.refresh();
    },
    paginate: function(entityType, criteria, options, results) {
      this.create(entityType, criteria, options);
      function callback(rslt) {
        results = rslt;
      }
      this.onChange(callback);
      this.activate();
    }
  }, {});
  Paginator.parameters = [[DataService]];
  var $__6 = $traceurRuntime.assertObject($__3),
      annotate = $__6.annotate,
      TransientScope = $__6.TransientScope;
  annotate(Paginator, new TransientScope);
  return {
    get Paginator() {
      return Paginator;
    },
    __esModule: true
  };
});
