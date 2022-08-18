import { DebugElement, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(msg: string, ...optionnalParameters: any[]){
    console.log(this.format(msg, optionnalParameters));
  }

  error(msg: string, ...optionnalParameters: any[]){
    console.error(this.format(msg, optionnalParameters));
  }

  private format(msg: string, optionnalParameters: any[]): string {
    let buildMessage = new Date().toLocaleString() + ' : ' + msg;
    if(optionnalParameters && optionnalParameters.length > 0) {
      buildMessage += JSON.stringify(optionnalParameters);
    }

    return buildMessage;
  }
}
