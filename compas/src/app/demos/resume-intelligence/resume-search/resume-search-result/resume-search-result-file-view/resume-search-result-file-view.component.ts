import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResumeIntelligenceService } from 'src/app/services/resume-intelligence.service';
import * as Mark from 'mark.js';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
@Component({
  selector: 'app-resume-search-result-file-view',
  templateUrl: './resume-search-result-file-view.component.html',
  styleUrls: ['./resume-search-result-file-view.component.scss']
})
export class ResumeSearchResultFileViewComponent implements OnInit {
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent!: PdfViewerComponent;
  private DocComponent!: NgxDocViewerModule;
  constructor(private intSearchService:ResumeIntelligenceService,private authService: AuthenticationService) { }
  pageFileContent:string;
  processingFlag:boolean;
  userId = "";
  filecontent:string="";
  pdfType:boolean=false;
  pdfurl:string='';
  docvier:string='';
  private markInstance: Mark;
  private debounceMarking = new Subject<string>();
  private debounceSubcription: Subscription;
searchdoctext:string='';
  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId.replace(/-/g, '');
  }

  

  loadPageContent(pageContent,htmlcontent){
  if(pageContent.fileName!="")
  {
    //this.docvier="http://20.67.178.20/resumesearch/Api/GetDocument?userId=0c5ee09178e34c36bc99978339540505&uniqueId=cc251f59fa7c4949b468d38de4ac17f2";
    var ext = pageContent.fileName.substr(pageContent.fileName.lastIndexOf('.') + 1);
    if(ext=='pdf')
      {
        var returnURL=this.intSearchService.getResumeDownload(pageContent.fileId, this.userId);
        console.log(returnURL);
      this.pdfurl=returnURL;
      this.pdfType=true;
      //this.searchQueryChanged(pageContent.content);
      }
    else
        {
          //var returnURL=this.intSearchService.getResumeDownload(pageContent.fileId, this.userId);
          var returnURL=this.intSearchService.getResumeDownload(pageContent.fileId, this.userId);
        console.log(returnURL);
        this.docvier=returnURL;
        //this.pageFileContent=htmlcontent;
        this.pdfType=false;
        }
  }
   
    this.processingFlag=true;
  }

  searchQueryChanged(newQuery: string,type:string,plaintext) { 
    if(type=="pdf")
    {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: newQuery,
        highlightAll: true
     });
    }
    else
    {
      this.searchQueryChangedfordoc(newQuery,plaintext);
    }
      
    
 }
 searchQueryChangedfordoc(newQuery: string,plaintext) { 
  var mySubString = plaintext.substring(

    plaintext.lastIndexOf('text-wrap">') + 11, 

    plaintext.lastIndexOf('</em>')

);
mySubString=mySubString.replace('<em>','');
  const documentContent = document.querySelector('ngx-doc-viewer')?.firstChild as HTMLElement;
  var myIFrame = document.getElementById("docview");
  var content = documentContent.innerHTML; 

  content.replace("<span style=\"background: #ffa908;\">","");
  content.replace("</span>","");


  var result1= content.replace(new RegExp("<span style=\"background: #ffa908;\">", "gi"), match => {
    return '';
});

      var result= result1.replace(new RegExp(mySubString, "gi"), match => {
          return '<span style="background: #ffa908;">' + mySubString + '</span>';
      });
      documentContent.innerHTML=result;
      
    

  console.log("content"+content);

 this.searchdoctext=newQuery;
}

 
//  searchQueryChangedforDoc(newQuery: string) { 
//   this.DocComponent.doc.pdfFindController.executeCommand('findagain', {
//      query: newQuery,
//      highlightAll: true
//   });

// }
//  ngAfterViewChecked() {
//   this.searchQueryChanged('python');
// }

}
