import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisclaimerService {
  private _disclaimerDisplayed: boolean = false;

  constructor() { }

  isDisclaimerDisplayed() {
    return this._disclaimerDisplayed;
  }

  notifyDisclaimerDisplay() {
    this._disclaimerDisplayed = true;
  }

  reset() {
    this._disclaimerDisplayed = false;
  }
}
