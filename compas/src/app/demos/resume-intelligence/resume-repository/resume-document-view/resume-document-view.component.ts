import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-document-view',
  templateUrl: './resume-document-view.component.html',
  styleUrls: ['./resume-document-view.component.scss']
})
export class ResumeDocumentViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  validateTab(){
    return localStorage.getItem("tabVal");
  }

  

}