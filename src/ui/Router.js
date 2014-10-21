import router from 'plugins/router';

export class Router {
  static redirect(url){
    router.navigate(url);
  }
}