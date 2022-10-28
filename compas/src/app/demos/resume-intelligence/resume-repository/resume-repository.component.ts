import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumeDocumentListComponent } from './resume-document-list/resume-document-list.component';
import { ResumeRepositorySearchComponent } from './resume-repository-search/resume-repository-search.component';
@Component({
  selector: 'app-resume-repository',
  templateUrl: './resume-repository.component.html',
  styleUrls: ['./resume-repository.component.scss']
})
export class ResumeRepositoryComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }  

}
