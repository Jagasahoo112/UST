import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IncomingMessage, OutgoingMessage } from './IncomingMessage';
@Injectable({
    providedIn: 'root'
  })
export class WebsocketConnect {
    title = 'websocketttttt';
    
    readonly incoming = new Subject<IncomingMessage>();
    public ClientName = '';  
    public flag: boolean = true;  
    private buffer: OutgoingMessage[] | undefined;
    private socket: WebSocket | undefined;
    inputmessgae:string='';
  Querytext:any;
  private GET_AutoSuggestions_SERVICE_URL = "ws://20.67.178.20/intelligentautosuggestor/AutoSuggestions"
  private GET_ResumeSuggestions_SERVICE_URL = "ws://20.67.178.20/resumeautosuggestor/ResumeSuggestions"; 
  suggestiontext:any;
     connect(websocketType): void {
          if(websocketType=="Resume")
           this.socket = new WebSocket(this.GET_ResumeSuggestions_SERVICE_URL);
          else
           this.socket = new WebSocket(this.GET_AutoSuggestions_SERVICE_URL);

          this.buffer = [];
         var ss= this.socket.addEventListener('message', this.onMessage);
         console.log("ssssss"+ss);
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
        this.suggestiontext=msg.response.suggestionText;
        console.log(this.Querytext);
        console.log( this.suggestiontext);
       
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