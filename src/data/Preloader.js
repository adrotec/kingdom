import {DataService} from './DataService';
import {Deferred} from '../core/Deferred';
import {Storage} from './Storage';
import {Logger} from '../util/Logger';
import router from 'plugins/router';

var STORAGE_METADATA = 'app.metadata';

var _metadataFetched = false;
var _routesGuarded = false;
var _previousRouteGuard = null;

export class Preloader {

  constructor(dataService: DataService, storage: Storage, logger: Logger){
    this.dataService = dataService;
    this.storage = storage;
    this.logger = logger;
  }

  importMetadata(data, fromCache = false) {

    var metadata = data; //typeof (data) === "string" ? JSON.parse(data) : data;

    if (metadata) {
      try {
        if(!fromCache){
          this.storage.set(STORAGE_METADATA, metadata);
        }
        this.dataService.entityManager.metadataStore.importMetadata(metadata);
        //entityInitializer.initialize(self);
        _metadataFetched = true;
        return metadata;
      } catch (e) {
  //                        error = new Error("Metadata import failed for " + url + "; Unable to process returned metadata:" + e.message);
        throw new Error('Metadata Import Failed: ' + e);
      }
    } else {
      throw new Error('Metadata Query Failed');
    }
  }

  ensureMetadata(localFirst = true){
    var deferred = new Deferred();

    if (_metadataFetched) {
      window.setTimeout(() => deferred.resolve(), 1);
    }
    else {
      var data;
      if(localFirst){
        data = this.storage.get(STORAGE_METADATA);
      }
      if (data) {
          try {
            var metadata = this.importMetadata(data, true);
            deferred.resolve(metadata);
          }
          catch(e){
            this.logger.error('Metadata Import from Local Cache failed', e);
          }
      }
      else {
        this.dataService.entityManager.fetchMetadata().then((metadata)=> {
          try {
            metadata = this.importMetadata(metadata);            
            deferred.resolve(metadata);
          }
          catch(e){
            deferred.reject(e);
          }
        });
      }
//}, 5000);
    }

    return deferred.promise;
  }

  onProgress(listener){
    this.progressListener = listener;
  }

  emitProgress(progress){
    if(this.progressListener){
      this.progressListener(progress);
    }
  }

  preload(entities = [], shouldBlockUi = false){

    var deferred = new Deferred();
    // return this.ensureMetadata().then(()=>{}, (err)=> {alert(err)}).catch((e)=>{alert('AA' + e)});
    this.ensureMetadata().then((metadata)=> {
      this.emitProgress({
        metadata: metadata
      })
      this.preloadEntities(entities).then(() => {
        deferred.resolve();
        if(shouldBlockUi){
          this.unBlockUi();
        }
      });
    });

    if(shouldBlockUi){
      this.blockUi();
    }

    return deferred.promise;
  }

  preloadEntities(entities = []){

    var deferred = new Deferred();

    var entityTypes = [];
    for(var i = 0; i < entities.length; i++){
      var entityType = {
        resourceName: entities[i].entityType || entities[i],
        criteria: entities[i].criteria || {},
        options: entities[i].options || {}
      };
      entityTypes.push(entityType);
    }
    
    // deferred.resolve();
    // return deferred.promise;

    var fetched = {};

    function tryToResolve(){
      var allFetched = true;
      var fetchedEntityTypes = [];
      for(var entityType of entityTypes){
        var resourceName = entityType.resourceName;
        allFetched = allFetched && fetched[resourceName];
        if(fetched[resourceName]){
          fetchedEntityTypes.push(entityType);
        }
      }
      this.emitProgress({
        fetchedEntityTypes,
        entityTypes
      });
      if(allFetched){
        this.logger.log('PRELOAD: Fetched all');
        deferred.resolve();
      }
    }
    for(var entityType of entityTypes){
      // block scope needed!
      let resourceName = entityType.resourceName;
      var criteria = entityType.criteria;
      var options = entityType.options;
      if(!options.localFirst){
        options.localFirst = false;
      }
      this.dataService.find(resourceName, criteria, options).then((data) => {
        this.logger.log('PRELOAD: Fetched ' + resourceName);
        fetched[resourceName] = true;
        tryToResolve.apply(this);
      }, (error)=> {
        console.log('PRELOAD: NOT FETCHED ' + resourceName); 
        console.error(error);
      });
    }

    if(!entityTypes.length){
      deferred.resolve();
    }

    return deferred.promise;
  }

  blockUi(){

    if(_routesGuarded){
      return;
    }
    _previousRouteGuard = router.guardRoute;
    router.guardRoute = function(instance, instruction){
      if(instruction.fragment == 'loading'){
        return true;
      }
      return false;
    };
    _routesGuarded = true;
  }

  unblockUi(){
    router.guardRoute = _previousRouteGuard; //|| function(){};
  }

}