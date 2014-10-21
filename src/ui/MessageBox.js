import app from 'durandal/app';

export class MessageBox {
  show(...params){
    return app.showMessage(...params);
  }
  showConfirm(...params){
    return app.showConfirm(...params);
  }

  showNegative(...params){
    return app.showDangerMessage(...params);
  }
  showPositive(...params){
    return app.showSuccessMessage(...params);
  }
  showConfirmNegative(...params){
    return app.showDangerConfirm(...params);
  }
  showConfirmPositive(...params){
    return app.showSuccessConfirm(...params);
  }
}