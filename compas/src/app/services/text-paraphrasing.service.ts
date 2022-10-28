import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class TextParaphrasingService extends ApiServiceBase{

  // private SERVICE_URL = "https://acemnpdaclweb03.azurewebsites.net/Api/TextParaphrase";
  //private SERVICE_URL = "http://52.142.125.166/api/ParaphraseGeneratorService"
  private SERVICE_URL = this.compassBaseUrl+"textparaphrase/api/ParaphraseGeneratorService";

  constructor(private httpClient: HttpClient) {
    super();
   }

  paraphraseText(text: string, suggestionCount: number, algorithmKey: number, successCallback, errorCallback) {

    let sentences = text;
    let context = [];
    let requestJson = { text: sentences, maxSuggestionCount: suggestionCount, algorithmKey: algorithmKey, context: context };
  
    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] == null) {
        let paraphrasedTextList = result["response"];
        console.log()
        successCallback(paraphrasedTextList);
      } else {
        errorCallback(result["error"]);
      }
    });

  }

}
