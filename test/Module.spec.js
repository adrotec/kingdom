import {Module, RootModule} from 'kingdom';

describe('Modules', function(){
  it('should expose navigation for {nav: true} only', () => {
    class App extends RootModule {
      get __moduleId__(){
        return 'app';
      }
      get routes(){
        return [
          {pattern: 'demo', nav: true},
          {route: 'hello', moduleId: 'hello', nav: true},
          {route: 'next', moduleId: 'next', nav: true},
          {route: 'play/:game', moduleId: 'play'}
        ];
      }
    }
    var app = new App();
    app.registerRoutes();
    expect(app.navigation.length).toBe(3);
    expect(app.navigation[1].href).toBe('#hello');
    expect(app.navigation[1].moduleId).toBe('hello/hello');
    expect(app.navigation[1].isActive()).toBe(false);
  });
});
