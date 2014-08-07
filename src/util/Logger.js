import {Config} from '../Config';

export class Logger {
  constructor(config: Config){
    this.config = config;
  }
  log(message){
    // @TODO implement based on config
    console.log(message);
  }
  error(message){
    console.error(message);
    if(message instanceof Error){
      console.log(message.stack);
    }
  }
}