define([], function() {
  "use strict";
  var TextUtil = function TextUtil() {};
  ($traceurRuntime.createClass)(TextUtil, {
    labelize: function(str) {
      return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
        return str.toUpperCase();
      }).replace(' Of ', ' of ');
    },
    lowerCaseFirst: function(str) {
      return str.substr(0, 1).toLowerCase() + str.slice(1);
    },
    upperCaseFirst: function(str) {
      return str.substr(0, 1).toUpperCase() + str.slice(1);
    }
  }, {});
  return {
    get TextUtil() {
      return TextUtil;
    },
    __esModule: true
  };
});
