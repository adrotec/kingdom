import app from 'durandal/app';
import dialog from 'plugins/dialog';

export class Dialog {
  show(view, activationData){
    app.showModal(view, activationData);
  }
  // close(...params){
  //   dialog.close(...params); 
  // }
  closeAll(){

  }

  open(...params){
    return app.showModal(this, params);
    // alert('Wait up!');
  }

  close(result){
    dialog.close(this, result); 
      // alert('Again Wait please...');
  }

}