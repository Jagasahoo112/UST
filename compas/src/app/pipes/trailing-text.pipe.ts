import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trailingText'
})
export class TrailingTextPipe implements PipeTransform {

  transform(value: any, args: string[]): any {
    if (!value) { return []; }
    if (!args) { return value; }
    var sidePanelValues=[];
    var searchStartTag = args[0]; 
    if (searchStartTag == '<em>') {
      var startTagCount = value.match(/<em>/g);
      var startTagLength = value.match(/<em>/g).length;
      var counter = 0;
      var endTagCount = [];
      while (counter < startTagLength) {
        endTagCount.push('</em>');
        counter++;
        var endTagArr = endTagCount;
      }

      if (startTagCount.length && value) {
        startTagCount.forEach((searchWord: string) => {
          value = value.replace(searchWord, (match) => `<span class="badge badge-pill badge-warning text-wrap">`);
        });
      }
      if (endTagArr.length && value) {
        endTagArr.forEach((searchWord: string) => {
          value = value.replace(searchWord, (match) => `</span>`);
        });
      }

      //trailing .. addition
      var startSpanTagCount=value.match(/<span/g);
      var endSpanTagCount = value.match(/span>/g);
      var spanStr = '';
      if (startSpanTagCount.length && value) {
        startSpanTagCount.forEach((searchWord: string) => {
          var spanStartIndex = value.indexOf('<span');
          var spanEndIndex = value.indexOf('</span>');
          spanStr = spanStr + '...'+ value.substring(spanStartIndex-10,spanEndIndex+10) + '...';
          value=value.substring(spanEndIndex +7,value.length);
        });
      }
      
       return spanStr;
    }

    else if (searchStartTag == '<cm>') {
      var startTagCount = value.match(/<cm>/g);
      var startTagLength = value.match(/<cm>/g).length;
      var counter = 0;
      var endTagCount = [];
      while (counter < startTagLength) {
        endTagCount.push('</cm>');
        counter++;
        var endTagArr = endTagCount;
      }

      if (startTagCount.length && value) {
        startTagCount.forEach((searchWord: string) => {
          value = value.replace(searchWord, (match) => `<span class="badge badge-danger text-wrap">`);
        });
      }
      if (endTagArr.length && value) {
        endTagArr.forEach((searchWord: string) => {
          value = value.replace(searchWord, (match) => `</span>`);
        });
      }
      return value;
    }
      
  }
}
 