import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { QuestionAnsweringService } from 'src/app/services/question-answering.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare const speechRecognitionForQuestionAnswering: any;

declare const speechRecognitionForAskingQuestion: any;
declare const initTextToSpeech: any;


@Component({
  selector: 'question-answering-answer-details',
  templateUrl: './question-answering-answer-details.component.html',
  styleUrls: ['./question-answering-answer-details.component.scss'],
})
export class QuestionAnsweringAnswerDetailsComponent implements OnInit {
  @Output() public selectedAnswerHighligted = new EventEmitter();

  @ViewChild('sourceTextArea') sourceTextArea;

  constructor(
    private questionAnsweringService: QuestionAnsweringService,
    private authService: AuthenticationService
  ) {}

  public isProcessing = false;
  public fileUploadStatus = false;
  userId = '';
  answerItemsViewModel = [];
  answerItems = [];
  private playText ;
  private stopPlay;
  languageId: number = 0 ;

  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId;
  }
  searchAnswer() {
    let question = this.sourceTextArea.nativeElement.value;
    if (question.length > 0) {
      this.answerItemsViewModel = [];
      this.answerItems = [];
      this.isProcessing = true;
      this.questionAnsweringService.getAnswer(
        question,
        this.userId,
        this.languageId,
        (r) => {
          this.answerItems = r.answers;
          this.answerItems.forEach((chunk) => {

            
            let context = this.highlightTextInContext(
              chunk.context,
              chunk.offset_start,
              chunk.offset_end
            );

            if (chunk.probability > 0.1) {
              let actionItem = {
                answer: chunk.answer,
                context: context,
                probability: chunk.probability,
                score: chunk.score,
                offset_start: chunk.offset_start_in_doc,
                offset_end: chunk.offset_end_in_doc,
                content: chunk.context,
              };

              this.answerItemsViewModel.push(actionItem);
            }
          });
          if (this.answerItemsViewModel.length === 0) {
            let actionItem = {
              answer: 'No answer found',
              context: '',
              probability: '',
              score: 0,
              offset_start: '',
              offset_end: '',
            };
            this.answerItemsViewModel.push(actionItem);
            // console.log('answer NOT found', this.answerItems);
          } else {
            //textToSpeechForQuestionAnswering();
            // console.log('answer found', this.answerItems[0]);
          }
          this.isProcessing = false;
        },
        (e) => {
          this.isProcessing = false;
        }
      );
    }
  }

  highlightTextInContext(context, start, end) {
    let tagStart = `<span class='badge badge-pill badge-warning text-wrap'>`;
    let tagEnd = '</span>';
    context = this.insertSubstring(context, tagStart, start);
    context = this.insertSubstring(context, tagEnd, end + tagStart.length);
    return context;
  }

  highlightAndScrollIntoView(selectedAnswerItem) {
    this.selectedAnswerHighligted.emit(selectedAnswerItem);
  }
  public reset() {
    this.sourceTextArea.nativeElement.value = '';
    this.answerItemsViewModel = [];
    this.answerItems = [];
    this.isProcessing = false;
  }

  private insertSubstring(
    sourceString: string,
    subString: string,
    index: number
  ) {
    let result =
      sourceString.slice(0, index) + subString + sourceString.slice(index);
    return result;
  }

  ngAfterViewInit() {
    speechRecognitionForQuestionAnswering((x,y) => {
    this.playText = x;
    this.stopPlay = y;
    });
    speechRecognitionForAskingQuestion();
   //initTextToSpeech();
  }

  start(answer){
    answer = answer.replace(/[^a-zA-Z0-9:(),.]/g, ' ');
    this.playText(answer);
  }

  stopAudioPlay(){
    this.stopPlay();

  }

  
}
