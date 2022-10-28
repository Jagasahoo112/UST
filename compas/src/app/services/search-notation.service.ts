import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class SearchNotationService  extends ApiServiceBase{

  private SERVICE_URL = this.compassBaseUrl;
   
  private ANALYSE_SEARCH_ENDPOINT = this.SERVICE_URL + "researchengine/Api/BingService";

  constructor(private httpClient: HttpClient) { 
    super();
  }

  searchresult(searchtext: string, successCallback, errorCallback) {

    let requestJson = { query: searchtext   };

    this.httpClient.post(this.ANALYSE_SEARCH_ENDPOINT, requestJson).subscribe(result => {
      if(result["error"] == null) {
        let analysisResults = result["response"];
        successCallback(analysisResults);
      } else {
        errorCallback(result["error"]);
      }
  });

}
}
