import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResumeIntelligenceService } from 'src/app/services/resume-intelligence.service';
import * as Mark from 'mark.js';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-resume-document-view-file',
  templateUrl: './resume-document-view-file.component.html',
  styleUrls: ['./resume-document-view-file.component.scss']
})
export class ResumeDocumentViewFileComponent implements OnInit {
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent!: PdfViewerComponent;
  constructor(private intSearchService:ResumeIntelligenceService,private authService: AuthenticationService) { }

  pageFileContent:string;
  processingFlag:boolean;
  pdfurl:string='';
  pdfType:boolean=false;
  docvier:string='';
  searchdoctext:string='';
  userId = "";
  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId.replace(/-/g, '');
  }
  
  // loadPageContent(pageContent,htmlcontent){
  //   this.pageFileContent=pageContent;
  //   this.processingFlag=true;

  // }
  
  loadPageContent(pageContent,htmlcontent){
    if(pageContent.fileName!="")
    {
      //this.docvier="http://20.67.178.20/resumesearch/Api/GetDocument?userId=0c5ee09178e34c36bc99978339540505&uniqueId=cc251f59fa7c4949b468d38de4ac17f2";
      var ext = pageContent.fileName.substr(pageContent.fileName.lastIndexOf('.') + 1);
      if(ext=='pdf')
        {
          var returnURL=this.intSearchService.getResumeDownload(pageContent.uniqueId, this.userId);
          console.log(returnURL);
        this.pdfurl=returnURL;
        this.pdfType=true;
        //this.searchQueryChanged(pageContent.content);
        }
      else
          {
            //var returnURL=this.intSearchService.getResumeDownload(pageContent.fileId, this.userId);
            var returnURL=this.intSearchService.getResumeDownload(pageContent.uniqueId, this.userId);
          console.log(returnURL);
          this.docvier=returnURL;
          //this.pageFileContent=htmlcontent;
          this.pdfType=false;
          }
    }
     
      this.processingFlag=true;
    }
  
    searchQueryChanged(newQuery: string,type:string) { 
      if(type=="pdf")
      {
        this.pdfComponent.pdfFindController.executeCommand('findagain', {
          query: newQuery,
          highlightAll: true
       });
      }
      else
      {
        this.searchQueryChangedfordoc(newQuery);
      }
        
      
   }
   searchQueryChangedfordoc(newQuery: string) { 
    const documentContent = document.querySelector('ngx-doc-viewer')?.firstChild as HTMLElement;
    var myIFrame = document.getElementById("docview");
    var content = documentContent.innerHTML; 
        var result= content.replace(new RegExp(newQuery, "gi"), match => {
            return '<span style="background: #ffa908;">' + newQuery + '</span>';
        });
        documentContent.innerHTML=result;
  
    console.log("content"+content);
  
   this.searchdoctext=newQuery;
  }
  

}
