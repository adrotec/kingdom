import ko from 'knockout';
import breeze from 'breeze';
import {Deferred} from '../core/Deferred';
import {Entity} from './Entity';
import {DataService} from './DataService';
import {Validator} from './Validator';

var {EntityManager} = breeze;

var _initializedEntityTypesMap = {};

export class EntityInitializer {

  constructor(dataService: DataService, validator: Validator){
    this.dataService = dataService;
    this.validator = validator;
    this.entityManager = this.dataService.entityManager;
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

        var that = this; 
        var initializer = function(entity){
          that.validator.addValidationForEntity(entity);
          if(entity.init){
            entity.init.apply(entity, [that.dataService]);
          }
          entity.dataService = that.dataService;
          entity.__validationErrors = ko.observableArray();
          entity.entityAspect.validationErrorsChanged.subscribe(function(){
            entity.__validationErrors(entity.entityAspect.getValidationErrors());
          });

          if(false){
            for(var prop in entity){
              if(typeof entity[prop] === "function"){
                var matches = prop.match(/(.+?)Computed$/);
                if(matches){
                  entity.defineProperty(matches[1], entity[prop].bind(entity));
                }
              }
            }
          }
        }

        this.initialize(shortName, ctor, initializer);
      }
    }
    window.setTimeout(()=> deferred.resolve(), 1);
    return deferred.promise;
  } 
}