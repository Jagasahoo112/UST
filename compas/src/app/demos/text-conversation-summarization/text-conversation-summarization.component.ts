import { Component, OnInit, ViewChild } from '@angular/core';
import {TextConversationSummaryService} from "../../services/text-conversation-summary.service";

@Component({
  selector: 'text-conversation-summarization',
  templateUrl: './text-conversation-summarization.component.html',
  styleUrls: ['./text-conversation-summarization.component.scss']
})
export class TextConversationSummarizationComponent implements OnInit {
  @ViewChild("resultTextArea") resultTextArea;
  @ViewChild("sourceTextArea") sourceTextArea;

  public isProcessing = false;

  constructor(private summarizer: TextConversationSummaryService) { }



  ngOnInit(): void {
  }
  paraphrase(){

    this.isProcessing = true;
    let text = this.sourceTextArea.nativeElement.value;

    this.summarizer.summarizeText(text, 
        r=>{
          this.resultTextArea.nativeElement.value = r.toString();
          this.isProcessing = false;
        },
        e=>{
          this.resultTextArea.nativeElement.value = e.toString();
          this.isProcessing = false;
        });
  }

  reset() {
    this.sourceTextArea.nativeElement.value = "";
    this.resultTextArea.nativeElement.value = "";   
  }
}
