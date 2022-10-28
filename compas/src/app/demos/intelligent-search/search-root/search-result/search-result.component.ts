import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @ViewChild ("SearchResultFileView") SearchResultFileView;

  constructor() { }

  sidePanelContent=[];
  pageContextText :string="";
  isProcessing :boolean;
  isSearchStarted:boolean=false;
  isContentLoaded:boolean = false;

  ngOnInit(): void {
  }

  setSearchResult(response,isProcessing){
    this.isSearchStarted=true;
    if(response.length > 0){
      this.isContentLoaded = true;
    }else{
      this.isContentLoaded = false;
    }
    
    this.sidePanelContent=response;
    this.isProcessing=isProcessing;
    this.pageContextText="";
    }
  
    pageContentDisplay(item,context,indexVal){
      this.isContentLoaded = false;

      setTimeout(() => {
        if(item != null){
          var htmlContent = "<div class='text-left'>" + item.content[indexVal].pageContext + "</div"
          this.pageContextText = htmlContent;
          this.SearchResultFileView.loadPageContent(this.pageContextText);
      }
      
      }, 100);
    }
  
    searchProgress(isProcessing){
     this.isProcessing=isProcessing;
     this.isContentLoaded = false;
    }

}
