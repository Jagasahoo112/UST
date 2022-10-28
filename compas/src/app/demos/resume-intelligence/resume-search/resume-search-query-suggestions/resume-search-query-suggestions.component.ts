import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resume-search-query-suggestions',
  templateUrl: './resume-search-query-suggestions.component.html',
  styleUrls: ['./resume-search-query-suggestions.component.scss']
})
export class ResumeSearchQuerySuggestionsComponent implements OnInit {
  Querytext:string='';
  @Output() searchkeyvalue = new EventEmitter<string>();
  exist:boolean=false;
  originalText:string='';
  constructor() { }

  ngOnInit(): void {
       
  }
  selectitem(data)
  {
   this.searchkeyvalue.emit(this.originalText + data);
 
  }
}
