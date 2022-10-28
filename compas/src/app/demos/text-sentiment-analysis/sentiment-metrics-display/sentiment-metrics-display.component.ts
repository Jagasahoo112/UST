import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import tippy from 'tippy.js';


@Component({
  selector: 'sentiment-metrics-display',
  templateUrl: './sentiment-metrics-display.component.html',
  styleUrls: ['./sentiment-metrics-display.component.scss']
})
export class SentimentMetricsDisplayComponent implements OnInit {
  sentenceSentimentResponse = null;
  viewModel = null;
  isProcessing = false;
  supportedAspects = [];
  selectedAspect = null;
  aspectSelectorTippyInstance = null;

 

  // newAspect = {
  //   aspectCategory: "Aspect Category",
  //   isBuiltIn: true,
  //   aspectValues: [
  //     {
  //       aspectName: "aspect to increase",
  //       suggestionType: "increase"
  //     },

  //     {
  //       aspectName: "aspect 2",
  //       suggestionType: "decrease"
  //     },
  //   ]
  // };

  newAspect = this.getNewAspect();
 
  @Output() public aspectCategorySelected = new EventEmitter();

  constructor() { 
    
  }

  ngOnInit(): void {

    this.aspectSelectorTippyInstance = tippy('#selectAspectLink', {
      trigger: 'click',
      content: document.getElementById('aspectOptions'),
      allowHTML: true,
      interactive: true,
      theme: "light",
      placement: "bottom",
      arrow: false
    })[0];

    

  }


  createNewAspect() {
    this.newAspect = this.getNewAspect();
  }

  createNewAspectValue() {
    this.newAspect.aspectValues.push({
      aspectName : "",
      suggestionType: "none",
      aspectColor:"rgb(0,255,0)"
    });
  }


  getNewAspect() {
    return {
      aspectCategory: "",
      isBuiltIn: true,
      aspectValues: [
        {
          aspectName: "",
          suggestionType: "none", 
          aspectColor: "rgb(0,255,0)"
        }
      ]
    }
  }

  removeNewAspectIndex(index) {
    this.newAspect.aspectValues.splice(index, 1);
  }

  addNewAspect() {
    this.supportedAspects.push(this.newAspect);
    this.newAspect = this.getNewAspect();
  }


  onAspectCategorySelected(aspect) {
    this.aspectCategorySelected.emit(aspect.aspectCategory);
    this.selectedAspect = aspect;
    this.aspectSelectorTippyInstance.hide();
  }

  showAnalysisResult(sentimentAnalysisResult) {
    this.sentenceSentimentResponse = sentimentAnalysisResult;
    this.updateViewModel();
  }

  showProcessingStatus(){
    this.sentenceSentimentResponse = null;
    this.viewModel = null;
    this.isProcessing = true;
  }
  
  hideProcessingStatus(){
    this.isProcessing = false;
  }

  reset() {
    this.sentenceSentimentResponse = null;
    this.viewModel = null;
    this.isProcessing = false;
  }
  
  setSupportedAspects(supportedAspects) {
    this.supportedAspects = supportedAspects;
    this.selectedAspect = this.supportedAspects[0];
  }

  updateViewModel() {
    let sentimentScores = this.sentenceSentimentResponse.map(x=>{return {
      sentimentName: x["sentiment_name"],
      sentimentValue: Math.round(x["sentiment_value"] * 100),
      sentimentOldValue: Math.round(x["sentiment_value"] * 100),
      cssClass: this.getCssClassForSentiment(x["sentiment_name"])
    };});

    this.viewModel = sentimentScores;
  }

  getCssClassForSentiment(sentimentName) {
    var className = "bg-primary";

    switch (sentimentName) {
      case "positive":
        className = "bg-success"
        break;

      case "negative":
        className = "bg-danger"
        break;

      case "neutral":
        className = "bg-warning"
        break;

    }

    return className;
  }

}
 