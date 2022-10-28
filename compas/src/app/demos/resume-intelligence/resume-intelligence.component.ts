import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumeRepositorySearchComponent } from './resume-repository/resume-repository-search/resume-repository-search.component';
@Component({
  selector: 'app-resume-intelligence',
  templateUrl: './resume-intelligence.component.html',
  styleUrls: ['./resume-intelligence.component.scss']
})
export class ResumeIntelligenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("tabVal",null);
  }

  setRepositoryActiveTabIndex(val){
    localStorage.setItem("tabVal",val);
  }

  

}
