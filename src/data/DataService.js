import breeze from 'breeze';
import {Deferred} from 'prophecy';
import sugar from 'breeze-sugar';
import koES5 from 'breeze.koES5';
import $ from 'jquery';
import {Storage} from './Storage';


breeze.config.initializeAdapterInstance('modelLibrary', 'koES5', true);

var _queriesFetched = new Map();

var {EntityManager, EntityQuery, EntityState, Predicate, FetchStrategy} = breeze;

export class DataService {

  constructor(entityManager: EntityManager, storage: Storage){
    this.entityManager = entityManager;
    this.storage = storage;
  }

  find(...params){
    return this.findAll(...params);
  }

  findAll(from, criteria, options = {}){
    var queryId = JSON.stringify({from, criteria, options});
    var query = sugar.createQuery(from, criteria, options);
    if(options.count){
      query = query.inlineCount(true);
    }
    if(options.expand && !_queriesFetched.get(queryId)){
      options.localFirst = false;
    }
    _queriesFetched.set(queryId, query);
    return this.findResultsByQuery(query, options.localFirst !== false, false, true);
  }

  findOne(from, criteria, options = {}){
    options.limit = 1;
    var query = sugar.createQuery(from, criteria, options);
    return this.findResultsByQuery(query, options.localFirst !== false, true, true);
  }

  getAll(from, criteria, options = {}){
    var query = sugar.createQuery(from, criteria, options);
    var results = this.getResults(query, false);
    if(options.count){
      var countOptions = {
        sort: options.sort,
      }
      var countQuery = sugar.createQuery(from, criteria, countOptions);
      var allResults = this.getResults(countQuery, false);
      results.count = allResults.length;
    }
    return results;
  }

  getOne(from, criteria, options = {}){
    options.limit = 1;
    var query = sugar.createQuery(from, criteria, options);
    return this.getResults(query, true);
  }

  createEntity(entityTypeName, data){
    return this.entityManager.createEntity(entityTypeName, data);    
  }

  create(...params){
    return this.createEntity(...params);
  }

  getResults(query: EntityQuery, singleResult: boolean = false){
    var results = this.entityManager.executeQueryLocally(query);
    return singleResult ? results[0] : results;
  }

  findResultsByQueryNEW(query: EntityQuery, localFirst: boolean = true, singleResult: boolean = false): Promise {
    var deferred = new Deferred();
    var executeServer = function(){
      this.entityManager.executeQuery(query).then(function(data){
          deferred.resolve(singleResult ? data.results[0] : data.results);
      }, function(error){
          deferred.reject(error);
      });
    }
    if(localFirst){
      query.using(FetchStrategy.FromLocalCache)
      .using(this.entityManager.original).execute()
        .then((data) => {
          if(data.results.length){
            deferred.resolve(singleResult ? data.results[0] : data.results);
          }
          else {
            executeServer.apply(this);
          }
        }, (error) => {
          deferred.reject(error);
      });
    }
    else {
      executeServer.apply(this);
    }
    return deferred.promise;
  }

  findResultsByQuery(query: EntityQuery, localFirst: boolean = true, singleResult: boolean = false, resultsOnly = true): Promise {
    var deferred = new Deferred();
    var results = [];
    if(localFirst){
        results = this.getResults(query, singleResult);
        if(results){
            deferred.resolve(resultsOnly ? results : {results});
        }
    }
    if(!localFirst || !results){
        this.entityManager.executeQuery(query).then(function(data){
          if(data.inlineCount){
            data.results.count = data.inlineCount;
          }
          deferred.resolve(singleResult ? data.results[0] : (resultsOnly ? data.results : data));
        }, function(error){
            deferred.reject(error);
        });
    }
    return deferred.promise;
  }

  getEntityByCode(entityTypeName, code){
    var query = new EntityQuery().from(entityTypeName).where('code', '==', code);
    var results = this.entityManager.executeQueryLocally(query);
    var entity;
    if(results.length){
        entity = results[0];
    }
    else {
        var name = code;
        entity = this.entityManager.createEntity(entityTypeName, {code, name});
    }
    return entity;
  }

  removeEntity(entity){
    if(entity.entityAspect){
      entity.entityAspect.setDeleted();
    }
  }

  saveChanges(entities){
    if(entities){
      var deletedEntities = this.entityManager.getEntities(null, EntityState.Deleted);
      entities = entities.concat(deletedEntities);
      return this.entityManager.saveChanges(entities);
    }
    else {
      return this.entityManager.saveChanges();
    }
  }

  saveEntities(entities){
    return this.saveChanges(entities);
  }
  
}
