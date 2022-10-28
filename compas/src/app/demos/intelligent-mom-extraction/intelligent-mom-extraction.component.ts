import { Component, OnInit, ViewChild } from '@angular/core';
import { TextConversationSummaryService } from 'src/app/services/text-conversation-summary.service';
import { TextActionItemExtractionService } from 'src/app/services/text-action-item-extraction.service';

@Component({
  selector: 'app-intelligent-mom-extraction',
  templateUrl: './intelligent-mom-extraction.component.html',
  styleUrls: ['./intelligent-mom-extraction.component.scss']
})
export class IntelligentMomExtractionComponent implements OnInit {

  @ViewChild("intelligentMomConversationListing") intelligentMomConversationListing;
  @ViewChild("intelligentMomSummary") intelligentMomSummary;
  @ViewChild("intelligentMomActionItemsListing") intelligentMomActionItemsListing;

  isProcessing = false;

  constructor(private textConversationSummaryService: TextConversationSummaryService, private textActionItemExtractionService: TextActionItemExtractionService) { }

  ngOnInit(): void {
  }

  extractMom() {

    let conversationText = this.intelligentMomConversationListing.getConversationText();

    let summaryComplete = false;
    let actionItemsExtractionComplete = false;

    //Generate Summary
    this.intelligentMomSummary.isProcessing = true;

    this.textConversationSummaryService.summarizeText(conversationText, (response) => {
      let summaryText = response;
      this.intelligentMomSummary.setSummaryText(summaryText);
      summaryComplete = true;
      this.intelligentMomSummary.isProcessing = false;

      this.isProcessing = !(summaryComplete && actionItemsExtractionComplete);
    }, (err) => {
      console.log(err);
      summaryComplete = true;
      this.intelligentMomSummary.isProcessing = false;
      this.isProcessing = !(summaryComplete && actionItemsExtractionComplete);
    });


     //Extract Action Items
     this.intelligentMomActionItemsListing.isProcessing = true;

     this.textActionItemExtractionService.extractActionItems (conversationText, (response) => {
      console.log(response);
      this.intelligentMomActionItemsListing.setActionItems(response);
      actionItemsExtractionComplete = true;
      this.intelligentMomActionItemsListing.isProcessing = false;
      this.isProcessing = !(summaryComplete && actionItemsExtractionComplete);
      }, (err) => {
        console.log(err);
        actionItemsExtractionComplete = true;
        this.intelligentMomActionItemsListing.isProcessing = false;
        this.isProcessing = !(summaryComplete && actionItemsExtractionComplete);
      });

  }

  reset() {
    this.intelligentMomConversationListing.reset();
  }



}
