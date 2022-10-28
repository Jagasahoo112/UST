import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionAnsweringService } from 'src/app/services/question-answering.service'

declare const initTextToSpeech: any;
declare var $: any;

@Component({
  selector: 'text-to-speech-conversion',
  templateUrl: './text-to-speech-conversion.component.html',
  styleUrls: ['./text-to-speech-conversion.component.scss']
})
export class TextToSpeechConversionComponent implements OnInit {

  @ViewChild("sourceTextEditor") sourceTextEditor;
  @ViewChild("fileUploader") fileUploader;

  constructor(private questionAnsweringService: QuestionAnsweringService, private authService: AuthenticationService) { }
  isFileSelected = false;
  isUploadingFile = false;
  conversationText = "";
  userId = "";
  textValidated = false;

  ngOnInit(): void {
    (<any>$('#synthesisText')).trumbowyg({
      btns: [[]],
      svgPath: "assets/images/icons.svg"
    });
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId;
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    initTextToSpeech();
    this.fileUploader.fileChoosed.subscribe((result) => {
      this.isFileSelected = result;
    });
  }

  uploadFile() {
    this.isUploadingFile = true;
   // let uploadUrl = "http://20.54.16.192/Api/DocumentUpload";
   let uploadUrl = "http://20.67.178.20/questionansweringmodel/Api/DocumentUpload";
    let postData = { context: this.userId };
    this.fileUploader.uploadQuestionAnswerFiles(uploadUrl, postData,
      (result) => {

        this.questionAnsweringService.getContent(this.userId,0,
          r => {

            if (r[0].message === 'failed') {
              $("#fileExtractFailedModal").modal('show');
              this.sourceTextEditor.nativeElement.innerText = "";
              this.textValidated = false;
            } else {
              let extractedText  = r[0].text;
             // extractedText = extractedText.replace(/[&]/g, ' ');
             extractedText = extractedText.replace(/[^a-zA-Z0-9:(),.]/g, ' ');
              this.sourceTextEditor.nativeElement.innerText = extractedText;
              this.isUploadingFile = false;
              this.textValidated = true;
            }
            this.fileUploader.clear();
            this.isUploadingFile = false;
            $("#filePickerModal").modal("hide")
          },
          e => {
            $("#fileExtractFailedModal").modal('show');
            this.fileUploader.clear();
            $("#filePickerModal").modal("hide")

          });
      }, (error) => {
        $("#fileExtractFailedModal").modal('show');
        this.isUploadingFile = false;
      });

  }

  clearSelectedFiles() {
    this.fileUploader.clear();
    this.isFileSelected = false;
  }

  enablePlay() {
    if (this.sourceTextEditor.nativeElement.innerText.trim() !== "") {
      this.textValidated = true;
    } else {
      this.textValidated = false;
    }
  }

  reset() {
    this.textValidated = false;
  }
}
