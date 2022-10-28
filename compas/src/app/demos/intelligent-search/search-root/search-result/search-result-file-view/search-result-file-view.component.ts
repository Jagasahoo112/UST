import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-file-view',
  templateUrl: './search-result-file-view.component.html',
  styleUrls: ['./search-result-file-view.component.scss']
})
export class SearchResultFileViewComponent implements OnInit {

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
