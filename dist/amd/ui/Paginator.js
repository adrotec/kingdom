define(["assert", '../data/DataService', '../core/Observer', '../core/Deferred', 'di'], function($__0,$__2,$__4,$__6,$__8) {
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
  var assert = $__0.assert;
  var DataService = $__2.DataService;
  var Observer = $__4.Observer;
  var Deferred = $__6.Deferred;
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
      var $__10 = this;
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
      var deferred = new Deferred();
      this.dataService.findAll(this.entityType, this.criteria, options).then((function(results) {
        $__10.processResults(results, options);
        deferred.resolve();
      }), deferred.reject);
      this.options.localFirst = localFirstBackup;
      return deferred.promise;
    },
    processResults: function(results, options) {
      if (options.count) {
        this.totalResults = results.count || 0;
        this.totalPages = Math.ceil(this.totalResults / this.pageSize) || 1;
      }
      this.resultsFrom = (options.skip + 1);
      this.resultsUntil = this.resultsFrom + (this.pageSize - 1);
      if (this.resultsUntil > this.totalResults) {
        this.resultsUntil = this.totalResults;
      }
      console.log('Paginator', this);
      this.callback(results);
    },
    refresh: function() {
      var force = arguments[0] !== (void 0) ? arguments[0] : false;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      return this.fetchResults(force);
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
  Object.defineProperty(Paginator, "parameters", {get: function() {
      return [[DataService]];
    }});
  var $__9 = $__8,
      annotate = $__9.annotate,
      TransientScope = $__9.TransientScope;
  annotate(Paginator, new TransientScope);
  return {
    get Paginator() {
      return Paginator;
    },
    __esModule: true
  };
});
