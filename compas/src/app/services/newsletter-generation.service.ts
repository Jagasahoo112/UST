import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class NewsletterGenerationService extends ApiServiceBase{

  //private BASE_SERVICE_URL = "http://20.67.129.154/";
  private BASE_SERVICE_URL = this.compassBaseUrl+"newslettergeneration";
  private GET_SOURCE_FILES_SERVICE_URL = this.BASE_SERVICE_URL + "/Api/GetSourceFiles";
  private GET_DELETE_FILES_SERVICE_URL = this.BASE_SERVICE_URL + "/Api/DeleteFiles";
  private GET_TEMPLATES_SERVICE_URL = this.BASE_SERVICE_URL + "/Api/GetTemplates";
  private GENERATE_NEWSLETTER_SERVICE_URL = this.BASE_SERVICE_URL + "/Api/GenerateNewsletter";
  private GENERATE_PDF_FROM_HTML_SERVICE_URL = this.BASE_SERVICE_URL + "/Api/GeneratePdfFromHtml";
  private GENERATE_WORD_FROM_HTML_SERVICE_URL = this.BASE_SERVICE_URL + "/Api/GenerateWordFromHtml";


  constructor(private httpClient: HttpClient) {
    super();
   }

  getBaseUrl():string {
    return this.BASE_SERVICE_URL;
  }

  getSourceFiles(userId, successCallback, errorCallback) {

    let postData = {"userId": userId};
    return this.httpClient.post(this.GET_SOURCE_FILES_SERVICE_URL, postData).subscribe(result => {
      if(result["error"] == null) {
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });
  }


  deleteFile(fileId, userId, successCallback, errorCallback) {

    let postData = {
      "fileId" : fileId,
      "userId": userId
    };
    
    return this.httpClient.post(this.GET_DELETE_FILES_SERVICE_URL, postData).subscribe(result => {
      if(result["error"] == null) {
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });
  }


  getTemplates(successCallback, errorCallback) {

    return this.httpClient.get(this.GET_TEMPLATES_SERVICE_URL).subscribe(result => {
      if(result["error"] == null) {
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });
  }


  generateNewsletter(fileList, templateId, userId, successCallback, errorCallback) {

    //let fileListPostData = fileList.map(f=>{return {fileId:f.fileId, contentType: f.contentType};}); //just send relevant info from the full structure to save bandwidth
    let postData = {
                    userId: userId,
                    fileList: fileList,
                    templateId: templateId
                  };
   
    
    return this.httpClient.post(this.GENERATE_NEWSLETTER_SERVICE_URL, postData).subscribe(result => {
      if(result["error"] == null) {
        let sourceFiles = result["response"];
        successCallback(sourceFiles);
      } else {
        errorCallback(result["error"]);
      }
    });
  }

  generatePdfFromHtml(htmlText, successCallback, errorCallback) {
    let postData = {htmlText: htmlText
                  };
   
    return this.httpClient.post(this.GENERATE_PDF_FROM_HTML_SERVICE_URL, postData, { responseType: "blob"}).subscribe(result => {
      if(result instanceof Blob) {
        successCallback(result);
      } else {
        errorCallback(result["error"]);
      }
    });
  }

  generateWordFromHtml(htmlText, successCallback, errorCallback) {
    let postData = {htmlText: htmlText
                  };
   
    return this.httpClient.post(this.GENERATE_WORD_FROM_HTML_SERVICE_URL, postData, { responseType: "blob"}).subscribe(result => {
      if(result instanceof Blob) {
        successCallback(result);
      } else {
        errorCallback(result["error"]);
      }
    });
  }
  
}
