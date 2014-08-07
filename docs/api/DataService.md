# DataService class

```javascript
import {Module, DataService} from 'kingdom';

class MyModule extends Module {
  // inject the DataService instance
  constructor(dataService: DataService){
    this.dataService = dataService;
    this.customers = [];
  }

  fetchCustomers(){
    // find all customers
    this.dataService.find('Customers').then((results)=> {
      this.customers = results;
    });
  }
}
```

## find(resource: string [, criteria: object [, options: object]]): Promise

Find entities matching the criteria. Returns a promise that is resolved with an array.

## findOne(resource: string [, criteria: object [, options: object]]): Promise

Similar to `find` method, except this method returns a promise that is resolved with only one object.

```javascript
this.dataService.findOne('Customers').then((result)=> {
  this.selectedCustomer = result;
})
```

## create(entityTypeName: string [, defaultValues: object]): object

Create a new entity

```javascript
var customer = this.dataService.create('Customer', {firstName: 'John', lastName: 'Smith'});
```

## remove(entities: Array)

```javascript
this.dataService.remove(this.customers);
```

## save([entities: Array]): Promise

```javascript
this.dataService.save(this.customers).then(()=> {
  alert('customers data saved!');
});
```