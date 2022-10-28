import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {IntelligentSearchFileuploaderService} from 'src/app/services/intelligent-search-fileuploader.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderIntelligentSearchComponent implements OnInit {

  @ViewChild("fileUploader") fileUploader;
  @Input() public sourceFiles: any;
  @Output() public fileListChanged = new EventEmitter();
  @Output() public lineCategorySelected = new EventEmitter();

  fileIndexSelectionStatusList = [];
  fileUploaderActiveTabIndex = 0;
  isUploadingFiles = false;
  userId="";
  files="";
  details="";
  categorizedFileList = null;
  isFileSelected = false;
  private selectedCategoryForFileAdd = null;
  selectedLine="null";

  @Input() allowMultipleFiles: boolean = true;
  public uploadedFiles: Array<File> = [];
  public isDisabled: boolean = false;

  tagListArray = [];

  newLine = this.getNewLine();
  

  constructor(private searchFileUpload:IntelligentSearchFileuploaderService, private authenticationService:AuthenticationService,private toastr: ToastrService) { }

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
     console.log("newlineee",this.newLine.lineValues)

     let region = document.getElementsByClassName('region');
     let serviceLine = document.getElementsByClassName('serviceLine');

     let regionArray = [].map.call(region, item => item.value);
     let serviceLineArray = [].map.call(serviceLine, item => item.value);

     

     regionArray.forEach((assign, index) => {
      let details = {[assign]: serviceLineArray[index]};
      this.tagListArray.push(details);
      

     });
     this.tagListArray = this.tagListArray.reduce(((r, c) => Object.assign(r, c)), {})
     console.log("detailsss",this.tagListArray);
     this.searchFileUpload.uploadFiles(postData,this.uploadedFiles,this.tagListArray,
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
      },(error) => {
        this.isUploadingFiles = false;
        this.showFailureMessageToaster(error);
      });     
  }

  createNewLine(){
    this.newLine.lineValues.push({
      lineName:"",
     region:""
    })
  }

  getNewLine(){
    return{
     
      lineValues: [
        {
          lineName : "",
          region:""
        }
      ]
    }
  }

  onLineCategorySelected(line) {
    this.lineCategorySelected.emit(line.lineCategory);
    this.selectedLine = line;
  }

  removeNewLineIndex(index){
    this.newLine.lineValues.splice(index,1);
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
