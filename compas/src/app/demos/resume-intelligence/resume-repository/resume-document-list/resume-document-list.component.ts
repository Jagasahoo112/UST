import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumeIntelligenceService } from 'src/app/services/resume-intelligence.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


export class ResumeSearchInfo {
  fileName: string;
  content: string;
}


@Component({
  selector: 'app-resume-document-list',
  templateUrl: './resume-document-list.component.html',
  styleUrls: ['./resume-document-list.component.scss']
})
export class ResumeDocumentListComponent implements OnInit {

  @ViewChild("resumeDocumentViewFileComponent") resumeDocumentViewFileComponent;
  @ViewChild("resumeRepositorySearchComponent") resumeRepositorySearchComponent;

  public searchResult: ResumeSearchInfo[];
  userId = "";
  searchFilter = "";
  answerItems = [];
  isProcessing = false;
  pageContextText: string = "";
  sidePanelContent;
  isInitLoad: boolean;
  isContentLoaded:boolean = false;
  txtSearchValue:string='';

  constructor(private searchFileUpload: ResumeIntelligenceService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isInitLoad = true;
    this.isContentLoaded = true;
    let loggedInUserId = this.authenticationService.getAuthenticatedUser();
    this.userId = loggedInUserId.userId.replace(/-/g, '');
  }



  ngAfterViewInit() {

    this.resumeRepositorySearchComponent.resumeSearch.subscribe((searchKeyword) => {
      this.sidePanelContent = [];
      this.isInitLoad = true;
      this.isContentLoaded = true;

      let loggedInUserId = this.authenticationService.getAuthenticatedUser();
      this.userId = loggedInUserId.userId.replace(/-/g, '');
      this.searchFileUpload.getResumeList(this.userId, searchKeyword,
        (result) => {
          this.searchResult = [];
          if (result.length == 0) {
            this.isInitLoad = true;
          }
          else {
            this.isInitLoad = false;
          }
          this.sidePanelContent = result;
          this.answerItems = result;

          var searchInfo = new ResumeSearchInfo();

          this.answerItems.forEach(chunk => {
            searchInfo.content = chunk.content;
            searchInfo.fileName = chunk.fileName;
            this.searchResult.push(searchInfo);
          })

          this.isProcessing = false;
          if (this.isProcessing == false) {
            this.resumeRepositorySearchComponent.setSearchResult(this.searchResult, this.isProcessing); // to the side panel
          }


        }, (error) => {
          this.isProcessing = false;
        });
    });

  }

  loadSidePanelContent(input) {
    this.sidePanelContent = input;
  }

  pageContentDisplay(item, indexVal, index) {

    this.isContentLoaded = false;

    //view is rendered conditionally based on file selection, so we need to schedule display on next render cycle
    setTimeout(()=> {
      if(item != null){ 
        var ext = item.fileName.substr(item.fileName.lastIndexOf('.') + 1);        
            this.resumeDocumentViewFileComponent.loadPageContent(item,this.pageContextText);         
      }
    }, 100);

   
  }


}
