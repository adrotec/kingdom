import ko from 'knockout';

export class Filter {
  constructor(name, fn){
    ko.filters[name] = fn;
  }
}