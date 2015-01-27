define(["assert", './AuthenticationProviderInterface', '../core/Deferred', 'plugins/router'], function($__0,$__2,$__4,$__6) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  var assert = $__0.assert;
  var AuthenticationProviderInterface = $__2.AuthenticationProviderInterface;
  var Deferred = $__4.Deferred;
  var router = $__6.default;
  var _isAuthenticated = false;
  var _routesGuarded = false;
  var _previousRoute = null;
  var _loginFragment = 'user/login';
  var _logoutFragment = 'user/logout';
  var Authenticator = function Authenticator(authenticationProvider) {
    assert.argumentTypes(authenticationProvider, AuthenticationProviderInterface);
    this.authenticationProvider = authenticationProvider;
  };
  ($traceurRuntime.createClass)(Authenticator, {
    get currentUser() {
      return this.authenticationProvider.currentUser;
    },
    get isAuthenticated() {
      return _isAuthenticated;
    },
    get previousRoute() {
      return _previousRoute;
    },
    get loginUrl() {
      return _loginFragment;
    },
    get logoutUrl() {
      return _logoutFragment;
    },
    set loginUrl(loginUrl) {
      _loginFragment = loginUrl;
    },
    set logoutUrl(logoutUrl) {
      _logoutFragment = logoutUrl;
    },
    authenticate: function(username, plainPassword) {
      var deferred = new Deferred();
      this.authenticationProvider.authenticate(username, plainPassword).then((function() {
        _isAuthenticated = true;
        deferred.resolve(true);
      }), (function(error) {
        deferred.reject(error);
      })).catch((function(error) {
        console.error(error);
        console.log(error.stack);
      }));
      return deferred.promise;
    },
    deauthenticate: function() {
      var deferred = new Deferred();
      this.authenticationProvider.deauthenticate().then((function() {
        _isAuthenticated = false;
        deferred.resolve(true);
      }), (function(error) {
        deferred.reject(error);
      })).catch((function(error) {
        console.error(error);
        console.log(error.stack);
      }));
      return deferred.promise;
    },
    deauthenticateP: function() {
      return new Promise((function(resolve, reject) {
        window.setTimeout((function() {
          _isAuthenticated = false;
          resolve(true);
        }));
      }));
    },
    navigateBack: function() {
      var route = _previousRoute;
      if (!route || route.indexOf(_logoutFragment) !== -1) {
        route = '/';
      }
      window.setTimeout(function() {
        router.navigate(route, {
          replace: true,
          trigger: true
        });
      }, 1);
    },
    guardRoutes: function() {
      if (_routesGuarded) {
        return;
      }
      var loginFragment = _loginFragment;
      router.guardRoute = function(instance, instruction) {
        if (instruction.fragment == loginFragment || instruction.fragment == 'user/register' || instruction.fragment == 'user/recover') {
          if (_isAuthenticated) {
            return false;
          }
          return true;
        }
        if (_isAuthenticated) {
          return true;
        }
        if (location.hash.indexOf(loginFragment) === -1) {
          _previousRoute = location.hash;
        }
        window.setTimeout((function() {
          router.navigate(loginFragment, {
            replace: true,
            trigger: true
          });
        }), 1);
        return false;
      };
      _routesGuarded = true;
    }
  }, {});
  Object.defineProperty(Authenticator, "parameters", {get: function() {
      return [[AuthenticationProviderInterface]];
    }});
  return {
    get Authenticator() {
      return Authenticator;
    },
    __esModule: true
  };
});
