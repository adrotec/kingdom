import {ModuleLoader, Module, RootModule} from 'kingdom';

describe('ModuleLoader', function(){

  class App {
    constructor(){
      this.text = 'hi';
    }
  }
  
  it('should load ES6 modules', () => {
    var _module = {
     'default': App,
     '__esModule': true,
    };
    var app = ModuleLoader.loadModule(_module);
    expect(app instanceof App).toBe(true);
    expect(app.text).toBe('hi');
  });

  it('should load ES6 classes', () => {
    var app = ModuleLoader.loadModule(App);
    expect(app instanceof App).toBe(true);
    expect(app.text).toBe('hi');
  });

  it('should load objects', () => {
    var obj = {};
    var app = ModuleLoader.loadModule(obj);
    var app2 = ModuleLoader.loadModule(obj);
    expect(app).toBe(app2);
  });

  it('should return a singlton if the class extends kingdom.Module', () => {
    class App extends RootModule {
      constructor(){
        this.text = 'hi';
      }
    }
    var _module = {
     'default': App,
     '__esModule': true,
    };
    var app = ModuleLoader.loadModule(_module);
    var app2 = ModuleLoader.loadModule(_module);
    var app3 = ModuleLoader.loadModule(App);
    expect(app instanceof App).toBe(true);
    expect(app).toBe(app2);
    expect(app2).toBe(app3);
  });

});
