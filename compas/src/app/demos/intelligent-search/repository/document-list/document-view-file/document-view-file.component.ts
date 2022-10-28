import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-view-file',
  templateUrl: './document-view-file.component.html',
  styleUrls: ['./document-view-file.component.scss']
})
export class DocumentViewFileComponent implements OnInit {

  constructor() { }

  pageFileContent:string;
  processingFlag:boolean;


  ngOnInit(): void {
  }

  loadPageContent(pageContent){
    this.pageFileContent=pageContent;
    this.processingFlag=true;
  }

}
