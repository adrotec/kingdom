import app from 'durandal/app';
import dialog from 'plugins/dialog';
import {RouteBuilder} from '../core/RouteBuilder';

export class Dialog {
//  show(view, activationData){
//    app.showModal(view, activationData);
//  }
  // close(...params){
  //   dialog.close(...params); 
  // }
  closeAll(){

  }

  // DEPRECATED
  open(...params){
    return this.show(...params);
  }

  show(...params){
    return app.showModal(this, params);
    // alert('Wait up!');
  }

  close(result){
    dialog.close(this, result); 
      // alert('Again Wait please...');
  }
  
  static showDialog(moduleId, activationData){
    var idSplit = moduleId.split('/');
    idSplit.push('' + idSplit[idSplit.length-1]);
    var moduleIdReal = idSplit.join('/');
    moduleIdReal = RouteBuilder.getRoutePrefix() + moduleIdReal;
    return app.showModal(moduleIdReal, activationData);
  }

}