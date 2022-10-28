import { Component, OnInit } from '@angular/core';

declare const initUnityTelepresence: any;

@Component({
  selector: 'telepresence',
  templateUrl: './telepresence.component.html',
  styleUrls: ['./telepresence.component.scss']
})
export class TelepresenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    initUnityTelepresence();
  }

}
