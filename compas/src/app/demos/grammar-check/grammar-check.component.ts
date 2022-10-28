import { Component, OnInit, ViewChild } from '@angular/core';
import { GrammarCheckService } from "../../services/grammar-check.service";
import { createPopper } from '@popperjs/core'
import tippy from 'tippy.js';

declare var $: any;

@Component({
  selector: 'grammar-check',
  templateUrl: './grammar-check.component.html',
  styleUrls: ['./grammar-check.component.scss']
})
export class GrammarCheckComponent implements OnInit {

  isProcessing = false;
  sourceHtml = "";
  @ViewChild("sourceTextEditor") sourceTextEditor;
  grammarCheckResponse = [];
  originalText: string = "";
  htmlText: string = "";
  suggestionMapping = {};
  validateDisabled = false;
  ParaphraseArray = [];
  suggestionMapping1 = {};
  textParaphraseResponse: any = [];
  algorithmKey: number;
  suggestionText: string = '';

  constructor(private grammarCheckService: GrammarCheckService
  ) { }

  ngOnInit(): void {
    (<any>$('#sourceTextEditor')).trumbowyg({
      btns: [["fullscreen"]],
      svgPath: "assets/images/icons.svg"
    });
    window.scrollTo(0, 0);
  }

  checkText() {
    this.isProcessing = true;
    this.showProcessingStatus();
    var algorithmKeyValue = (<HTMLSelectElement>(document.getElementById('algorithmKey'))).value;
    var algorithmKey: number = +algorithmKeyValue;
    this.algorithmKey = algorithmKey;

    this.grammarCheckService.grammerCheckText(this.getSourceText(), algorithmKey,
      result => {
        this.isProcessing = false;
        this.hideProcessingStatus();
        if (algorithmKey == 1) {
          this.grammarCheckResponse = result;
          this.showGrammerResult();
        } else {
          this.isProcessing = false;
          this.hideProcessingStatus();
          this.textParaphraseResponse = result;
          this.showParaphraseResult();
          return;
        }

        return;

      },
      error => {
        this.isProcessing = false;
        // console.log(error);
      });
  }

  getSourceText() {
    return this.sourceTextEditor.nativeElement.innerText;
  }

  reset() {
    this.setEditorHtml("");
    (<HTMLSelectElement>document.getElementById('algorithmKey')).value = '0';
    this.enableGrammarChekButton();
  }

  private setEditorHtml(htmlText: string) {
    let displayHtml = `<div class='m-2'>${htmlText}</div>`;
    $('#sourceTextEditor').trumbowyg('html', displayHtml);
  }

  showProcessingStatus() {
    this.grammarCheckResponse = null;
    this.isProcessing = true;
  }

  hideProcessingStatus() {
    this.isProcessing = false;
  }

  showGrammerResult() {
    let originalText = this.sourceTextEditor.nativeElement.innerText;
    this.originalText = originalText;
    this.htmlText = originalText;
    this.hilightSentiments();
  }

  private hilightSentiments() {
    let grammarCorrectionResponse = this.grammarCheckResponse.filter(x => x.error_type == "grammarCorrection" || x.error_type == " ");
    let spellingCorrectionResponse = this.grammarCheckResponse.filter(x => x.error_type == "spellingCorrection");

    let grammarCorrectionItems = grammarCorrectionResponse.map(x => {
      return {
        start_index: x.start_index,
        end_index: x.end_index + 1,
        error_type: "grammarCorrection",
        sub_string: x.sub_string,
        token_type: x.token_type,
        replacement_strings: x.replacement_strings
      };
    });


    let spellingCorrectionItems = spellingCorrectionResponse.map(x => {
      return {
        start_index: x.start_index,
        end_index: x.end_index + 1,
        error_type: "spellingCorrection",
        sub_string: x.sub_string,
        token_type: x.token_type,
        replacement_strings: x.replacement_strings
      };
    });

    let sentences = grammarCorrectionItems
      .concat(spellingCorrectionItems);

    //sort by start_index
    sentences = sentences.sort((item1, item2) => {
      if (item1.start_index > item2.start_index)
        return 1;
      else if (item1.start_index < item2.start_index)
        return -1;
      else
        return 0;
    });

    let suggestionIndex = 0;
    let offsets = [];

    this.suggestionMapping = [];

    sentences.forEach((sentence, index) => {
      let startIndex = sentence["start_index"];
      let endIndex = sentence["end_index"];

      offsets = this.hilightSuggestion(startIndex, endIndex, this.getColorForCorrection(sentence), suggestionIndex);

      for (let j = index + 1; j < sentences.length; j++) {

        if (sentences[j]["start_index"] < sentence["end_index"]) { //if this is not the last item and next item falls within this span
          sentences[j]["start_index"] += offsets[0]; //offset only by startTag if we are within the previous tag
          sentences[j]["end_index"] += offsets[0]; //offset only by startTag if we are within the previous tag
        } else {
          sentences[j]["start_index"] += offsets[0] + offsets[1];
          sentences[j]["end_index"] += offsets[0] + offsets[1];
        }
      }

      //update current indices
      sentence["end_index"] += offsets[0] + offsets[1];

      for (let j = index - 1; j >= 0; j--) {
        //update the end index for any parent tags
        if (sentence["start_index"] < sentences[j]["end_index"]) {
          sentences[j]["end_index"] += offsets[0] + offsets[1];
        }
      }

      //suggestions metadata mapping
      if (sentence.error_type == "grammarCorrection" || sentence.error_type == "spellingCorrection") {
        let suggestionId = `suggestion-${suggestionIndex}`;
        this.suggestionMapping[suggestionId] = {
          startIndex: sentence["start_index"],
          endIndex: sentence["end_index"],
          suggestions: sentence["replacement_strings"]
        };

        suggestionIndex++;
      }

    });

    this.setEditorHtml(this.htmlText);
    //Attach popups for all suggestions. This is done after setting the html in the editor so that the target DOM elements get initialized
    this.generateSuggestionPopups();

  }

  private generateSuggestionPopups() {
    for (let suggestionId in this.suggestionMapping) {
      tippy(`#${suggestionId}`, {
        content: this.getSuggestionsPopupContent(suggestionId, this.suggestionMapping[suggestionId].suggestions),
        allowHTML: true,
        interactive: true,
        theme: "light",
        placement: "bottom",

        onCreate: (instance) => {
          //Get all links within this popup
          let suggestionLinks = instance.popper.querySelectorAll("#suggestionLink");

          //Attach the replacement function to the click event
          suggestionLinks.forEach(x => {
            x.addEventListener("click", (e) => {
              // console.log(e);
              let suggestionId = (e.target as any).dataset.suggestionId;
              let replacementText = (e.target as any).innerText;

              this.makeReplacement(suggestionId, replacementText);

            });
          });

        }
      });
    }
  }

  private makeReplacement(suggestionId, replacementText) {
    let replaceStartIndex = this.suggestionMapping[suggestionId].startIndex;
    let replaceEndIndex = this.suggestionMapping[suggestionId].endIndex;

    let offset = (replaceEndIndex - replaceStartIndex) - replacementText.length;

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
    this.htmlText = this.replaceStringRange(this.htmlText, replaceStartIndex, replaceEndIndex, replacementText);

    this.setEditorHtml(this.htmlText);

    //Reset html within editor recreates the DOM within it, so need to rewire events
    this.generateSuggestionPopups();

  }

  private getSuggestionsPopupContent(suggestionId, suggestions) {
    let popupHtml = `<div>
                    <div class="list-group">`;
    if (suggestions.length == 0) {
      popupHtml += "<div class='list-group-item'>No Suggestions Available</div>"
    }
    suggestions.forEach((s, i) => {
      let replacementId = suggestionId + "_" + i;
      popupHtml += `<a id='suggestionLink' style="cursor:pointer" data-suggestion-id="${suggestionId}" class="list-group-item list-group-item-action">${s}</a>`
    });
    popupHtml += `</div>
                </div>`;
    return popupHtml;

  }

  private getColorForCorrection(sentence) {
    let hilightColor = "white";
    let sentimentColorValue = 255;

    switch (sentence["error_type"]) {
      case "grammarCorrection":
        hilightColor = `rgba(0,${sentimentColorValue},0,1)`;
        break;

      case "spellingCorrection":
        hilightColor = `rgba(${sentimentColorValue},0,0,1)`;
        break;

    }
    return hilightColor;
  }

  private hilightSuggestion(startIndex: number, endIndex: number, hilightColor: string, suggestionId: Number) {

    let suggestionElementId = `suggestion-${suggestionId}`;
    let tagStart;
    //tagStart = `<span class='border rounded border-secondary p-1' id='${suggestionElementId}' style='cursor:pointer; background-color: ${hilightColor};'>`;
    if (this.algorithmKey == 1) {
      tagStart = `<span class='border rounded border-secondary p-1' id='${suggestionElementId}' style='cursor:pointer; background-color: ${hilightColor};'>`;

    } else {
      tagStart = `<span class='p-1' id='${suggestionElementId}' style='cursor:pointer; border-bottom: 2px dashed green;'>`;

    }

    let tagEnd = "</span>";

    let offsetLength = tagStart.length + tagEnd.length;


    this.htmlText = this.insertSubstring(this.htmlText, tagStart, startIndex);
    this.htmlText = this.insertSubstring(this.htmlText, tagEnd, endIndex + tagStart.length);

    return [tagStart.length, tagEnd.length];
  }

  private insertSubstring(sourceString: string, subString: string, index: number) {

    let result = sourceString.slice(0, index) + subString + sourceString.slice(index);
    return result;
  }

  private replaceStringRange(sourceString, startIndex, endIndex, replacementString) {
    return sourceString.substring(0, startIndex) + replacementString + sourceString.substring(endIndex);
  }

  enableGrammarChekButton() {
    var text: string = this.sourceTextEditor.nativeElement.innerText;
    var choice = (<HTMLSelectElement>document.getElementById('algorithmKey'))
      .value;
    var trimmed = text.trim();
    if (trimmed.length !== 0 && choice !== '0') {
      this.validateDisabled = true;
    } else {
      this.validateDisabled = false;
    }
  }
  //================================================================================================
  //================================================================================================
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

      offsets = this.hilightSuggestion1(startIndex, endIndex, suggestionIndex);

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

    // if (!this.autoreplace)
    //Attach popups for all suggestions. This is done after setting the html in the editor so that the target DOM elements get initialized
    this.generateSuggestionPopups1();
    // else this.autoSetSuggestion();
  }

  AddIndex(start_index, end_index) {
    return {
      start_index: start_index,
      end_index: end_index,
    };
  }



  private setSourceEditorHtml(htmlText: string) {
    let displayHtml = `<div class='m-2'>${htmlText}</div>`;
    $('#sourceTextEditor').trumbowyg('html', displayHtml);
  }


  private generateSuggestionPopups1() {
    for (let suggestionId in this.suggestionMapping) {
      tippy(`#${suggestionId}`, {
        content: this.getSuggestionsPopupContent1(
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
              //console.log(e);
              let suggestionId = (e.target as any).dataset.suggestionId;
              let replacementText = (e.target as any).innerText;

              this.makeReplacement1(suggestionId, replacementText);
            });
          });
        },
      });
    }
  }

  private makeReplacement1(suggestionId, replacementText) {
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
    this.htmlText = this.replaceStringRange1(
      this.htmlText,
      replaceStartIndex,
      replaceEndIndex,
      replacementText
    );

    this.setSourceEditorHtml(this.htmlText);

    //if (!this.autoreplace)
    //Reset html within editor recreates the DOM within it, so need to rewire events
    this.generateSuggestionPopups1();
  }

  private getSuggestionsPopupContent1(suggestionId, suggestions) {
    let popupHtml = `<div>
                  <div class="list-group">`;

    if (suggestions.length == 0) {
      popupHtml +=
        "<div class='list-group-item'>No Suggestions Available</div>";
    }
    suggestions.forEach((s, i) => {
      this.suggestionText = s.text;

      let replacementId = suggestionId + '_' + i;
      //popupHtml += `<a id='suggestionLink' style="cursor:pointer" data-suggestion-id="${suggestionId}" class="list-group-item list-group-item-action">${s}</a>`;
      popupHtml += `<a id='suggestionLink' style="cursor:pointer" data-suggestion-id="${suggestionId}" class="list-group-item list-group-item-action">${this.suggestionText}</a>`;
    });
    popupHtml += `</div>
              </div>`;
    return popupHtml;
  }

  private insertSubstring1(
    sourceString: string,
    subString: string,
    index: number
  ) {
    let result =
      sourceString.slice(0, index) + subString + sourceString.slice(index);
    return result;
  }

  private replaceStringRange1(
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

  private hilightSuggestion1(
    startIndex: number,
    endIndex: number,
    suggestionId: Number
  ) {
    let suggestionElementId = `suggestion-${suggestionId}`;
    let tagStart = `<span class="mr-1" style='border-bottom: 2px dashed green;' id='${suggestionElementId}'>`;
    let tagEnd = '</span>';

    let offsetLength = tagStart.length + tagEnd.length;

    this.htmlText = this.insertSubstring1(this.htmlText, tagStart, startIndex);
    this.htmlText = this.insertSubstring1(
      this.htmlText,
      tagEnd,
      endIndex + tagStart.length
    );

    return [tagStart.length, tagEnd.length];
  }

}
