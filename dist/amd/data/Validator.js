define(["assert", '../util/TextUtil', 'knockoutValidation', 'plugins/observable'], function($__0,$__1,$__2,$__3) {
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
  var TextUtil = $traceurRuntime.assertObject($__1).TextUtil;
  var koValidation = $traceurRuntime.assertObject($__2).default;
  var observable = $traceurRuntime.assertObject($__3).default;
  var Validator = function Validator(textUtil) {
    assert.argumentTypes(textUtil, TextUtil);
    this.textUtil = textUtil;
  };
  ($traceurRuntime.createClass)(Validator, {
    getObservable: function(obj, prop) {
      return observable(obj, prop);
    },
    addValidationForEntity: function(entity) {
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
        try {
          throw undefined;
        } catch (getDisplayName) {
          var that = this;
          getDisplayName = function(propertyName) {
            return (that.textUtil.labelize(propertyName));
          };
          for (i = 0; i < entityType.dataProperties.length; i += 1) {
            property = entityType.dataProperties[$traceurRuntime.toProperty(i)];
            propertyName = property.name;
            propertyObject = this.getObservable(entity, propertyName);
            if (!propertyObject) {
              continue;
            }
            validators = [];
            for (u = 0; u < property.validators.length; u += 1) {
              validator = property.validators[$traceurRuntime.toProperty(u)];
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
            propertyObject.extend({validation: validators});
          }
          for (i = 0; i < entityType.foreignKeyProperties.length; i += 1) {
            property = entityType.foreignKeyProperties[$traceurRuntime.toProperty(i)];
            propertyName = property.name;
            propertyObject = this.getObservable(entity, propertyName);
            if (!propertyObject) {
              continue;
            }
            validators = [];
            for (u = 0; u < property.validators.length; u += 1) {
              validator = property.validators[$traceurRuntime.toProperty(u)];
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
            propertyObject.extend({validation: validators});
            if (!property.isNullable) {
              propertyObject.extend({notEqual: foreignKeyInvalidValue});
            }
          }
        }
      }
    }
  }, {});
  Validator.parameters = [[TextUtil]];
  return {
    get Validator() {
      return Validator;
    },
    __esModule: true
  };
});
