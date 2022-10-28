import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import {ResumeIntelligenceService} from 'src/app/services/resume-intelligence.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-resume-file-uploder',
  templateUrl: './resume-file-uploder.component.html',
  styleUrls: ['./resume-file-uploder.component.scss']
})
export class ResumeFileUploderComponent implements OnInit {

  @ViewChild("fileUploader") fileUploader;
  @Input() public sourceFiles: any;
  @Output() public fileListChanged = new EventEmitter();

  fileIndexSelectionStatusList = [];
  fileUploaderActiveTabIndex = 0;
  isUploadingFiles = false;
  userId="";
  files="";
  categorizedFileList = null;
  isFileSelected = false;
  error:any;
  private selectedCategoryForFileAdd = null;
  

  @Input() allowMultipleFiles: boolean = true;
  public uploadedFiles: Array<File> = [];
  public isDisabled: boolean = false;

  constructor(private searchFileUpload:ResumeIntelligenceService, private authenticationService:AuthenticationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    let loggedInUserId = this.authenticationService.getAuthenticatedUser();
    let loggedInUser = this.authenticationService.getAuthenticatedUser();
    this.userId = loggedInUserId.userId.replace(/-/g,'');
    this.files = loggedInUser.files;
  }

  addFilesToList(){
    $('#filePickerModal').modal('toggle');
    let selectedFiles = this.sourceFiles.filter((element, index, array) => {
      return this.fileIndexSelectionStatusList[index];
    });

    selectedFiles = selectedFiles.map(f=>{
      return {...f, fileAction:"NONE"};
    });

    this.categorizedFileList[this.selectedCategoryForFileAdd] = this.categorizedFileList[this.selectedCategoryForFileAdd].concat(selectedFiles);
    for (let i = 0; i < this.fileIndexSelectionStatusList.length; i++) {
      this.fileIndexSelectionStatusList[i] = false;
    }
  }

  uploadFiles(){
    this.isUploadingFiles = true;

     let postData = {userId:this.userId};
     this.searchFileUpload.uploadFiles(postData,this.uploadedFiles,
      (result) => {
      this.isUploadingFiles = false;
      if(this.sourceFiles != undefined)
        this.sourceFiles = this.sourceFiles.concat(result);
        else
        this.sourceFiles=result;

        this.fileIndexSelectionStatusList = new Array(this.sourceFiles.length);
        this.fileIndexSelectionStatusList.fill(false);

        this.fileListChanged.emit(this.sourceFiles);
        this.showSuccessMessageToaster();
      }, (error) => {
        this.isUploadingFiles = false;
        this.showFailureMessageToaster(error);
      });


  }


  setFileUploaderActiveTabIndex(index) {
    this.fileUploaderActiveTabIndex = index;
  }

  fileSelected(){
    if(this.uploadedFiles.length > 0){
      this.isFileSelected = true;
    }
    
  }
  setSourceFiles(sourceFiles) {
    this.sourceFiles = sourceFiles;
   

    this.fileIndexSelectionStatusList = new Array(this.sourceFiles.length);
    this.fileIndexSelectionStatusList.fill(false);
  }
  showSuccessMessageToaster(){
    this.toastr.success("File Uploaded successfull");
}
showFailureMessageToaster(error){
  this.toastr.error("Server error, please try again after some time");
}
}
