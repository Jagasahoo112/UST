import { Component, OnInit } from '@angular/core';
import { TextConversationSummaryService } from 'src/app/services/text-conversation-summary.service';

@Component({
  selector: 'intelligent-mom-summary',
  templateUrl: './intelligent-mom-summary.component.html',
  styleUrls: ['./intelligent-mom-summary.component.scss']
})
export class IntelligentMomSummaryComponent implements OnInit {

  summaryText = "";
  isProcessing = false;

  constructor() { }

  ngOnInit(): void {
  }

  setSummaryText(summaryText: string) {
    this.summaryText = summaryText;
  }

}
