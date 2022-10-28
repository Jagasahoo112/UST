import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionAnsweringService } from 'src/app/services/question-answering.service'
import { QuestionAnsweringAnswerDetailsComponent } from './question-answering-answer-details/question-answering-answer-details.component';
import { QuestionAnsweringContentDisplayComponent } from './question-answering-content-display/question-answering-content-display.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-question-answering',
  templateUrl: './question-answering.component.html',
  styleUrls: ['./question-answering.component.scss']
})
export class QuestionAnsweringComponent implements OnInit {

  @ViewChild("questionAnsweringContentDisplayComponent") questionAnsweringContentDisplayComponent: QuestionAnsweringContentDisplayComponent;
  @ViewChild("questionAnsweringAnswerDetailsComponent") questionAnsweringAnswerDetailsComponent: QuestionAnsweringAnswerDetailsComponent

  userId = "";
  public isProcessing = false;
  public fileUploadStatus = true;
  languageSelectedStatus = false;
  constructor(private authenticationService: AuthenticationService, private questionAnsweringService: QuestionAnsweringService) { }

  ngOnInit(): void {
    let loggedInUser = this.authenticationService.getAuthenticatedUser();
    this.userId = loggedInUser.userId;
  }

  ngAfterViewInit() {
    this.questionAnsweringAnswerDetailsComponent.selectedAnswerHighligted.subscribe((result) => {
      this.questionAnsweringContentDisplayComponent.highlightAndScrollIntoView(result);
    });
    this.questionAnsweringContentDisplayComponent.fileUploaded.subscribe((result) => {
      this.fileUploadStatus = result;
      this.questionAnsweringAnswerDetailsComponent.fileUploadStatus = result;
    })
  }
  //getUploadedFileContent() {
  //     this.isProcessing = true;
  //     this.questionAnsweringService.getContent("123",
  //       r => {
  //         this.isProcessing = false;
  //         $("#filePickerModal1").modal('show');
  //         this.questionAnsweringContentDisplayComponent.sourceTextEditor.nativeElement.innerText = r[0].text;

  //       },
  //       e => {
  //         this.isProcessing = false;
  //       });
  // }

  reset() {
    this.questionAnsweringContentDisplayComponent.sourceTextEditor.nativeElement.innerText = "";
    this.questionAnsweringAnswerDetailsComponent.reset();
    this.fileUploadStatus = true;
    this.questionAnsweringAnswerDetailsComponent.fileUploadStatus = false;
    (<HTMLSelectElement>document.getElementById('languageId')).value = '0';
  }


  enableUploadButton(){
    var choice = (<HTMLSelectElement>document.getElementById('languageId')).value;
    var languageId: number = +choice;
    this.questionAnsweringContentDisplayComponent.languageId = languageId;
    this.questionAnsweringAnswerDetailsComponent.languageId = languageId;
  if ( choice !== '0') {
    this.languageSelectedStatus = true;
  } else {
    this.languageSelectedStatus = false;
  }
  }




}
