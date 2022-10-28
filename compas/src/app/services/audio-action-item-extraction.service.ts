import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class AudioActionItemExtractionService extends ApiServiceBase{

  //private BASE_URL = "http://localhost:7045"
  private BASE_URL = "http://20.82.155.63"

  //private SERVICE_URL = "http://20.54.16.192/Api/QuestionAnsweringService"

  constructor(private httpClient: HttpClient) {

    super();
   }

  getExtractedActionItem(text: string, successCallback, errorCallback) {
    let SERVICE_URL = "ukiactionitemextractor/Api/ActionItemExtraction";
    let requestJson = { text: text };

    return this.httpClient.post(this.compassBaseUrl + SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }

  getAssigneeSuggestions(assigneeList, accessToken, successCallback, errorCallback) {
    let SERVICE_URL = "ukiactionitemextractor/Api/AssigneeSuggestions";
    let requestJson = { assigneeList: assigneeList, token: accessToken };

    return this.httpClient.post(this.compassBaseUrl + SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }
  getPlannerDetails(accessToken, successCallback, errorCallback) {
    let SERVICE_URL = "ukiactionitemextractor/Api/PlannerDetails";
    let requestJson = { token: accessToken };
    return this.httpClient.post(this.compassBaseUrl + SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }

  getDetailsByEmail(email,accessToken, successCallback, errorCallback) {
    let SERVICE_URL = "ukiactionitemextractor/Api/DetailsByEmail";
    let requestJson = {email:email, token: accessToken };

    return this.httpClient.post(this.compassBaseUrl + SERVICE_URL, requestJson).subscribe(result => {

      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }
  updatePlanner(actionDetails,accessToken, successCallback, errorCallback) {
    let SERVICE_URL = "ukiactionitemextractor/Api/UpdatePlanner";
    let requestJson = {actionDetails:actionDetails, token: accessToken };
    return this.httpClient.post(this.compassBaseUrl + SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
        successCallback(result["response"]);
      }
    });

  }

}
