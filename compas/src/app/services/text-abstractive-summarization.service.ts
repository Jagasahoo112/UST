import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class TextAbstractiveSummarizationService extends ApiServiceBase{

  //private SERVICE_URL = "http://20.54.93.160/api/abstractSummary";
  private SERVICE_URL = this.compassBaseUrl+"abstractivesummary/api/abstractSummary";
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  summarizeText(text: string, successCallback, errorCallback) {

    let requestJson = {text: text};
    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {
      if(result["error"] != null) {
          let resultText = result["outputText"]
          successCallback(resultText);
      } else {
        errorCallback(result["Message"]);
      }
    });

  }
}
