module kingdom from 'kingdom';
//import {Module} from 'kingdom';

describe('exports', function(){
  it('should export classes', () => {
    expect(kingdom.Module).toBeDefined();
    expect(kingdom.RootModule).toBeDefined();
    expect(kingdom.ModuleLoader).toBeDefined();
    expect(kingdom.RouteBuilder).toBeDefined();
  });
});
