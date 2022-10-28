import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resume-search-result',
  templateUrl: './resume-search-result.component.html',
  styleUrls: ['./resume-search-result.component.scss']
})
export class ResumeSearchResultComponent implements OnInit {
  @ViewChild ("SearchResultFileView") SearchResultFileView;
  @ViewChild ("ResumeAnalysisView") ResumeAnalysisView;

  constructor() { }

  sidePanelContent=[];
  pageContextText :string="";
  isProcessing :boolean = false;
  isSearchStarted:boolean=false;
  isContentLoaded:boolean = false;
  isFileSelected: boolean = false;
  ispdfviewr:string;
  txtSearchValue:string='';

  ngOnInit(): void {
  }

  setSearchResult(response,isProcessing,question){
    this.isSearchStarted=true;
    if(response.length >0){
      this.isContentLoaded = true;
    }else{
      this.isContentLoaded = false;
    }
     
    this.sidePanelContent=response;
    this.isProcessing=isProcessing;
    this.pageContextText="";
    this.txtSearchValue=question;
    }

    pageContentDisplay(item,context,indexVal){
      this.isFileSelected = true;

      //view is rendered conditionally based on file selection, so we need to schedule display on next render cycle
      setTimeout(()=> {
        if(item != null){
          var htmlContent = "<div class='text-left'>" + item.content[indexVal].pageContext + "</div>"
          this.pageContextText = htmlContent;
          var ext = item.fileName.substr(item.fileName.lastIndexOf('.') + 1);
          // if(ext=='pdf')
          //   {
              this.SearchResultFileView.loadPageContent(item,this.pageContextText);
              var trimtext=item.content[indexVal].context; 
              var plaintext=item.content[indexVal].pageContext; 
              trimtext=trimtext.replace('...','');
              trimtext = trimtext.substring(0, trimtext.indexOf('<span'));
              trimtext=trimtext+'' + this.txtSearchValue;
             this.SearchResultFileView.searchQueryChanged(trimtext,ext,plaintext);

            // }
            // else
            // {

            // //this.SearchResultFileView.loadPageContent(this.pageContextText);  ---coment by jagan 
            // this.SearchResultFileView.loadPageContent(item,this.pageContextText);
            // this.SearchResultFileView.searchQueryChanged(trimtext,ext);

            // }
        
          //Update Analysis View
          this.ResumeAnalysisView.updateAnalysis(item.fileId);

        }
      }, 100);

     
    }
  
    searchProgress(isProcessing){
     this.isProcessing=isProcessing;
     this.isContentLoaded = false;
     this.isFileSelected = false;
     }
     Openfile(items,i)
     {
       this.isFileSelected = true;
       var ext = items.fileName.substr(items.fileName.lastIndexOf('.') + 1);
    
        // this.SearchResultFileView.loadPageContent(items,this.pageContextText);
         setTimeout(()=> {
           if(items != null){
             var htmlContent = "<div class='text-left'>" + items.content[0].pageContext + "</div>"
             this.pageContextText = htmlContent;
             
             //this.SearchResultFileView.loadPageContent(this.pageContextText);  ---coment by jagan 
            this.SearchResultFileView.loadPageContent(items,this.pageContextText);
   
             //Update Analysis View
             this.ResumeAnalysisView.updateAnalysis(items.fileId);
   
           }
         }, 100);
   
       
      
       
     }

}
