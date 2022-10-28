import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';


@Injectable({
  providedIn: 'root'
})
export class TextConversationSummaryService extends ApiServiceBase{

//private SERVICE_URL = "http://20.82.219.145/Api/SummaryGeneration";
private SERVICE_URL = this.compassBaseUrl+"conversationsummary/Api/SummaryGeneration";

  constructor(private httpClient: HttpClient) { 
  super();
}

  summarizeText(text: string, successCallback, errorCallback) {

    let requestJson = {text: text};
    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {
      if(result["error"] != null) {
        errorCallback(result["Message"]); 
      } else {
        let resultText = result["response"]
        successCallback(resultText);
      }
    });

  }


}
