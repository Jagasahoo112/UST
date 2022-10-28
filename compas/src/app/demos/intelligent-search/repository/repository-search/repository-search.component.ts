import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrls: ['./repository-search.component.scss']
})
export class RepositorySearchComponent implements OnInit {

  @ViewChild ("documentViewComponent") documentViewComponent;
  @Output() public fileSearch = new EventEmitter();


  constructor() { }

  isProcessing:boolean;
  isSearchStarted:boolean = false;
  sidePanelContent=[];
  
 

  ngOnInit(): void {
  }

  searchFile(){
    this.isProcessing = true;
    var searchKeyword = (<HTMLSelectElement>document.getElementById('fileKeyword')).value;
    this.fileSearch.emit(searchKeyword);
  }

  setSearchResult(response,isProcessing){
    if(response.length == 0){
      this.isSearchStarted = true;
    }
    else{
      this.isSearchStarted = false;
    }
    
    this.sidePanelContent = response;
    this.isProcessing = isProcessing;
  }

  searchProgress(isProcessing){
    this.isProcessing = isProcessing;
  }

}
