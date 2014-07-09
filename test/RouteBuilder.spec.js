import {RouteBuilder} from 'kingdom';

var routePrefix = RouteBuilder.getRoutePrefix();

describe('RouteBuilder', function(){
  it('should build route by convention', ()=> {
    var builtConfig = RouteBuilder.buildRouteConfig({pattern: 'demo'}, true);
    var builtConfig2 = RouteBuilder.buildRouteConfig({pattern: 'hello/:name'});
    expect(builtConfig.moduleId).toBe(routePrefix + 'demo/demo');
    expect(builtConfig2.moduleId).toBe('hello/hello');
  });
});
