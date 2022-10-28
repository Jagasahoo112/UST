import { Component, OnInit, ViewChild } from '@angular/core';
import { IntelligentSearchFileuploaderService } from 'src/app/services/intelligent-search-fileuploader.service';
import { AuthenticationService } from './../../../../services/authentication.service';

export class IntelligentSearchInfo{
  fileName:string;
  content:string;
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  @ViewChild ("repositorySearchComponent") repositorySearchComponent;
  @ViewChild ("documentViewFileComponent") documentViewFileComponent;

  public searchResult: IntelligentSearchInfo[];
  answerItems = [];
  sidePanelContent;
  isInitLoad:boolean;
  userId="";
  isProcessing=false;
  pageContextText : string="";
  isContentLoaded:boolean = false;

  constructor(private searchFileUpload: IntelligentSearchFileuploaderService,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.isInitLoad = true;
    this.isContentLoaded = true;
    let loggedInUserId = this.authenticationService.getAuthenticatedUser();
    this.userId = loggedInUserId.userId.replace(/-/g, '');
  }

  ngAfterViewInit(){
    this.repositorySearchComponent.fileSearch.subscribe((searchKeyword) => {
      this.sidePanelContent = [];
      this.isInitLoad = true;
      this.isContentLoaded = true;

      let loggedInUserId = this.authenticationService.getAuthenticatedUser();
      this.userId = loggedInUserId.userId.replace(/-/g, '');

      this.searchFileUpload.getFileList(this.userId,searchKeyword,
        (result) => {
          this.searchResult=[];
          if(result.length == 0){
            this.isInitLoad = true;
          }
          else{
            this.isInitLoad = false;
          }
          
          this.sidePanelContent = result;
          this.answerItems = result;

          var searchInfo = new IntelligentSearchInfo();

          this.answerItems.forEach(chunk => {
            searchInfo.content = chunk.content;
            searchInfo.fileName = chunk.fileName;
            this.searchResult.push(searchInfo);
          })
         
          this.isProcessing = false;
          if(this.isProcessing == false){
            this.repositorySearchComponent.setSearchResult(this.searchResult, this.isProcessing);
          }
        }, (error) => {
          this.isProcessing=false;
        });
    });
  }

  loadSidePanelContent(input){
    this.sidePanelContent = input;
  }

  pageContentDisplay(item,indexVal,index){
    this.isContentLoaded = false;
    const div = document.getElementsByClassName('list-group-item');
    for (var i = 0; i < div.length; i++) {
      div[i].classList.remove('active');
    }

    var element = document.getElementById('files' + index);
    element.classList.add('active');

    if (item != null) {
      var htmlContent = "<div class='text-left'>" + item.content + "</div"
      this.pageContextText = htmlContent;
      this.documentViewFileComponent.loadPageContent(this.pageContextText);
    }  
  }
}
