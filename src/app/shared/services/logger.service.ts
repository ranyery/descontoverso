import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private _isLogEnabled: boolean;

  constructor() {
    this._isLogEnabled = !environment.production;
  }

  public log(message: any, ...optionalParams: any[]): void {
    if (!this._isLogEnabled) return;
    console.log(message, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]): void {
    if (!this._isLogEnabled) return;
    console.warn(message, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): void {
    if (!this._isLogEnabled) return;
    console.error(message, ...optionalParams);
  }
}
