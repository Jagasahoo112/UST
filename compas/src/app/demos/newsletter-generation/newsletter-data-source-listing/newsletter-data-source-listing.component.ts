import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'newsletter-data-source-listing',
  templateUrl: './newsletter-data-source-listing.component.html',
  styleUrls: ['./newsletter-data-source-listing.component.scss']
})
export class NewsletterDataSourceListingComponent implements OnInit {
  @Input() public sourceFiles: any;
  @Input() public newsletterServiceBaseUrl: string;

  @Output() public fileListChanged = new EventEmitter();

  @ViewChild("fileUploader") fileUploader;

  fileIndexSelectionStatusList = [];
  categorizedFileList = null;
  filePickerActiveTabIndex = 0;
  isUploadingFiles = false;

  private selectedCategoryForFileAdd = null;
  private _newsletterGenerationService = null;
  private _authenticationService = null;



  public get authenticationService() {
    return this._authenticationService;
  }
  public set authenticationService(value) {
    this._authenticationService = value;
  }


  public get newsletterGenerationService() {
    return this._newsletterGenerationService;
  }
  public set newsletterGenerationService(value) {
    this._newsletterGenerationService = value;
  }


  constructor() { }

  ngOnInit(): void {
    $('#filePickerModal').on('show.bs.modal', event => {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var fileCategory = button.data('fileCategory') // Extract info from data-* attributes

      this.selectedCategoryForFileAdd = fileCategory;
    });
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  onFileActionChanged(category, fileId, event) {
    let selectedAction = event.target.options[event.target.options.selectedIndex].value;
    this.categorizedFileList[category].filter(f=>{return f.fileId == fileId})[0].fileAction = selectedAction;
  }

  addFilesToList() {
    $('#filePickerModal').modal('toggle');
    let selectedFiles = this.sourceFiles.filter((element, index, array) => {
      return this.fileIndexSelectionStatusList[index];
    });

    selectedFiles = selectedFiles.map(f=>{
      return {...f, fileAction:"NONE"};
    });

    this.categorizedFileList[this.selectedCategoryForFileAdd] = this.categorizedFileList[this.selectedCategoryForFileAdd].concat(selectedFiles);


    //Reset Picker binding
    for (let i = 0; i < this.fileIndexSelectionStatusList.length; i++) {
      this.fileIndexSelectionStatusList[i] = false;
    }
  }

  deleteFile(fileId) {
    let loggedInUserId = this.authenticationService.getAuthenticatedUser().userId;
    this.newsletterGenerationService.deleteFile(fileId, loggedInUserId, 
      (result)=> {
        let index = this.sourceFiles.findIndex(x=>{return x.fileId == fileId;})
        this.sourceFiles.splice(index, 1);
      }, error=>{
        console.log(error);
      });
  }

  uploadFiles() {
    this.isUploadingFiles = true;

    let uploadUrl = this.newsletterGenerationService.getBaseUrl() +  "Api/UploadFiles";
    let loggedInUserId = this.authenticationService.getAuthenticatedUser().userId;
    let postData = {userId: loggedInUserId};

    this.fileUploader.uploadFiles(uploadUrl, postData, 
      (result) => {
        this.isUploadingFiles = false;
        this.sourceFiles = this.sourceFiles.concat(result);

        this.fileIndexSelectionStatusList = new Array(this.sourceFiles.length);
        this.fileIndexSelectionStatusList.fill(false);

        this.fileUploader.clear();

        this.fileListChanged.emit(this.sourceFiles);

      }, (error) => {
        this.isUploadingFiles = false;
        console.log(error);
      });
  }

  setFilePickerActiveTabIndex(index) {
    this.filePickerActiveTabIndex = index;
  }

  toggleFileSelection(fileIndex) {
    this.fileIndexSelectionStatusList[fileIndex] = !this.fileIndexSelectionStatusList[fileIndex];
  }

  isAnyFileSelected() {
    return (this.fileIndexSelectionStatusList.filter(x => x).length > 0);
  }

  setSourceFiles(sourceFiles) {
    this.sourceFiles = sourceFiles;

    // this.categorizedFileList = {
    //   "Go-Live Mails": this.sourceFiles.filter(r => r["contentType"] == "GO_LIVE_MAIL"),
    //   "Articles": this.sourceFiles.filter(r => r["contentType"] == "ARTICLE"),
    // };

    this.categorizedFileList = {
      "Introduction": [],
      "Articles": [],
      "Go-Live Mails": [],
      "Did You Know ?": []
    };

    this.fileIndexSelectionStatusList = new Array(this.sourceFiles.length);
    this.fileIndexSelectionStatusList.fill(false);
  }




  getFullAssetUrl(relativePath: string): string {
    return this.newsletterServiceBaseUrl + relativePath;
  }

  removeFile(category: string, fileId: string) {
    let fileList = this.categorizedFileList[category];

    let index = fileList.findIndex(f => f.fileId == fileId);
    fileList.splice(index, 1);

    console.log("removed index " + index);
  }

  reorderFile(category: string, fileId: string, direction: string) {

    let fileList = this.categorizedFileList[category];
    let oldIndex = fileList.findIndex(x => x.fileId == fileId);
    let newIndex = oldIndex;

    if (direction.toUpperCase() == "UP") {
      newIndex = Math.min(fileList.length, oldIndex - 1);
    } else if (direction.toUpperCase() == "DOWN") {
      newIndex = Math.max(0, oldIndex + 1);
    }

    fileList.splice(newIndex, 0, fileList.splice(oldIndex, 1)[0]);
  }

  getSelectedFiles() {
    var fileList = [];
    let categoryMap = {
      "Go-Live Mails": "GO_LIVE_MAILS",
      "Articles": "ARTICLES",
      "Introduction": "INTRODUCTION",
      "Did You Know ?": "DID_YOU_KNOW"
    };

    var categorizedFileList = {};

    for (let key in this.categorizedFileList) {
      let value = this.categorizedFileList[key];

      categorizedFileList[categoryMap[key]] = value.map(x=> {return {fileId: x.fileId, fileAction: x.fileAction};});
    }

    return categorizedFileList;
  }


}
