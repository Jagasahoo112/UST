import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResumeIntelligenceService } from 'src/app/services/resume-intelligence.service';
import { TrailingTextPipe } from 'src/app/pipes/trailing-text.pipe'; 
import { Subject } from 'rxjs';
import { IncomingMessage, OutgoingMessage } from '../../../../WebSocket/IncomingMessage';
import  { WebsocketConnect }  from '../../../../WebSocket/Autosearch' 
export class ResumeSearchInfo {
  fileId: string;
  fileName:string;
  content: SearchContentInfo[];
}
export class SearchContentInfo
{
  context: string;
  pageContext: string;
  Originalcontext: string;
 }
 

@Component({
  selector: 'app-resume-search-query',
  templateUrl: './resume-search-query.component.html',
  styleUrls: ['./resume-search-query.component.scss']
})
export class ResumeSearchQueryComponent implements OnInit {
  @ViewChild("resumeSearchResult") resumeSearchResult;
  @ViewChild("sourceTextArea") sourceTextArea;
  @ViewChild("sourceTextAreaSuggestion") sourceTextAreaSuggestion;
  @ViewChild('sourceTextArea') someInput: ElementRef;

  public searchResult: ResumeSearchInfo[];
  
  constructor(private authService: AuthenticationService,
    private intSearchService:ResumeIntelligenceService,
    private trailingTextPipe:TrailingTextPipe,private _WebsocketConnect:WebsocketConnect  ) { }

  userId = "";
  answerItemsViewModel = [];
  answerItems = [];
  isProcessing=false;
  readonly incoming = new Subject<IncomingMessage>();
  public ClientName = '';  
  public flag: boolean = true;  
  private buffer: OutgoingMessage[] | undefined;
  private socket: WebSocket | undefined;
  inputmessgae:string='';
Querytext:any;
Search:string='';
suggestiontext:any;
  
  ngOnInit(): void {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId.replace(/-/g, '');
    
  } 
  searchQuery(){
    let question = this.sourceTextArea.nativeElement.value;
    this.sourceTextAreaSuggestion.exist=false;
    if (question.length > 0) {
      this.answerItemsViewModel = [];
      this.answerItems = [];
      this.searchResult=[];
    
      this.isProcessing = true;
      if(this.isProcessing == true){
        this.resumeSearchResult.searchProgress(this.isProcessing);
      }
      this.intSearchService.getAnswer(question, this.userId,
        r => {
          this.sourceTextAreaSuggestion.exist=false;
          this.answerItems = r;
          this.answerItems.forEach(chunk => {
            var searchInfo = new ResumeSearchInfo();
            searchInfo.content=[];
            
            searchInfo.fileName=chunk.fileName;
            searchInfo.fileId = chunk.uniqueId;
            
            chunk.searchDetails.forEach(val => {
              var searchContent = new SearchContentInfo();

              var highlightContextTag  = ['<em>','</em>'];
              searchContent.context = this.trailingTextPipe.transform(val.context,highlightContextTag);
              
              var highlightContextTag  = ['<cm>','</cm>'];
              searchContent.pageContext = this.trailingTextPipe.transform(val.pageContext,highlightContextTag);
              searchContent.Originalcontext = val.context;

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
         this.resumeSearchResult.setSearchResult(this.searchResult,this.isProcessing,question); // to the side panel
         }
        },
        e => {
          this.isProcessing = false;
        });
    }
  }


  connect(): void {
    this.socket = new WebSocket('ws://20.67.178.20/resumeautosuggestor/ResumeSuggestions');
    this.buffer = [];
    this.socket.addEventListener('message', this.onMessage);
    this.socket.addEventListener('open', this.onOpen);
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('error', this.onError);
}
disconnect(): void {
  if (!this.socket) {
      throw new Error('websocket not connected');
  }
  this.socket.removeEventListener('message', this.onMessage);
  this.socket.removeEventListener('open', this.onOpen);
  this.socket.removeEventListener('close', this.onClose);
  this.socket.removeEventListener('error', this.onError);
  this.socket.close();
  this.socket = undefined;
  this.buffer = undefined;
}
onselectClient(ClientName:any) {     
 
  this.ClientName = ClientName;       
  this.flag = false;  


}  
send(msg: OutgoingMessage): void {
  if (!this.socket) {
      throw new Error('websocket not connected');
  }
  
      this.socket.send(JSON.stringify({searchQuery:this.inputmessgae, userId:''}));

}

private onMessage = (event: MessageEvent): void => {
  const msg = JSON.parse(event.data);
  console.log(msg);
  this.Querytext=msg.response.suggestionText;
  var arr = [];            
arr= this.inputmessgae.split(' ');  
var trimtext='';
for(let i=0; i<=this.Querytext.length-1;i++)
{
  if(arr.length>0)  
  trimtext=this.inputmessgae.substring(this.inputmessgae.indexOf(' ')+arr.length-1);
  else
  trimtext=this.inputmessgae.substring(0,this.inputmessgae.indexOf(' '));
  
  if(trimtext.trim()=="") 
  {
    trimtext=this.inputmessgae.substring(0,this.inputmessgae.indexOf(' '));
  }

  this.Querytext[i]=this.Querytext[i].replace(trimtext.trim(), "");
} 
  this.sourceTextAreaSuggestion.Querytext=msg.response.suggestionText;
  this.sourceTextAreaSuggestion.exist=true;
  this.suggestiontext=msg.response.suggestionText;
  console.log(this.sourceTextAreaSuggestion.Querytext);
  console.log( this.suggestiontext); 
  this.flag = true;
};

private onOpen = (event: Event): void => {
  console.log('websocket opened', event); 
  this.send(JSON.stringify({searchQuery:this.inputmessgae, userId:''})); 
};

private onError = (event: Event): void => {
  console.error('websocket error', event);
};

private onClose = (event: CloseEvent): void => {
  console.info('websocket closed', event); 
};

clear()
{
  this.sourceTextAreaSuggestion.exist=false;
   
}
sendMessageToServer(msg:string,event)
{
this.inputmessgae=msg;

this.sourceTextAreaSuggestion.originalText=msg;
if (event.key != "Enter")
this.connect();
else
this.clear();

}
selectitemfromchild(value)
{
  this.Search=value;

  this.searchQuery();
  this.Querytext='';
  this.sourceTextAreaSuggestion.exist=false;

}
}



