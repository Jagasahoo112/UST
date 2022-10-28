import { Component, OnInit } from '@angular/core';

declare const initUnityDatavisualization: any;

@Component({
  selector: 'app-datavisualization',
  templateUrl: './datavisualization.component.html',
  styleUrls: ['./datavisualization.component.scss']

})
export class DatavisualizationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    initUnityDatavisualization();
  }



}
