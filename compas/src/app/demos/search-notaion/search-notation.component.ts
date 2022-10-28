import { Component, OnInit, ViewChild } from '@angular/core';
import {SearchNotationService} from '../../services/search-notation.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import{Researchtext} from '../model/searchindexvalue';
import { NewsletterGenerationService } from 'src/app/services/newsletter-generation.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject } from 'rxjs';
import { OutgoingMessage } from 'src/app/WebSocket/IncomingMessage';
@Component({
  selector: 'app-search-notation',
  templateUrl: './search-notation.component.html',
  styleUrls: ['./search-notation.component.scss']
})
export class SearchNotaionComponent implements OnInit { 

  private selectedTemplateIndex = 0;

  @ViewChild("newsletterDataSourceListing") newsletterDataSourceListing;
  @ViewChild("newsletterTemplateListing") newsletterTemplateListing; 

  @ViewChild("sourceTextAreaSuggestion") sourceTextAreaSuggestion;
  private currentStepIndex = 0;


  resultset:any;
  resultsetresponse:any;
  onclickresult:any;
  mainresultset:any;
  optionalresult:any;
  isvideoorimageurl:boolean=false;
  isLoading:boolean=false;
  isnorecord:boolean=false;
  isimageurl:boolean=false; 
  countcheckbox:number=0;
  hdnsearchname:string='';
  hdnsearchtextIdex:number=0;
  counterTitle:string='';
  ifrmaeurl:string='';
  newsletterServiceBaseUrl:string='';
  templateList:string='';
  public ClientName = '';  
  public flag: boolean = true;  
  private socket: WebSocket | undefined;
  private buffer: OutgoingMessage[] | undefined;
  inputmessgae:string='';
Querytext:any;
Search:string='';
suggestiontext:any;
  constructor(private _SearchNotationService: SearchNotationService,private toastr: ToastrService,
    private newsletterGenerationService: NewsletterGenerationService,private authenticationService: AuthenticationService) { 
     
  }

  ngOnInit(): void {
    this.loadTemplates();
  }

   OnTextSearchClick(textMessage: any)
   {
      
    if (textMessage.length > 0 ) {
      this.sourceTextAreaSuggestion.exist=false;
       
    this.isLoading=true;
    
    this._SearchNotationService.searchresult(textMessage, res=> {
      if (res) { 
    this.resultsetresponse=[ 
    { id: 'mainsearchlist', name: 'Main Search',icon:'icons8-search-client-30.png',count:0,space:'' },
    { id: 'relatedSearch', name: 'Related',icon: 'icons8-related-companies-30.png', count:0,space:''  },
    { id: 'suggestionSearch', name: 'Suggestions' ,icon: 'icons8-suggestion-50.png',count:0, space:'' },
    { id: 'newsSearch', name: 'News' ,icon: 'icons8-search-client-16.png',count:0 ,space:'' },
    { id: 'relatedTopics', name: 'Related Topics',icon: 'icons8-topic-50.png',count:0,space:''   },
    { id: 'imageurls', name: 'Images' ,icon: 'icons8-image-24.png',count:0 ,space:'' },
    { id: 'videourls', name: 'Videos',icon: 'icons8-video-24.png',count:0,  space:'' }];

       this.isLoading=false;
        this.resultset=res;
        this.mainresultset=this.resultset;

        console.log(res);
        console.log("this.resultset.response"+this.resultset.response);
      var resu=this.resultset.map((resp: {}) => {
        return Object.keys(resp)
    })
    console.log(resu);
  
      //this.resultsetresponse=resu;
      console.log(this.resultsetresponse);
     //console.log(this.resultsetresponse.response[0]["mainsearchlist"]);
     this.oncliclick("mainsearchlist",0);
     this.isnorecord=false;
    
    
        }   
      }, (error) => {
        this.toastr.error(error.errorMessage);
        this.isLoading=false;
        console.log(error);
     this.isnorecord=true;

      }); }
}

  oncliclick(selectedVal:string,i :number) {
     console.log("selectedVal"+selectedVal);
     console.log("number"+i);
     this.hdnsearchname =selectedVal;
     this.hdnsearchtextIdex=i;
     this.isimageurl=false;
     const list: Researchtext[] = [];
     if(selectedVal=="imageurls" || selectedVal=="videourls") 
     {
      for(let j=0; j<this.resultset[i][selectedVal].length; j++){
        const data: Researchtext = new Researchtext(); 
            data.url = this.resultset[i][selectedVal][j];
            if(this.optionalresult)
            {
               for(let k=0; k<this.optionalresult.length; k++){
                 if(this.optionalresult[k].url==this.resultset[i][selectedVal][j])
                 {
                   data.checked = true; 
                   if( selectedVal=="videourls")
                   data.Videocss="active";
                   else
                   data.Imagecss="active";
                   
                   break;
                 }              
                 else
                 data.checked = false; 
               }
              
            }
           
            list.push(data);
        }
       this.isvideoorimageurl=true;
       if (selectedVal=="imageurls" ) {
         this.isimageurl=true;
       }  
     }    
     else  
     {
       this.isvideoorimageurl=false; 
       for(let j=0; j<this.resultset[i][selectedVal].length; j++){
        const data: Researchtext = new Researchtext();
   
            data.query = this.resultset[i][selectedVal][j].query;
            data.name = this.resultset[i][selectedVal][j].name;
            data.snippet = this.resultset[i][selectedVal][j].snippet;
            data.url = this.resultset[i][selectedVal][j].url;
            if(this.optionalresult)
            {
               for(let k=0; k<this.optionalresult.length; k++){
                 if(this.optionalresult[k].snippet==this.resultset[i][selectedVal][j].snippet)
                 {
                   data.checked = true; 
                   break;
                 }              
                 else
                 data.checked = false; 
               }
              
            }
           
            list.push(data);
        }
     }
     //this.onclickresult=this.resultset[i][selectedVal];
    
    //this.onclickresult=this.resultset[i][selectedVal];
    this.onclickresult=list;
    console.log(this.onclickresult);
  

  }

  changed(values:any,textvalue:string,index:number,i:number)
  {
    const list: Researchtext[] = [];
    if(textvalue=="imageurls" || textvalue=="videourls") 
   {
    for(let j=0; j<this.mainresultset[index][textvalue].length; j++){
      const data: Researchtext = new Researchtext(); 
      data.url = this.mainresultset[index][textvalue][i];
      data.checked = false; 
      if(i==j)
      list.push(data);

      
  } 
  this.highlight(values);
   }
   else {
    for(let j=0; j<this.mainresultset[index][textvalue].length; j++){
      const data: Researchtext = new Researchtext();
      data.query = this.mainresultset[index][textvalue][i].query;
      data.name = this.mainresultset[index][textvalue][i].name;
      data.snippet = this.mainresultset[index][textvalue][i].snippet;
      data.url = this.mainresultset[index][textvalue][i].url;
      data.checked = false; 
      if(i==j)
      list.push(data);
  } 
   }
   var target = values.currentTarget; 
    if(values.currentTarget.checked==true  || target.classList.contains("active"))
    { 
      for(let k=0; k<this.resultsetresponse.length; k++){
        if(this.resultsetresponse[k].id==textvalue)
        {
          var count=this.resultsetresponse[k].count;
          this.resultsetresponse[k].count=count+1;
          break;
        } 
      }
     
      this.countcheckbox=this.countcheckbox+1;
      
      if(this.optionalresult)
      this.optionalresult.push(list[0]);
      else
      this.optionalresult=list;
    }
    else{
      for(let k=0; k<this.resultsetresponse.length; k++){
        if(this.resultsetresponse[k].id==textvalue)
        {
          this.resultsetresponse[k].count=this.resultsetresponse[k].count-1;
          break;
        } 
      }
     // this.optionalresult.push(list[0]);
     for(let k=0; k<this.optionalresult.length; k++){
      if(this.optionalresult[k].snippet==list[0].snippet)
      {
        this.optionalresult.splice(k,1);
        break;
      }  
    }
     
      this.countcheckbox=this.countcheckbox-1;
     
    }
    this.counterTitle="You have selected "+ this.countcheckbox +" items from the list. ";
  }

  highlight(event)
  {
    var target = event.currentTarget; 
    if(target.classList.contains("active")) 
    {
      target.classList.remove("active");  
    }
    else
    {
      target.classList.add("active");

    }
     
  }
  loadTemplates() {
    this.newsletterGenerationService.getTemplates(results => {
      this.templateList = results;
      //this.templateList = results;
      this.newsletterServiceBaseUrl = this.newsletterGenerationService.getBaseUrl();
    }, null);
  }
  // ngAfterViewInit() {

  //   setTimeout(() => {
  //     this.loadSourceFiles();

  //     this.newsletterDataSourceListing.newsletterGenerationService = this.newsletterGenerationService;
  //     this.newsletterDataSourceListing.authenticationService = this.authenticationService;

  //     this.newsletterDataSourceListing.fileListChanged.subscribe((result) => { this.sourceFiles = result }); //Update file list if new files are uploaded
  //     this.newsletterTemplateListing.templateSelected.subscribe((result) => { this.selectedTemplateIndex = result["selectedTemplateIndex"]; });

  //   });

  // }
  // generateNewsletter() {
  //   this.newsletterPreview.setNewsletterHtml("");
  //   let selectedTemplateId = this.templateList[this.selectedTemplateIndex]["templateId"];

  //   let loggedInUserId = this.authenticationService.getAuthenticatedUser().userId;

  //   this.newsletterGenerationService.generateNewsletter(this.newsletterDataSourceListing.getSelectedFiles(),
  //                                                       selectedTemplateId, 
  //                                                       loggedInUserId, 
  //                                                       result => {
  //                                                         this.newsletterPreview.setNewsletterHtml(result["newsletterHtml"]);
  //                                                       }, 
  //                                                     null);
  // }

  loadSourceFiles() {
    let loggedInUser = this.authenticationService.getAuthenticatedUser();


    this.newsletterGenerationService.getSourceFiles(loggedInUser.userId, results => {
     // this.sourceFiles = results;
      this.newsletterDataSourceListing.setSourceFiles(results);
      this.newsletterDataSourceListing.newsletterServiceBaseUrl = this.newsletterGenerationService.getBaseUrl();
    }, null);
  }
  GeneratePDF()
  {

  }
  getFullAssetUrl(relativePath:string):string {
    return this.newsletterServiceBaseUrl + relativePath;
  }

  selectTemplate(templateIndex:number) {
    this.selectedTemplateIndex = templateIndex;
   // this.templateSelected.emit({"selectedTemplateIndex": templateIndex});
  }

  selectitemfromchild(value)
{
  this.Search=value;

  this.OnTextSearchClick(value);
  this.Querytext='';
  this.sourceTextAreaSuggestion.exist=false;

}

sendMessageToServer(msg:string)
{
this.inputmessgae=msg;

this.sourceTextAreaSuggestion.originalText=msg;

this.connect();

}
connect(): void {
  this.socket = new WebSocket('ws://20.67.178.20/intelligentautosuggestor/AutoSuggestions');
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
clear()
{
  this.sourceTextAreaSuggestion.exist=false;
   
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

}

