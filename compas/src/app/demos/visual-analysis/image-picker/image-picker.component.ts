import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @Input() public imageList: any;
  @Output() public imageSelected = new EventEmitter();

  public selectedImageIndex = -1;
  
  constructor() { }

  ngOnInit(): void {
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.imageSelected.emit({selectedImage: this.imageList[index]});
  }

}
