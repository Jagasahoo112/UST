import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntelligentSearchFileuploaderService {

  private BASE_SERVICE_URL = "http://20.67.178.20/enhancedquestionanswering/Api/DocumentUpload";
  private GET_FILE_SERVICE_URL = "http://20.67.178.20/enhancedquestionanswering/Api/GetDocumentList";
  private GET_SEARCH_FILE_SERVICE_URL = "http://20.67.178.20/enhancedquestionanswering/Api/QuestionAnsweringService";

  constructor(private httpClient: HttpClient) { }

  uploadFiles(userId,uploadedFiles,tagList,successCallback, errorCallback) {
  
    const formData = new FormData();
    formData.append('details', JSON.stringify(tagList));
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
 
  getFileList(userId,searchFilter,successCallback,errorCallback){
    let postData = {"userId":userId,"searchFilter":searchFilter};
    return this.httpClient.post(this.GET_FILE_SERVICE_URL, postData).subscribe(result => {
      if(result["error"] == null){
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });

  }

  getAnswer(text: string, userId: string, successCallback, errorCallback) {
    let requestJson = { searchQuery: text, userId: userId };
    return this.httpClient.post(this.GET_SEARCH_FILE_SERVICE_URL, requestJson).subscribe(result => {
      if (result["error"] != null) {
        let resultText = result["error"]
        errorCallback(resultText);
      } else {
         successCallback(result["response"]);
      }
    });

  }
}
