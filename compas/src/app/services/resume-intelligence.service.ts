import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResumeIntelligenceService {

  private BASE_SERVICE_URL = "http://20.67.178.20/resumesearch/Api/ResumeUpload";
  private GET_RESUME_SERVICE_URL = "http://20.67.178.20/resumesearch/Api/GetResumeList";
  private GET_SEARCH_RESUME_SERVICE_URL = "http://20.67.178.20/resumesearch/Api/ResumeSearchService";
  private GET_RESUME_ANALYSIS_SERVICE_URL = "http://20.67.178.20/resumesearch/Api/ResumeDetailsExtractor"
  private GET_DOWNLOAD_RESUME_SERVICE_URL = "http://20.67.178.20/resumesearch/Api/GetDocument";

  constructor(private httpClient: HttpClient) { }

  

  uploadFiles(userId, uploadedFiles, successCallback, errorCallback) {
    const formData = new FormData();
    uploadedFiles.forEach((file, index) => {
      formData.append('file', file, file.name);

    });

    if (userId != null) {
      for (let key in userId) {
        let value = userId[key];

        formData.append(key, value);
      }
    }
    return this.httpClient.post(this.BASE_SERVICE_URL, formData).subscribe(result => {
      if (result["error"] == null) {
        let sourceFiles = result["response"]
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });
  }
  addfiles(userId,files,successCallback,errorCallback){
    let postData = {
      "userId":userId,
      "files":files
    };

    return this.httpClient.post(this.BASE_SERVICE_URL,postData).subscribe(result => {
      if(result["error"] == null) {
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });

  }

  getResumeList(userId,searchFilter,successCallback,errorCallback) {
    let postData = {"userId": userId, "searchFilter" : searchFilter};
    return this.httpClient.post(this.GET_RESUME_SERVICE_URL, postData).subscribe(result => {
      if(result["error"] == null) {
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });
  }

  getAnswer(text: string, userId: string, successCallback, errorCallback) {
    let requestJson = { searchQuery: text, userId: userId };
    return this.httpClient.post(this.GET_SEARCH_RESUME_SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
         successCallback(result["response"]);
      }
    });
  }


  getResumeAnalysis(resumeIdList: [string], userId: string, successCallback, errorCallback) {
    let requestJson = { uniqueId: resumeIdList, userId: userId };
    return this.httpClient.post(this.GET_RESUME_ANALYSIS_SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
         successCallback(result["response"]);
      }
    });
  }


  getResumeDownload(fileId: string, userId: string):string {
    let requestJson = { uniqueId: fileId, userId: userId };     
    return this.GET_DOWNLOAD_RESUME_SERVICE_URL+"?userId="+ userId + "&uniqueId="+fileId;
  } 
}
