import {RouteBuilder} from 'kingdom';

describe('RouteBuilder', function(){
  it('should build route by convention', ()=> {
    var builtConfig = RouteBuilder.buildRouteConfig({pattern: 'demo'});
    var builtConfig2 = RouteBuilder.buildRouteConfig({pattern: 'hello/:name'});
    expect(builtConfig.moduleId).toBe('demo/demo');
    expect(builtConfig2.moduleId).toBe('hello/hello');
  });
});
