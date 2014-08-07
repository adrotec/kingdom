import observable from 'plugins/observable';

export class Entity {
  defineProperty(property, getter, setter){
    var evaluator = getter;
    if(setter){
      evaluator = {
        read: getter,
        write: setter
      }
    }
    observable.defineProperty(this, property, evaluator);
    // var descr = {
    //   get: getter,
    //   enumerable: true,
    //   configurable: true 
    // };
    // if(setter){
    //   descr.set = setter;
    // }
    // Object.defineProperty(this, property, descr);
  }  
}