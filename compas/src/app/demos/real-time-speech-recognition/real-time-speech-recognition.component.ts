import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionAnsweringService } from 'src/app/services/question-answering.service';

declare const initSpeechRecognition: any;

declare var $: any;
@Component({
  selector: 'app-real-time-speech-recognition',
  templateUrl: './real-time-speech-recognition.component.html',
  styleUrls: ['./real-time-speech-recognition.component.scss'],
})
export class RealTimeSpeechRecognitionComponent implements OnInit {
  @ViewChild('sourceTextEditor') sourceTextEditor;
  // @ViewChild('fileUploader') fileUploader;
  constructor(
    private questionAnsweringService: QuestionAnsweringService,
    private authService: AuthenticationService
  ) {}

  conversationText = '';
  userId = '';

  ngOnInit(): void {
    (<any>$('#phraseDiv')).trumbowyg({
      btns: [[]],
      svgPath: 'assets/images/icons.svg',
    });
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId;
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    initSpeechRecognition();
    // this.fileUploader.fileChoosed.subscribe((result) => {
    //   this.isFileSelected = result;
    // });
  }

  enablePlay() {
    // if (this.sourceTextEditor.nativeElement.innerText.trim() !== '') {
    //   this.textValidated = true;
    // } else {
    //   this.textValidated = false;
    // }
  }

  reset() {
    // console.log('Reset');
    // (<HTMLSelectElement>(
    //   document.getElementById('languageSourceOptions')
    // )).value = 'de-DE';
    // (<HTMLSelectElement>(
    //   document.getElementById('languageTargetOptions')
    // )).value = 'de-DE';
    // document.getElementById('phraseDiv').textContent = '';
  }
}
