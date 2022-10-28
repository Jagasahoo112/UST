import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class TextActionItemExtractionService extends ApiServiceBase{
  // private SERVICE_URL = "http://51.104.145.159/Api/ActionItemExtraction";
  private SERVICE_URL = this.compassBaseUrl+"actionitemextraction/Api/ActionItemExtraction";
  

  constructor(private httpClient: HttpClient) { 
    super();
  }

  extractActionItems(text: string, successCallback, errorCallback) {

    let requestJson = {text: text};
    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {
      if(result["error"] != null) {
        errorCallback(result["Message"]); 
      } else {
        successCallback(result["response"]);
      }
    });

  }
}
