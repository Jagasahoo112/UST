import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { QuestionAnsweringService } from 'src/app/services/question-answering.service'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { from } from 'rxjs';

declare var $: any;

@Component({
  selector: 'question-answering-content-display',
  templateUrl: './question-answering-content-display.component.html',
  styleUrls: ['./question-answering-content-display.component.scss']
})
export class QuestionAnsweringContentDisplayComponent implements OnInit {

  @Output() public fileUploaded = new EventEmitter();

  @ViewChild("sourceTextEditor") sourceTextEditor;
  @ViewChild("fileUploader") fileUploader;

  constructor(private questionAnsweringService: QuestionAnsweringService, private authService: AuthenticationService) { }

  isUploadingFile = false;
  originalText: string = "";
  htmlText: string = "";
  userId = "";
  reset: string = "true";
  isFileSelected = false;
  languageId: number = 0 ;


  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId;
    (<any>$('#sourceTextEditor')).trumbowyg({
      btns: [["fullscreen"]],
      svgPath: "assets/images/icons.svg"
    });
    window.scrollTo(0, 0)
  }

  public uploadFile() {

    let baseUrl = "http://20.67.178.20/";
    this.isUploadingFile = true;
    //let uploadUrl = "http://20.82.217.66/Api/DocumentUpload";
    let uploadUrl = "";
    if(this.languageId == 1){
      //http://20.54.16.192/Api/DocumentUpload
      uploadUrl = baseUrl+"questionansweringmodel/Api/DocumentUpload";
    }else{
      uploadUrl = baseUrl+"multiquestionanswering/Api/DocumentUpload";
    }
    
    let postData = { context: this.userId,languageId: this.languageId };
    this.fileUploader.uploadQuestionAnswerFiles(uploadUrl, postData,
      (result) => {
        this.questionAnsweringService.getContent(this.userId,this.languageId,
          r => {
            if (r[0].message === 'failed') {
              $("#fileExtractFailedModal").modal('show');
              this.sourceTextEditor.nativeElement.innerText = "";
              this.fileUploaded.emit(false);
            } else {
              this.sourceTextEditor.nativeElement.innerText = r[0].text;
              this.isUploadingFile = false;
              this.fileUploaded.emit(true);
            }

            this.fileUploader.clear();
            this.isUploadingFile = false;
            $("#filePickerModal").modal("hide")

          },
          e => {
            $("#fileExtractFailedModal").modal('show');
            this.fileUploader.clear();

            $("#filePickerModal").modal("hide")
            this.fileUploaded.emit(false);
          });



      }, (error) => {
        $("#fileExtractFailedModal").modal('show');
        this.isUploadingFile = false;
      });
  }

  highlightAndScrollIntoView(item) {


    let originalText = this.sourceTextEditor.nativeElement.innerText;
    this.originalText = originalText;
    this.htmlText = originalText;
    this.hilightSentence(item.offset_start, item.offset_end);
  }
  clearSelectedFiles() {
    this.fileUploader.clear();
    this.isFileSelected = false;
  }
  private hilightSentence(startIndex: number, endIndex: number) {

    let tagStart = `<span id="highlightedText" class='badge badge-pill badge-warning'>`;
    let tagEnd = "</span>";

    //let offsetLength = tagStart.length + tagEnd.length;
    this.htmlText = this.insertSubstring(this.htmlText, tagStart, startIndex);
    this.htmlText = this.insertSubstring(this.htmlText, tagEnd, endIndex + tagStart.length);

    // this.sourceTextEditor.nativeElement.scrollIntoView(startIndex, "smooth");
    this.setEditorHtml(this.htmlText);
    let highlightedText = document.getElementById("highlightedText");
    highlightedText.scrollIntoView();
    window.scrollTo(0, 0)
    return [tagStart.length, tagEnd.length];

  }

  private insertSubstring(sourceString: string, subString: string, index: number) {
    let result = sourceString.slice(0, index) + subString + sourceString.slice(index);
    return result;
  }

  private setEditorHtml(htmlText: string) {
    let displayHtml = `<div >${htmlText}</div>`;
    $('#sourceTextEditor').trumbowyg('html', displayHtml);
  }
  ngAfterViewInit() {
    this.fileUploader.fileChoosed.subscribe((result) => {
      this.isFileSelected = result;
    });

  }
}
