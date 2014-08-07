import {AuthenticationProviderInterface} from './AuthenticationProviderInterface';
import {Deferred} from 'prophecy';
import router from 'plugins/router';

var _isAuthenticated = false;
var _routesGuarded = false;
var _previousRoute = null;

var _loginFragment = 'user/login';
var _logoutFragment = 'user/logout';

export class Authenticator {

  constructor(authenticationProvider: AuthenticationProviderInterface){
    this.authenticationProvider = authenticationProvider;    
  }

  get currentUser(){
    return this.authenticationProvider.currentUser;
  }

  // set currentUser(currentUser){
  //   return this.authenticationProvider.currentUser = currentUser;
  // }

  get isAuthenticated(){
    return _isAuthenticated;
  }

  get previousRoute(){
    return _previousRoute;
  }

  get loginUrl(){
    return _loginFragment;
  }

  get logoutUrl(){
    return _logoutFragment;
  }

  set loginUrl(loginUrl){
    _loginFragment = loginUrl;
  }

  set logoutUrl(logoutUrl){
    _logoutFragment = logoutUrl;
  }

  authenticate(username, plainPassword){
    var deferred = new Deferred();
    this.authenticationProvider.authenticate(username, plainPassword).then(()=> {
      _isAuthenticated = true;
      deferred.resolve(true);
    }, (error)=> {
      deferred.reject(error);
    }).catch((error)=> {
      console.error(error);
      console.log(error.stack);
    });
    return deferred.promise;
  }
  deauthenticate(){
    var deferred = new Deferred();
    this.authenticationProvider.deauthenticate().then(()=> {
      _isAuthenticated = false;
      deferred.resolve(true);
    }, (error)=> {
      deferred.reject(error);
    }).catch((error)=> {
      console.error(error);
      console.log(error.stack);
    });
    return deferred.promise;
  }

  deauthenticateP(){
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        _isAuthenticated = false;
        resolve(true);
      });
    });
  }

  navigateBack(){
      var route = _previousRoute;
      if(!route || route.indexOf(_logoutFragment) !== -1){
        route = '/';
      }
      window.setTimeout(function(){
        router.navigate(route, {replace: true, trigger: true});
      }, 1);
  }
  guardRoutes(){
    if(_routesGuarded){
      return;
    }
    var loginFragment = _loginFragment; 
    router.guardRoute = function(instance, instruction){
        if(
            instruction.fragment == loginFragment
            || instruction.fragment == 'user/register'
            || instruction.fragment == 'user/recover'
  //            || instruction.fragment == 'user/logout'
          ){
            if(_isAuthenticated){
                return false;
            }
            return true;
        }
        if(_isAuthenticated){
            return true;
        }
  //        return false;
  //        return true;
      if(location.hash.indexOf(loginFragment) === -1){
        _previousRoute = location.hash;
      }

      window.setTimeout(() => {
        router.navigate(loginFragment, {replace: true, trigger: true});
      }, 1);
      return false;
    };
    _routesGuarded = true;
  }
}
