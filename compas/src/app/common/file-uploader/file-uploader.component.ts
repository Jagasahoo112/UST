import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Output() public fileChoosed = new EventEmitter();

  constructor(private httpClient: HttpClient,private authService: AuthenticationService) { }

  @Input() allowMultipleFiles: boolean = true;
  public uploadedFiles: Array<File> = [];
  public isDisabled: boolean = false;

  authenticatedUser = {
    userId: null,
    email: null,
    password: null,
    fullName: "Guest",
    thumbnail: "lab.jpg"
  };
  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.authenticatedUser = loggedInUser;
  }

  public clear(): void {
    this.uploadedFiles = [];
  }
fileSectected(){
if(this.uploadedFiles.length > 0){
this.fileChoosed.emit(true);
}
}
  public uploadFiles(url: string, additionalPostData, successCallback, errorCallback) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json',
    //   //Authorization: token
    // });

    const formData = new FormData();

    this.uploadedFiles.forEach((file, index) => {
      formData.append('file', file, file.name);
    });

    if (additionalPostData != null) {
      for (let key in additionalPostData) {
        let value = additionalPostData[key];

        formData.append(key, value);
      }
    }

    this.httpClient.post(url, formData, {
      //headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe(resp => {
      if (resp.type === HttpEventType.Response) {
        console.log('Upload complete');

        let result = resp.body;

        if (result["error"] == null) {
          successCallback(result["response"]);
        } else {
          errorCallback(result["error"])
        }
      }
      if (resp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * resp.loaded / resp.total);
        console.log('Progress ' + percentDone + '%');
      }
    });
  }

  public uploadQuestionAnswerFiles(url: string, additionalPostData, successCallback, errorCallback) {
   
    const formData = new FormData();

    this.uploadedFiles.forEach((file, index) => {
      formData.append('file', file, file.name);
    });

    if (additionalPostData != null) {
      for (let key in additionalPostData) {
        let value = additionalPostData[key];

        formData.append(key, value);
      }
    }
    let userId = this.authenticatedUser.userId;
    this.httpClient.post(url, formData, {
      //headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe(resp => {
      if (resp.type === HttpEventType.Response) {
        console.log('Upload complete');

        let result = resp.body;

        if (result["error"] == null) {
          successCallback(result["response"]);
        } else {
          errorCallback(result["error"])
        }
      }
      if (resp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * resp.loaded / resp.total);
        console.log('Progress ' + percentDone + '%');
      }
    });
  }

  public uploadActionItemExtractorFiles(url: string, additionalPostData, successCallback, errorCallback) {
   
    const formData = new FormData();

    this.uploadedFiles.forEach((file, index) => {
      formData.append('file', file, file.name);
    });

    if (additionalPostData != null) {
      for (let key in additionalPostData) {
        let value = additionalPostData[key];

        formData.append(key, value);
      }
    }
    let userId = this.authenticatedUser.userId;
    this.httpClient.post(url, formData, {
      //headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe(resp => {
      
      if (resp.type === HttpEventType.Response) {
        console.log('Upload complete');

        let result = resp.body;

        if (result["error"] == null) {
          successCallback(result["response"]);
        } else {
          errorCallback(result["error"])
        }
      }
      if (resp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * resp.loaded / resp.total);
        console.log('Progress ' + percentDone + '%');
      }
    });
  }

}
