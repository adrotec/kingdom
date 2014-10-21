import {DataService} from '../data/DataService';
import {Observer} from '../core/Observer';

export class Paginator {

  constructor(dataService: DataService){
    this.dataService = dataService;
    this.callback = ()=> {};
    this.entityType = null;
    this.criteria = {};
    this.options = {};
    this.defaultCriteria = {};
    this.defaultOptions = {};
    //
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = 1;
    this.totalResults = 0;
    this.resultsFrom = 1;
    this.resultsUntil = 1;
    Observer.observe(this, 'currentPage', 'refresh');
  }

  fetchResults(forceRefresh = false){
    var options = this.options;
    options.skip = (this.currentPage - 1) * this.pageSize;
    options.count = true;//!this.totalResults;
    options.limit = this.pageSize;
//    options.localFirst = false;
    var localFirstBackup = this.options.localFirst;
    if(forceRefresh){
      options.localFirst = false;
    }
    if(!options.sort && this.defaultOptions.sort){
      options.sort = this.defaultOptions.sort;
    }
    this.dataService.findAll(this.entityType, this.criteria, options).then((results)=> {
      if(options.count){
        this.totalResults = results.count || 0;
        this.totalPages = Math.ceil(this.totalResults/this.pageSize) || 1;
      }
      this.resultsFrom = (options.skip + 1);
      this.resultsUntil = this.resultsFrom + (this.pageSize - 1);
      if(this.resultsUntil > this.totalResults){
        this.resultsUntil = this.totalResults;
      }
      console.log('Paginator', this);
      this.callback(results);
    });
    this.options.localFirst = localFirstBackup;
  }

  refresh(force = false){
    if(this.currentPage < 1){
      this.currentPage = 1;
    }
    if(this.currentPage > this.totalPages){
      this.currentPage = this.totalPages;
    }
    window.setTimeout(()=> {
      this.fetchResults(force);
    }, 1);
  }
  
  forceRefresh(){
    return this.refresh(true);
  }

  nextPage(){
    this.currentPage = this.currentPage + 1;
//    this.refresh();
  }

  previousPage(){
    this.currentPage = this.currentPage - 1;
//    this.refresh();
  }

  create(entityType, criteria = {}, options = {}, callback = ()=> {}){
    this.entityType = entityType;
    this.criteria = criteria;
    this.options = options;
    this.callback = callback;
    return this;
  }

  onChange(callback){
    this.callback = callback;
    return this;
  }

  activate(){
    this.refresh();
  }
  
  paginate(entityType, criteria, options, results){
    this.create(entityType, criteria, options);
    function callback(rslt){
//      alert(rslt.length + ': ' + results);
//      results.push(rslt[0]);
      results = rslt;
    }
    this.onChange(callback);
    this.activate();
  }

}


import {annotate, TransientScope} from 'di';
annotate(Paginator, new TransientScope);