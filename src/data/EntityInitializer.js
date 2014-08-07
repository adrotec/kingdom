import breeze from 'breeze';
import {Deferred} from 'prophecy';
import {Entity} from './Entity';

var {EntityManager} = breeze;

var _initializedEntityTypesMap = {};

export class EntityInitializer {

  constructor(entityManager: EntityManager){
    this.entityManager = entityManager;
  }

  initialize(entityTypeName, ctor, initializer){
    if (_initializedEntityTypesMap[entityTypeName]) {
      return false;
    }
    _initializedEntityTypesMap[entityTypeName] = true;
    return this.entityManager.metadataStore
      .registerEntityTypeCtor(entityTypeName, ctor, initializer);
  }
  
  ensureInitializers(initializers = {}){
    var deferred = new Deferred();
    var entityTypes = this.entityManager.metadataStore.getEntityTypes();
    for (var i in entityTypes) {
      var shortName = entityTypes[i].shortName;
      if (_initializedEntityTypesMap[shortName]) {
          continue;
      }
      if(entityTypes.hasOwnProperty(i)){
        // eval('var initializer = function ' + shortName + '(){}');
        var ctor = initializers[shortName];

        if(!ctor){
          ctor = new Function("return function " + shortName + "(){}")();
          ctor.prototype = new Entity();
        }

        var initializer = function(entity){
          if(entity.init){
            entity.init.apply(entity);
          }
        }

        this.initialize(shortName, ctor, initializer);
      }
    }
    window.setTimeout(()=> deferred.resolve(), 1);
    return deferred.promise;
  }

}