import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionItemExtractionContentDisplayComponent } from './action-item-extraction-content-display/action-item-extraction-content-display.component';
import { ActionItemExtractionListItemsComponent } from './action-item-extraction-list-items/action-item-extraction-list-items.component';
import { AudioActionItemExtractionService } from 'src/app/services/audio-action-item-extraction.service'
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'action-item-extraction',
  templateUrl: './action-item-extraction.component.html',
  styleUrls: ['./action-item-extraction.component.scss']
})
export class ActionItemExtractionComponent implements OnInit {

  @ViewChild("actionItemExtractionContentDisplay") actionItemExtractionContentDisplay: ActionItemExtractionContentDisplayComponent;
  @ViewChild("actionItemExtractionListItems") actionItemExtractionListItems: ActionItemExtractionListItemsComponent
 
  @ViewChild("sourceTextEditor") sourceTextEditor;
  @ViewChild("fileUploader") fileUploader;
  constructor(private authService: AuthenticationService, private actionItemExtractionService: AudioActionItemExtractionService) { }


  public isProcessing = false;
  assigneeList = [];
  modalData = "";
  fileUploadStatus = false;
  
  isFileSelected = false;
  isUploadingFile = false;
  userId = "";

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId;
  }
  
  
  ngAfterViewInit() {
    this.actionItemExtractionContentDisplay.fileUploaded.subscribe((result) => {
      this.fileUploadStatus = result;
    });
    this.fileUploader.fileChoosed.subscribe((result) => {
      this.isFileSelected = result;
    });
  }
  reset() {
    this.actionItemExtractionListItems.sourceTextAreaPlanId.nativeElement.value = "";
    this.actionItemExtractionListItems.sourceTextArea.nativeElement.value = "";
    this.actionItemExtractionContentDisplay.conversationText = "";
    this.actionItemExtractionListItems.actionItemsViewModel = [];
    this.actionItemExtractionListItems.actionItems = [];
    this.actionItemExtractionListItems.tokenStatus = false;

  }

  uploadFile() {

    this.isUploadingFile = true;

    //let uploadUrl = "http://20.82.217.66/Api/DocumentUpload";
    //let uploadUrl = "http://20.82.173.47/api/UploadFiles";
    let uploadUrl = "http://20.67.178.20/speechtotext/api/UploadFiles";
    let postData = { userId: this.userId };
    this.fileUploader.uploadActionItemExtractorFiles(uploadUrl, postData,
      (result) => {
        this.actionItemExtractionContentDisplay.conversationText = result[0].transcript;
        this.actionItemExtractionListItems.content = result[0].transcript;
        this.fileUploader.clear();
        this.isUploadingFile = false;
        $("#filePickerModal").modal("hide")
        // this.fileUploaded.emit(true);
        this.actionItemExtractionListItems.fileUploadStatus = true;

      }, (error) => {
        $("#fileExtractFailedModal").modal('show');
        this.isUploadingFile = false;
        //this.fileUploaded.emit(false);
        this.fileUploadStatus = false;
      });

  }
  clearSelectedFiles() {
    this.fileUploader.clear();
    this.isFileSelected = false;
  }

}
