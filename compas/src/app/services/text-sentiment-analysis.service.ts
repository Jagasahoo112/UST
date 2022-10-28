import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})

export class TextSentimentAnalysisService extends ApiServiceBase{
  // private SERVICE_URL = "http://localhost:8083/Api/SentimentAnalysis";
  //private SERVICE_URL = "https://acemnpdaclweb04.azurewebsites.net/Api/SentimentAnalysis";
  private SERVICE_URL = this.compassBaseUrl+"sentimentanalysis/Api/SentimentAnalysis";
  constructor(private httpClient: HttpClient) { 
    super();
  }

  textSentimentAnalysisText(text: string, targetAspect: any, successCallback, errorCallback) {
    let sentences = text;
    // let requestJson = {text: sentences};

    let requestJson = {
      text: text,
      targetSentiments: targetAspect,
      "MaxSuggestions": 3
    };


    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {

      if (result != null && result["response"] != null) {
        successCallback(result["response"]);
      }
      else {
        errorCallback(result["error"]["errorMessage"]);
      }
    });

  }
}
