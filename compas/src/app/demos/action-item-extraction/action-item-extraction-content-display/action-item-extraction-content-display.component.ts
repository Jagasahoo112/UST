import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';



declare var $: any;

@Component({
  selector: 'action-item-extraction-content-display',
  templateUrl: './action-item-extraction-content-display.component.html',
  styleUrls: ['./action-item-extraction-content-display.component.scss']
})
export class ActionItemExtractionContentDisplayComponent implements OnInit {
  @Output() public fileUploaded = new EventEmitter();


  @ViewChild("sourceTextEditor") sourceTextEditor;

  constructor() { }

  isFileSelected = false;
  isUploadingFile = false;
  conversationText = "";

  ngOnInit(): void {
  }
}
