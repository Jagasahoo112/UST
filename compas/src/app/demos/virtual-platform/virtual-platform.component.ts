import { Component, OnInit } from '@angular/core';

declare const initUnityvirtualplatform: any;

@Component({
  selector: 'app-virtual-platform',
  templateUrl: './virtual-platform.component.html',
  styleUrls: ['./virtual-platform.component.scss']
})
export class VirtualPlatformComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    initUnityvirtualplatform();
  }
}
