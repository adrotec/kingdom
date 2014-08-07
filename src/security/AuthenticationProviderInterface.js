export class AuthenticationProviderInterface {
  authenticate(username, plainPassword){
    throw new Error('AuthenticationProviderInterface.authenticate not implemented');
  }
  deauthenticate(){
    throw new Error('AuthenticationProviderInterface.deauthenticate not implemented');
  }
  get currentUser(){
    throw new Error('AuthenticationProviderInterface.currentUser getter not implemented');    
  }
  // set currentUser(){
  //   throw new Error('AuthenticationProviderInterface.currentUser setter not implemented');    
  // }
} 