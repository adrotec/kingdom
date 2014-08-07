define([], function() {
  "use strict";
  var AuthenticationProviderInterface = function AuthenticationProviderInterface() {};
  ($traceurRuntime.createClass)(AuthenticationProviderInterface, {
    authenticate: function(username, plainPassword) {
      throw new Error('AuthenticationProviderInterface.authenticate not implemented');
    },
    deauthenticate: function() {
      throw new Error('AuthenticationProviderInterface.deauthenticate not implemented');
    },
    get currentUser() {
      throw new Error('AuthenticationProviderInterface.currentUser getter not implemented');
    }
  }, {});
  return {
    get AuthenticationProviderInterface() {
      return AuthenticationProviderInterface;
    },
    __esModule: true
  };
});
