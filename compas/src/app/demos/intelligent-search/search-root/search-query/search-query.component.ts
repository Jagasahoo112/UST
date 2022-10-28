import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TrailingTextPipe } from 'src/app/pipes/trailing-text.pipe';
import { IntelligentSearchFileuploaderService } from 'src/app/services/intelligent-search-fileuploader.service';


export class IntelligentSearchInfo {
  fileName:string;
  content: SearchContentInfo[]
}
export class SearchContentInfo
{
  context: string;
  pageContext: string;
}

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.scss']
})
export class SearchQueryComponent implements OnInit {

  @ViewChild("sourceTextArea") sourceTextArea;
  @ViewChild("intelligentSearchResult") intelligentSearchResult;
  @ViewChild("sourceTextAreaSuggestion") sourceTextAreaSuggestion;

  public searchResult: IntelligentSearchInfo[];

  constructor(private authService: AuthenticationService,
    private intSearchService:IntelligentSearchFileuploaderService,
    private trailingTextPipe:TrailingTextPipe) { }
    
    userId = "";
    answerItemsViewModel = [];
    answerItems = [];
    isProcessing=false;
  
  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId.replace(/-/g, '');
  }

  searchQuery(){
    let question = this.sourceTextArea.nativeElement.value;
  
    if (question.length > 0) {
      this.answerItemsViewModel = [];
      this.answerItems = [];
      this.searchResult=[];
      this.isProcessing = true;

      if(this.isProcessing == true){
        this.intelligentSearchResult.searchProgress(this.isProcessing);
      }
      this.intSearchService.getAnswer(question, this.userId,
        r => {
          
          this.answerItems = r;
          this.answerItems.forEach(chunk => {
            var searchInfo = new IntelligentSearchInfo();
            searchInfo.content=[];
            
            searchInfo.fileName=chunk.fileName;
            chunk.searchDetails.forEach(val => {
              var searchContent = new SearchContentInfo();

              var highlightContextTag  = ['<em>','</em>'];
              searchContent.context = this.trailingTextPipe.transform(val.context,highlightContextTag);
              
              var highlightContextTag  = ['<cm>','</cm>'];
              searchContent.pageContext = this.trailingTextPipe.transform(val.pageContext,highlightContextTag);

              searchInfo.content.push(searchContent);
          })
          this.searchResult.push(searchInfo);
          });
          if (this.answerItemsViewModel.length === 0) {
            let actionItem = {
              answer: "No answer found",
              context: "",
              probability: "",
              score: 0,
              offset_start: "",
              offset_end: ""
            };
            this.answerItemsViewModel.push(actionItem);
          }
          this.isProcessing = false;
         if(this.isProcessing == false){
         this.intelligentSearchResult.setSearchResult(this.searchResult,this.isProcessing); // to the side panel
         }
        },
        e => {
          this.isProcessing = false;
        });
    }
  }

}
