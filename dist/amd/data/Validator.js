define(["assert", '../util/TextUtil', 'plugins/observable'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var assert = $__0.assert;
  var TextUtil = $__2.TextUtil;
  var observable = $__4.default;
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
        var that = this;
        for (i = 0; i < entityType.dataProperties.length; i += 1) {
          property = entityType.dataProperties[i];
          propertyName = property.name;
          propertyObject = this.getObservable(entity, propertyName);
          if (!propertyObject) {
            var getDisplayName = function(propertyName) {
              return (that.textUtil.labelize(propertyName));
            };
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
          propertyObject.extend({validation: validators});
        }
        for (i = 0; i < entityType.foreignKeyProperties.length; i += 1) {
          property = entityType.foreignKeyProperties[i];
          propertyName = property.name;
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
          propertyObject.extend({validation: validators});
          if (!property.isNullable) {
            propertyObject.extend({notEqual: foreignKeyInvalidValue});
          }
        }
      }
    }
  }, {});
  Object.defineProperty(Validator, "parameters", {get: function() {
      return [[TextUtil]];
    }});
  return {
    get Validator() {
      return Validator;
    },
    __esModule: true
  };
});
