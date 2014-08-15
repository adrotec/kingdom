import observable from 'plugins/observable';

export class Observer {
  static observe(object, prop, fn){
    observable(object, prop).subscribe(function(newValue){
      if(typeof fn === "function"){
        fn.apply(object, [newValue]);
      }
      else {
        object[fn](newValue);
      }
    });
  }
}