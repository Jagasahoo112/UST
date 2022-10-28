import { Component, OnInit, ViewChild } from '@angular/core';
import { TextParaphrasingService } from '../../services/text-paraphrasing.service';
import tippy from 'tippy.js';
declare var $: any;

@Component({
  selector: 'app-text-paraphrasing',
  templateUrl: './text-paraphrasing.component.html',
  styleUrls: ['./text-paraphrasing.component.scss'],
})
export class TextParaphrasingComponent implements OnInit {
  @ViewChild('sourceTextEditor') sourceTextEditor;
  public isProcessing = false;
  textParaphraseResponse: any = [];
  originalText: string = '';
  htmlText: string = '';
  suggestionText: string = '';
  suggestionMapping = {};
  sourceHtml = '';
  ParaphraseArray = [];
  autoreplace: boolean = false;
  suggestionCount: number;
  paraphraseDisabled: boolean = true;
  constructor(private paraphraser: TextParaphrasingService) { }

  ngOnInit(): void {
    (<any>$('#sourceTextEditor')).trumbowyg({
      btns: [['fullscreen']],
      svgPath: 'assets/images/icons.svg',
    });
  }

  enableParaphraseButton() {
    var text: string = this.sourceTextEditor.nativeElement.innerText;
    var choice = (<HTMLSelectElement>document.getElementById('algorithmKey'))
      .value;
    var trimmed = text.trim();
    if (trimmed.length !== 0 && choice !== '0') {
      this.paraphraseDisabled = false;
    } else {
      this.paraphraseDisabled = true;
    }
  }

  paraphrase() {
    this.isProcessing = true;
    this.showProcessingStatus();
    let suggestionCount = 5;
    var algorithmKeyValue = (<HTMLSelectElement>(document.getElementById('algorithmKey'))).value;
    var algorithmKey: number = +algorithmKeyValue;

    this.enableParaphraseButton();
    this.paraphraser.paraphraseText(
      this.getSourceText(),
      suggestionCount,
      algorithmKey,
      (result) => {
        this.isProcessing = false;
        this.hideProcessingStatus();
        this.textParaphraseResponse = result;
        this.showParaphraseResult();
        return;
      },
      (error) => {
        this.isProcessing = false;
        console.log(error);
      }
    );
  }

  showParaphraseResult() {
    this.hilightParaphraseSentence();
  }

  private hilightParaphraseSentence() {
    let cleanedText = this.textParaphraseResponse[0].cleanedText;
    let rephraseResults = this.textParaphraseResponse[0].rephrasedResults;
    let cleanedTextArray = cleanedText
      .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
      .split('|');

    this.htmlText = '';
    for (let i = 0; i < cleanedTextArray.length; i++) {
      let space = ' ';
      if (i > 0) {
        this.htmlText += space.concat(cleanedTextArray[i]);
      } else this.htmlText += cleanedTextArray[i];
    }

    let ParaphraseArray = [];
    let offeset = 0;
    let sentencelength = 0;

    for (let i = 0; i < cleanedTextArray.length; i++) {
      let sentence = cleanedTextArray[i];
      sentencelength = sentence.length;
      if (i > 0) offeset = offeset + 1;

      let start_index = offeset;
      let end_index = start_index + sentencelength;
      offeset = end_index;
      ParaphraseArray.push(this.AddIndex(start_index, end_index));
    }

    /*ParaphraseArray = [
      {
        start_index: 0,
        end_index: 13
      },
      {
        start_index: 14,
        end_index: 30
      },
      {
        start_index: 31,
        end_index: 47
      },
      {
        start_index: 48,
        end_index: 64
      }
    ];*/

    for (let i = 0; i < ParaphraseArray.length; i++) {
      let item = ParaphraseArray[i];
      item['rephraseResults'] = rephraseResults[i];

    }

    this.ParaphraseArray = ParaphraseArray;
    let sentences = this.ParaphraseArray;

    //sort by start_index
    sentences = sentences.sort((item1, item2) => {
      if (item1.start_index > item2.start_index) return 1;
      else if (item1.start_index < item2.start_index) return -1;
      else return 0;
    });

    let suggestionIndex = 0;
    let offsets = [];

    this.suggestionMapping = [];

    sentences.forEach((sentence, index) => {
      let startIndex = sentence['start_index'];
      let endIndex = sentence['end_index'];

      offsets = this.hilightSuggestion(startIndex, endIndex, suggestionIndex);

      for (let j = index + 1; j < sentences.length; j++) {
        if (sentences[j]['start_index'] < sentence['end_index']) {
          //if this is not the last item and next item falls within this span
          sentences[j]['start_index'] += offsets[0]; //offset only by startTag if we are within the previous tag
          sentences[j]['end_index'] += offsets[0]; //offset only by startTag if we are within the previous tag
        } else {
          sentences[j]['start_index'] += offsets[0] + offsets[1];
          sentences[j]['end_index'] += offsets[0] + offsets[1];
        }
      }

      //update current indices
      sentence['end_index'] += offsets[0] + offsets[1];

      for (let j = index - 1; j >= 0; j--) {
        //update the end index for any parent tags
        if (sentence['start_index'] < sentences[j]['end_index']) {
          sentences[j]['end_index'] += offsets[0] + offsets[1];
        }
      }

      //suggestions metadata mapping
      let suggestionId = `suggestion-${suggestionIndex}`;
      this.suggestionMapping[suggestionId] = {
        startIndex: sentence['start_index'],
        endIndex: sentence['end_index'],
        suggestions: sentence['rephraseResults'],
      };

      suggestionIndex++;
    });

    this.setSourceEditorHtml(this.htmlText);

    if (!this.autoreplace)
      //Attach popups for all suggestions. This is done after setting the html in the editor so that the target DOM elements get initialized
      this.generateSuggestionPopups();
    else this.autoSetSuggestion();
  }

  AddIndex(start_index, end_index) {
    return {
      start_index: start_index,
      end_index: end_index,
    };
  }

  reset() {
    this.setSourceEditorHtml('');
    (<HTMLSelectElement>document.getElementById('algorithmKey')).value = '0';
    this.enableParaphraseButton();
  }

  private setSourceEditorHtml(htmlText: string) {
    let displayHtml = `<div class='m-2'>${htmlText}</div>`;
    $('#sourceTextEditor').trumbowyg('html', displayHtml);
  }

  getSourceText() {
    return this.sourceTextEditor.nativeElement.innerText;
  }

  showProcessingStatus() {
    this.textParaphraseResponse = null;
    this.isProcessing = true;
  }

  hideProcessingStatus() {
    this.isProcessing = false;
  }

  private autoSetSuggestion() {
    for (let suggestionId in this.suggestionMapping) {
      let replacementText = this.suggestionMapping[suggestionId].suggestions[0].text;
      if (replacementText != undefined && replacementText != '')
        this.makeReplacement(suggestionId, replacementText);
    }
  }

  private generateSuggestionPopups() {
    for (let suggestionId in this.suggestionMapping) {
      tippy(`#${suggestionId}`, {
        content: this.getSuggestionsPopupContent(
          suggestionId,
          this.suggestionMapping[suggestionId].suggestions
        ),
        allowHTML: true,
        interactive: true,
        theme: 'light',
        placement: 'bottom',

        onCreate: (instance) => {
          //Get all links within this popup
          let suggestionLinks =
            instance.popper.querySelectorAll('#suggestionLink');

          //Attach the replacement function to the click event
          suggestionLinks.forEach((x) => {
            x.addEventListener('click', (e) => {
              console.log(e);
              let suggestionId = (e.target as any).dataset.suggestionId;
              let replacementText = (e.target as any).innerText;

              this.makeReplacement(suggestionId, replacementText);
            });
          });
        },
      });
    }
  }

  private makeReplacement(suggestionId, replacementText) {
    let replaceStartIndex = this.suggestionMapping[suggestionId].startIndex;
    let replaceEndIndex = this.suggestionMapping[suggestionId].endIndex;

    let offset = replaceEndIndex - replaceStartIndex - replacementText.length;

    //Re-adjust indices for suggestions affected by the replacement
    for (let suggestionId in this.suggestionMapping) {
      let startIndex = this.suggestionMapping[suggestionId].startIndex;
      let endIndex = this.suggestionMapping[suggestionId].endIndex;

      if (startIndex > replaceEndIndex) {
        startIndex -= offset;
        endIndex -= offset;

        this.suggestionMapping[suggestionId].startIndex = startIndex;
        this.suggestionMapping[suggestionId].endIndex = endIndex;
      }
    }

    //Remove the suggestion that just got replaced
    delete this.suggestionMapping[suggestionId];

    //Update HTML within the editor
    this.htmlText = this.replaceStringRange(
      this.htmlText,
      replaceStartIndex,
      replaceEndIndex,
      replacementText
    );

    this.setSourceEditorHtml(this.htmlText);

    if (!this.autoreplace)
      //Reset html within editor recreates the DOM within it, so need to rewire events
      this.generateSuggestionPopups();
  }

  private getSuggestionsPopupContent(suggestionId, suggestions) {
    let popupHtml = `<div>
                    <div class="list-group">`;

    if (suggestions.length == 0) {
      popupHtml +=
        "<div class='list-group-item'>No Suggestions Available</div>";
    }
    suggestions.forEach((s, i) => {
      this.suggestionText = s.text;
      if (s.changedWordIndices.length > 0) {
        this.hilightWord(s.changedWordIndices, s.text);
      }

      let replacementId = suggestionId + '_' + i;
      //popupHtml += `<a id='suggestionLink' style="cursor:pointer" data-suggestion-id="${suggestionId}" class="list-group-item list-group-item-action">${s}</a>`;
      popupHtml += `<a id='suggestionLink' style="cursor:pointer" data-suggestion-id="${suggestionId}" class="list-group-item list-group-item-action">${this.suggestionText}</a>`;
    });
    popupHtml += `</div>
                </div>`;
    return popupHtml;
  }

  //==================================================================

  private hilightWord(changedWordIndices, text: string) {

    let tagStart = `<b>`;
    let tagEnd = "</b>";
    changedWordIndices.sort((a, b) => (a.startIndex > b.startIndex) ? 1 : -1);
    changedWordIndices.forEach((i, index) => {
      let startIndex = i.startIndex;
      let endIndex = i.endIndex;
      if (index > 0) {
        startIndex = startIndex + (index * (tagStart.length + tagEnd.length));
        endIndex = endIndex + (index * (tagStart.length + tagEnd.length));
      }
      this.suggestionText = this.insertSubstringWord(this.suggestionText, tagStart, startIndex);
      this.suggestionText = this.insertSubstringWord(this.suggestionText, tagEnd, endIndex + tagStart.length);
    });
    return this.suggestionText;

  }

  private insertSubstringWord(
    sourceString: string,
    subString: string,
    index: number
  ) {

    let result =
      sourceString.slice(0, index) + subString + sourceString.slice(index);
    return result;
  }
  //================================================================


  private insertSubstring(
    sourceString: string,
    subString: string,
    index: number
  ) {
    let result =
      sourceString.slice(0, index) + subString + sourceString.slice(index);
    return result;
  }

  private replaceStringRange(
    sourceString,
    startIndex,
    endIndex,
    replacementString
  ) {
    return (
      sourceString.substring(0, startIndex) +
      replacementString +
      sourceString.substring(endIndex)
    );
  }

  private hilightSuggestion(
    startIndex: number,
    endIndex: number,
    suggestionId: Number
  ) {
    let suggestionElementId = `suggestion-${suggestionId}`;
    let tagStart = `<span class="mr-1" style='border-bottom: 2px dashed green;' id='${suggestionElementId}'>`;
    let tagEnd = '</span>';

    let offsetLength = tagStart.length + tagEnd.length;

    this.htmlText = this.insertSubstring(this.htmlText, tagStart, startIndex);
    this.htmlText = this.insertSubstring(
      this.htmlText,
      tagEnd,
      endIndex + tagStart.length
    );

    return [tagStart.length, tagEnd.length];
  }

 
}
