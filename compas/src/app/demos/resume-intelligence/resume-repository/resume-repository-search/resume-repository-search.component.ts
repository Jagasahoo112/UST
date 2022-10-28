import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resume-repository-search',
  templateUrl: './resume-repository-search.component.html',
  styleUrls: ['./resume-repository-search.component.scss']
})
export class ResumeRepositorySearchComponent implements OnInit {
  @ViewChild ("ResumeDocumentViewComponent") ResumeDocumentViewComponent;
  @Output() public resumeSearch = new EventEmitter();
  

  constructor() { }

  isProcessing:boolean;
  sidePanelContent=[];
  isSearchStarted:boolean=false;
  
  ngOnInit(): void {
  }

  searchResume(){
    this.isProcessing = true;
    var searchKeyword = (<HTMLSelectElement>document.getElementById('resumeKeyword')).value;
    this.resumeSearch.emit(searchKeyword);
  }

  

  setSearchResult(response,isProcessing) {
    if(response.length == 0){
      this.isSearchStarted = true;
    }
    else{
      this.isSearchStarted = false;
    }

    this.sidePanelContent=response;
    this.isProcessing=isProcessing;
  }
  searchProgress(isProcessing){
    this.isProcessing=isProcessing;
   }

}
