import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'intelligent-mom-action-items-listing',
  templateUrl: './intelligent-mom-action-items-listing.component.html',
  styleUrls: ['./intelligent-mom-action-items-listing.component.scss']
})
export class IntelligentMomActionItemsListingComponent implements OnInit {

  actionItems = [];
  isProcessing = false;
  actionItemsViewModel = [];

  constructor() { }

  ngOnInit(): void {
  }

  setActionItems(actionItems) {
    this.actionItems = actionItems;
    this.actionItemsViewModel = [];

    this.actionItems.forEach(chunk=>{
      chunk["entities"].forEach(entity=> {
        let actionItem = {
          assignor : chunk.assignor,
          assignee: entity.assignee,
          task: entity.task,
          targetDate: entity.targetDate
        };

        this.actionItemsViewModel.push(actionItem);

      });
    });

  }

}
