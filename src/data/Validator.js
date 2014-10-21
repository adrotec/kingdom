import {TextUtil} from '../util/TextUtil';
//import koValidation from 'knockoutValidation';
import observable from 'plugins/observable';

export class Validator {
  
  constructor(textUtil: TextUtil){
    this.textUtil = textUtil;
  }
  
  getObservable(obj, prop){
    return observable(obj, prop);
  }
  
  addValidationForEntity(entity) {
return;
    var entityType = entity.entityType,
            i,
            property,
            propertyName,
            propertyObject,
            validators,
            u,
            validator,
            nValidator;

    if (entityType) {
        var that = this;
        function getDisplayName(propertyName) {
            return (that.textUtil.labelize(propertyName));
        }
        for (i = 0; i < entityType.dataProperties.length; i += 1) {
            property = entityType.dataProperties[i];
            propertyName = property.name;
  //                propertyObject = entity[propertyName];
            propertyObject = this.getObservable(entity, propertyName);
            if (!propertyObject) {
                continue;
            }
            validators = [];

            for (u = 0; u < property.validators.length; u += 1) {
                validator = property.validators[u];
                nValidator = {
                    propertyName: propertyName,
                    validator: function(val) {
                        var error = this.innerValidator.validate(val, {displayName: getDisplayName(this.propertyName)});
                        this.message = error ? error.errorMessage : "";
                        return error === null;
                    },
                    message: "",
                    innerValidator: validator
                };
                validators.push(nValidator);
            }
            propertyObject.extend({
                validation: validators
            });
        }

        for (i = 0; i < entityType.foreignKeyProperties.length; i += 1) {
            property = entityType.foreignKeyProperties[i];
            propertyName = property.name;
  //                propertyObject = entity[propertyName];
            propertyObject = this.getObservable(entity, propertyName);
            if (!propertyObject) {
                continue;
            }

            validators = [];
            for (u = 0; u < property.validators.length; u += 1) {
                validator = property.validators[u];
                nValidator = {
                    propertyName: propertyName,
                    validator: function(val) {
                        var error = this.innerValidator.validate(val, {displayName: getDisplayName(this.propertyName)});
                        this.message = error ? error.errorMessage : "";
                        return error === null;
                    },
                    message: "",
                    innerValidator: validator
                };
                validators.push(nValidator);
            }
            propertyObject.extend({
                validation: validators
            });
            if (!property.isNullable) {
                //Bussiness Rule: 0 is not allowed for required foreign keys
                propertyObject.extend({notEqual: foreignKeyInvalidValue});
            }
        }
    }
  }
}