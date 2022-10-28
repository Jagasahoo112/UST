import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intelligent-search',
  templateUrl: './intelligent-search.component.html',
  styleUrls: ['./intelligent-search.component.scss']
})
export class IntelligentSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("tabVal",null);
  }

  setRepositoryActiveTabIndex(val){
    localStorage.setItem("tabVal",val);
  }

}
