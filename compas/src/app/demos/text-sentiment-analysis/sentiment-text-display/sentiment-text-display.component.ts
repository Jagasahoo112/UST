import { Component, OnInit, ViewChild } from '@angular/core';
import { TextSentimentAnalysisService } from "../../../services/text-sentiment-analysis.service";
import tippy from 'tippy.js';

declare var $: any;

@Component({
  selector: 'sentiment-text-display',
  templateUrl: './sentiment-text-display.component.html',
  styleUrls: ['./sentiment-text-display.component.scss']
})

export class SentimentTextDisplayComponent implements OnInit {
  currentSuggestions = ["suggestion1", "suggestion2", "suggestion3"];
  @ViewChild("sourceTextEditor") sourceTextEditor;
  contextMenuSuggestions = [];
  originalText: string = "";
  htmlText: string = "";
  sentenceSentimentResponse = [];
  suggestionMapping = {};
  currentAspect = null;

  constructor(private textsentimentanalysis: TextSentimentAnalysisService) {

  }

  ngOnInit(): void {
    (<any>$('#sourceTextEditor')).trumbowyg({
      btns: [["fullscreen"]],
      svgPath: "assets/images/icons.svg"
    });

  }

  public getSourceText() {
    return this.sourceTextEditor.nativeElement.innerText;
  }

  public reset() {
    this.setEditorHtml("");
    //this.checkText();
  }

  public showAnalysisResult(sentimentAnalysisResult, aspect) {
    this.currentAspect = aspect;

    let originalText = this.sourceTextEditor.nativeElement.innerText;
    this.originalText = originalText;
    this.htmlText = originalText;

    this.sentenceSentimentResponse = sentimentAnalysisResult;
    this.hilightSentiments();
  }

  private hilightSentiments() {

    let aspectNames = this.currentAspect.aspectValues.map(x => { return x.aspectName });

    // let positiveSentences = this.sentenceSentimentResponse.filter(x => x.sentiment_name == "positive")[0]["sentence_sentiments"];
    // let negativeSentences = this.sentenceSentimentResponse.filter(x => x.sentiment_name == "negative")[0]["sentence_sentiments"];
    // let neutralSentences = this.sentenceSentimentResponse.filter(x => x.sentiment_name == "neutral")[0]["sentence_sentiments"];

    let aspectSentences = aspectNames.map(aspectName => {
      return this.sentenceSentimentResponse.filter(x => x.sentiment_name == aspectName)[0]["sentence_sentiments"];
    });

    //remap suggestions from relative to absolute offsetting

    // let positiveSentenceSuggestions = positiveSentences.map(x => {
    //   return x.suggestions.map(s => {
    //     return {
    //       start_index: s.start_index + x.start_index,
    //       end_index: s.end_index + x.start_index,
    //       suggestions: s.suggestions
    //     }
    //   })
    // });

    // let negativeSentenceSuggestions = negativeSentences.map(x => {
    //   return x.suggestions.map(s => {
    //     return {
    //       start_index: s.start_index + x.start_index,
    //       end_index: s.end_index + x.start_index,
    //       suggestions: s.suggestions
    //     }
    //   })
    // });

    // let neutralSentenceSuggestions = neutralSentences.map(x => {
    //   return x.suggestions.map(s => {
    //     return {
    //       start_index: s.start_index + x.start_index,
    //       end_index: s.end_index + x.start_index,
    //       suggestions: s.suggestions
    //     }
    //   })
    // });


    let aspectSentenceSuggestions = aspectSentences.map(aspectSentences => {
      return aspectSentences.map(x => {
        return x.suggestions.map(s => {
          return {
            start_index: s.start_index + x.start_index,
            end_index: s.end_index + x.start_index,
            suggestions: s.suggestions
          }
        })
      });
    });




    // let negativeSentenceSuggestions = negativeSentences.map(x => { return x.suggestions });
    // let neutralSentenceSuggestions = neutralSentences.map(x => { return x.suggestions });

    /*---------------build sentence items---------------*/


    // let positiveSentenceItems = positiveSentences.map(x => {
    //   return {
    //     start_index: x.start_index,
    //     end_index: x.end_index,
    //     item_type: "positive",
    //     highlight_strength: x.sentiment_value
    //   };
    // });


    // let negativeSentenceItems = negativeSentences.map(x => {
    //   return {
    //     start_index: x.start_index,
    //     end_index: x.end_index,
    //     item_type: "negative",
    //     highlight_strength: x.sentiment_value
    //   };
    // });

    // let neutralSentenceItems = neutralSentences.map(x => {
    //   return {
    //     start_index: x.start_index,
    //     end_index: x.end_index,
    //     item_type: "neutral",
    //     highlight_strength: x.sentiment_value
    //   };
    // });

    let aspectSentenceItems = aspectSentences.map(aspectSentence => {
      return aspectSentence.map(x => {
        return {
          start_index: x.start_index,
          end_index: x.end_index,
          item_type: x.sentiment_name,
          highlight_strength: x.sentiment_value
        };
      });
    });

    /*--------------------------------------------------------*/

    /*-----------------build suggestion items------------------*/
    // let positiveSuggestionItems = positiveSentenceSuggestions.flatMap(x => {
    //   return x.map(x => {
    //     return {
    //       start_index: x.start_index,
    //       end_index: x.end_index,
    //       item_type: "suggestion",
    //       highlight_strength: 1,
    //       suggestions: x.suggestions
    //     };
    //   });
    // });


    // let negativeSuggestionItems = negativeSentenceSuggestions.flatMap(x => {
    //   return x.map(x => {
    //     return {
    //       start_index: x.start_index,
    //       end_index: x.end_index,
    //       item_type: "suggestion",
    //       highlight_strength: 1,
    //       suggestions: x.suggestions
    //     };
    //   });
    // });


    // let neutralSuggestionItems = neutralSentenceSuggestions.flatMap(x => {
    //   return x.map(x => {
    //     return {
    //       start_index: x.start_index,
    //       end_index: x.end_index,
    //       item_type: "suggestion",
    //       highlight_strength: 1,
    //       suggestions: x.suggestions
    //     };
    //   });
    // });

    let aspectSuggestionItems = aspectSentenceSuggestions.map(aspectSuggestionItem => {
      return aspectSuggestionItem.flatMap(x => {
        return x.map(x => {
          return {
            start_index: x.start_index,
            end_index: x.end_index,
            item_type: "suggestion",
            highlight_strength: 1,
            suggestions: x.suggestions
          };
        });
      });
    });



    /*--------------------------------------------------------*/

    // positiveSuggestionItems = [
    //   {
    //     start_index: 2,
    //     end_index: 7,
    //     item_type: "suggestion",
    //     highlight_strength: 1,
    //     suggestions: ["absolutely loved", "suggestion 2"]
    //   },
    //   {
    //     start_index: 20,
    //     end_index: 25,
    //     item_type: "suggestion",
    //     highlight_strength: 1,
    //     suggestions: ["suggestion 3", "suggestion 4"]
    //   }

    // ];


    // let sentences = positiveSentenceItems
    //   .concat(negativeSentenceItems)
    //   .concat(neutralSentenceItems)
    //   .concat(positiveSuggestionItems)
    //   .concat(negativeSuggestionItems)
    //   .concat(neutralSuggestionItems);

    let sentences = [];
    aspectSentenceItems.forEach(item => {
      sentences = sentences.concat(item);
    });

    aspectSuggestionItems.forEach(item => {
      sentences = sentences.concat(item);
    });


    //this.contextMenuSuggestions = positiveSentenceSuggestions.concat(negativeSentenceSuggestions).concat(neutralSentenceSuggestions);


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

      if (sentence.item_type == "suggestion")
        offsets = this.hilightSuggestion(startIndex, endIndex, this.getColorForSentence(sentence), suggestionIndex);
      else
        offsets = this.hilightSentence(startIndex, endIndex, this.getColorForSentence(sentence));


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
      //sentence["start_index"] += offsets[0];
      sentence["end_index"] += offsets[0] + offsets[1];

      for (let j = index - 1; j >= 0; j--) {
        //update the end index for any parent tags
        if (sentence["start_index"] < sentences[j]["end_index"]) {
          sentences[j]["end_index"] += offsets[0] + offsets[1];
        }
      }

      //suggestions metadata mapping
      if (sentence.item_type == "suggestion") {
        let suggestionId = `suggestion-${suggestionIndex}`;
        this.suggestionMapping[suggestionId] = {
          startIndex: sentence["start_index"],
          endIndex: sentence["end_index"],
          suggestions: sentence["suggestions"]
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
    //let suggestions = ["suggestion 1", "suggestion 2", "suggestion 3"];

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


  private getColorForSentence(sentence) {

    let sentimentStrengthValue = Number(sentence["highlight_strength"]);

    //remap strength from 0.5-1 range to 0.1-1 range since sentiments will be in this range due to thresholding and alpha coloring is prominent
    let min1 = 0.5, max1=1, min2=0.1, max2=1;
    let v = sentimentStrengthValue;
    sentimentStrengthValue = ((v-min1)/(max1-min1) * (max2-min2)) + min2;


    let aspectColor = "";

    if (sentence["item_type"] == "suggestion") {
      aspectColor = "rgba(255,205,0, 1)";
    } else {
      aspectColor = this.currentAspect.aspectValues.filter(x => { return x.aspectName == sentence["item_type"] })[0].aspectColor;
    }

    let colorComponents = this.getColorComponentsFromRGBString(aspectColor);

    aspectColor = `rgba(${colorComponents[0]}, ${colorComponents[1]}, ${colorComponents[2]}, ${colorComponents[3]})`;

    // switch (sentence["item_type"]) {
    //   case "positive":
    //     hilightColor = `rgba(0,${sentimentColorValue},0,${sentimentStrengthValue})`;
    //     break;

    //   case "negative":
    //     hilightColor = `rgba(${sentimentColorValue},0,0, ${sentimentStrengthValue})`;
    //     break;

    //   case "neutral":
    //     hilightColor = `rgba(${sentimentColorValue},${sentimentColorValue},0, ${sentimentStrengthValue})`;
    //     break;

    //   case "suggestion":
    //     hilightColor = "rgba(255,205,0, 1)";
    //     break;

    // }
    return aspectColor;
  }

  private getColorComponentsFromRGBString(color: string) {
    if (color.indexOf('rgb') === 0) {
      if (color.indexOf('rgba') === -1)
        color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
      return color.match(/[\.\d]+/g).map(function (a) {
        return +a
      });
    }
  }

  private hilightSentence(startIndex: number, endIndex: number, hilightColor: string) {
    let tagStart = `<span class='border rounded border-secondary p-1' style='background-color: ${hilightColor};'>`;
    let tagEnd = "</span>";

    //let offsetLength = tagStart.length + tagEnd.length;

    this.htmlText = this.insertSubstring(this.htmlText, tagStart, startIndex);
    this.htmlText = this.insertSubstring(this.htmlText, tagEnd, endIndex + tagStart.length);

    return [tagStart.length, tagEnd.length];

  }

  private hilightSuggestion(startIndex: number, endIndex: number, hilightColor: string, suggestionId: Number) {

    let suggestionElementId = `suggestion-${suggestionId}`;

    let tagStart = `<span class='font-weight-bold m-1' id='${suggestionElementId}' style='cursor:pointer; background-color: ${hilightColor};'>`;
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



  private setEditorHtml(htmlText: string) {
    let displayHtml = `<div class='m-2 d-flex flex-row flex-wrap'>${htmlText}</div>`;
    $('#sourceTextEditor').trumbowyg('html', displayHtml);
  }

  checkText() {
    //let htmlText = "I am a <div id='suggest1' class='badge badge-danger' style='cursor:pointer'>sample</div> text element.";
    //htmlText += "<div id='suggest2' class='badge badge-danger' style='cursor:pointer'>sample2</div>";

    //$('#sourceTextEditor').trumbowyg('html', htmlText);

    //let htmlText = `<span class='border rounded border-secondary p-1' style='background-color: green'> Hello how <span id='suggest1'>are</span> you doing today? </span><span>Hope you are fine</span>`;


    //this.setEditorHtml(htmlText);

    let popup: any = document.querySelector('#suggestionsPopup');

    tippy('#suggest1', {
      content: "Hello there", //popup.innerHTML,
      allowHTML: true,
      interactive: true,
      theme: "light"
    });


    // this.currentSuggestions = ["suggestion3", "suggestion4", "suggestion5"];


    // tippy('#suggest2', {
    //   content: popup.innerHTML,
    //   allowHTML: true,
    //   interactive: true,
    //   theme: "light"
    // });

  }
}

