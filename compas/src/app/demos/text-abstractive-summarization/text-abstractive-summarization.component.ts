import { Component, OnInit, ViewChild } from '@angular/core';
import {TextAbstractiveSummarizationService} from "../../services/text-abstractive-summarization.service";

@Component({
  selector: 'text-abstractive-summarization',
  templateUrl: './text-abstractive-summarization.component.html',
  styleUrls: ['./text-abstractive-summarization.component.scss']
})
export class TextAbstractiveSummarizationComponent implements OnInit {
  @ViewChild("resultTextArea") resultTextArea;
  @ViewChild("sourceTextArea") sourceTextArea;

  public isProcessing = false;

  constructor(private summarizer: TextAbstractiveSummarizationService) { }

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
