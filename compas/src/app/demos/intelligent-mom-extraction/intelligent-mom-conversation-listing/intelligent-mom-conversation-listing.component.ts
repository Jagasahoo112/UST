import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'intelligent-mom-conversation-listing',
  templateUrl: './intelligent-mom-conversation-listing.component.html',
  styleUrls: ['./intelligent-mom-conversation-listing.component.scss']
})
export class IntelligentMomConversationListingComponent implements OnInit {

  @ViewChild("sourceTextEditor") sourceTextEditor;
  @ViewChild("fileUploader") fileUploader;


  conversationText = "";
  isUploadingFile = false;

  constructor() { }

  ngOnInit(): void {
    // (<any>$('#sourceTextEditor')).trumbowyg();
  //   (<any>$('#sourceTextEditor')).trumbowyg({
  //     semantic : false,
  //     btns: [["fullscreen"]],
  //     svgPath: "assets/images/icons.svg" // or a path like '/assets/my-custom-path/icons.svg'
  // });

 
  }

  public getConversationText() {
    return this.conversationText;
   // return this.sourceTextEditor.nativeElement.textContent;
  }

  public reset() {
    this.conversationText = "";
  }

  public uploadFile() {
    this.isUploadingFile = true;

    //let uploadUrl = "http://20.82.217.66/Api/DocumentUpload";
    let uploadUrl = "http://20.67.178.20/wordfileupload/Api/DocumentUpload";
    let postData = {};

    this.fileUploader.uploadFiles(uploadUrl, postData, 
      (result) => {
        this.isUploadingFile = false;
 

        this.fileUploader.clear();
        this.conversationText = result;

        $("#filePickerModal").modal("hide");

      }, (error) => {
        this.isUploadingFile = false;
        console.log(error);
      });
  }

}
