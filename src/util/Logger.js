import {ConfigInterface} from '../core/ConfigInterface';

export class Logger {
  constructor(config: ConfigInterface){
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