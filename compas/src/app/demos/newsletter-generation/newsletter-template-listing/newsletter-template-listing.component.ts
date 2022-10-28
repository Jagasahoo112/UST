import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'newsletter-template-listing',
  templateUrl: './newsletter-template-listing.component.html',
  styleUrls: ['./newsletter-template-listing.component.scss']
})
export class NewsletterTemplateListingComponent implements OnInit {

  @Input() public templateList: any;
  @Input() public newsletterServiceBaseUrl: string;
  @Output() public templateSelected = new EventEmitter();

  selectedTemplateIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getFullAssetUrl(relativePath:string):string {
    return this.newsletterServiceBaseUrl + relativePath;
  }

  selectTemplate(templateIndex:number) {
    this.selectedTemplateIndex = templateIndex;
    this.templateSelected.emit({"selectedTemplateIndex": templateIndex});
  }

}
