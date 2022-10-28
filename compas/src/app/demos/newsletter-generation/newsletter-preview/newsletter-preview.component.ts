import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

declare var $: any;


@Component({
  selector: 'newsletter-preview',
  templateUrl: './newsletter-preview.component.html',
  styleUrls: ['./newsletter-preview.component.scss']
})
export class NewsletterPreviewComponent implements OnInit {

  @Output() public downloadPdfSelected = new EventEmitter();
  @Output() public downloadWordSelected = new EventEmitter();
  
//   private previewEditor: any;
//   @ViewChild("previewEditor") set content(content) {
//     if(content) { // initially setter gets called with undefined
//         this.previewEditor = content;
//         this.previewEditor.quillEditor.root.innerHTML = this.newsletterHtml;
//     }
//  };

 @ViewChild("previewEditor") previewEditor;

  newsletterHtml = "";
  isDownloadingPdf = false;
  isDownloadingWord = false;
  isNewsletterContentAvailable = false;

  constructor() { }

  ngOnInit(): void {
    // (<any>$('#sourceTextEditor')).trumbowyg();
    (<any>$('#previewEditor')).trumbowyg({
      svgPath: "assets/images/icons.svg", // or a path like '/assets/my-custom-path/icons.svg'
      resetCss: true
  });
  }

  downloadPdf() {
    this.newsletterHtml = $('#previewEditor').trumbowyg('html');


    this.isDownloadingPdf = true;
    this.downloadPdfSelected.emit();
  }

  downloadWord() {
    this.newsletterHtml = $('#previewEditor').trumbowyg('html');

    this.isDownloadingWord = true;
    this.downloadWordSelected.emit();
  }

  setNewsletterHtml(newsletterHtml:string) {
    this.newsletterHtml = newsletterHtml;
    this.isNewsletterContentAvailable = (newsletterHtml.length > 0);
    $('#previewEditor').trumbowyg('html', newsletterHtml);
  }
  

}
