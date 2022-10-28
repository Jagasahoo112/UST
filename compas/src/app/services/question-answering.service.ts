import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnsweringService extends ApiServiceBase{

  constructor(private httpClient: HttpClient) { 
    super();
  }

  // private SERVICE_URL = "http://20.54.93.160/api/abstractSummary";
  private SERVICE_URL = this.compassBaseUrl+"questionansweringgateway/Api/QuestionAnsweringService"

  


  

  getAnswer(text: string, userId: string,languageId: number , successCallback, errorCallback) {

    
    let requestJson = { query: text, context: userId,languageId: languageId };
    return this.httpClient.post(this.SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }
  getContent(userId: string,languageId:number, successCallback, errorCallback) {
    var  SERVICE_URL_GET_CONTENT = "";
    if(languageId == 0){
      //http://20.54.16.192/Api/DocumentContentExtractor
      //SERVICE_URL_GET_CONTENT = "http://20.54.16.192/Api/DocumentContentExtractor";
      SERVICE_URL_GET_CONTENT = this.compassBaseUrl+"questionansweringmodel/Api/DocumentContentExtractor"
     
    }else if(languageId == 1){
      SERVICE_URL_GET_CONTENT = this.compassBaseUrl+"questionansweringmodel/Api/DocumentContentExtractor"
    }
    else{
      //http://20.54.16.192/Api/DocumentContentExtractor
      SERVICE_URL_GET_CONTENT = this.compassBaseUrl+"multiquestionanswering/Api/DocumentContentExtractor"
    }
      

    let requestJson = { context: userId };
    return this.httpClient.post(SERVICE_URL_GET_CONTENT, requestJson).subscribe(result => {

      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }
}
