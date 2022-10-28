import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class GrammarCheckService extends ApiServiceBase{

  private SERVICE_URL;
  constructor(private httpClient: HttpClient) { 
    super();
  }

  grammerCheckText(text: string, algorithmKey: number, successCallback, errorCallback) {

    // //private SERVICE_URL = "http://20.67.129.7/Api/GrammarCheckService";
    // if (algorithmKey == 1) {
    //   this.SERVICE_URL = "http://20.67.129.7/Api/GrammarCheckService";
    // } else {
    //   //http://20.67.156.48grammarcheck/Api/GetGrammarService
    //   this.SERVICE_URL = this.compassBaseUrl+"grammarcheck/Api/GetGrammarService";
    // }
    this.SERVICE_URL = this.compassBaseUrl+"grammarcheck/Api/GetGrammarService";
    let sentences = text;
    let requestJson = { text: sentences, algorithmKey: algorithmKey };

    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {
      if (algorithmKey == 1) {
        if (result != null && result["response"] != null) {
          successCallback(result["response"]);
        }
        else {
          errorCallback(result["error"]["errorMessage"]);
        }
      } else {

        let response = result["response"];
        let rephrasedResults = [];
        for (let i = 0; i < response.length; i++) {
          let rephrasedResultsItem = [];
          response[i].suggestion.forEach(element => {
            let objs = { text: element };
            rephrasedResultsItem.push(objs);
          });
          rephrasedResults.push(rephrasedResultsItem);
        }
        let rephrasedResponse = [{
          "cleanedText": text,
          "rephrasedResults": rephrasedResults
        }];
        successCallback(rephrasedResponse);
      }
    });


  }
}
