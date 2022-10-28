import { Component, OnInit, ViewChild } from '@angular/core';
import { TextSentimentAnalysisService } from "../../services/text-sentiment-analysis.service";
import { SentimentMetricsDisplayComponent } from './sentiment-metrics-display/sentiment-metrics-display.component';
import { SentimentTextDisplayComponent } from './sentiment-text-display/sentiment-text-display.component';

@Component({
  selector: 'app-text-sentiment-analysis',
  templateUrl: './text-sentiment-analysis.component.html',
  styleUrls: ['./text-sentiment-analysis.component.scss']
})
export class TextSentimentAnalysisComponent implements OnInit {
  @ViewChild("textDisplay") textDisplay: SentimentTextDisplayComponent;
  @ViewChild("metricsDisplay") metricsDisplay: SentimentMetricsDisplayComponent;

  sentimentAnalysisResult = null;
  isProcessing = false;
  currentAspect = null;

  supportedAspects = [
    {
      aspectCategory: "Sentiment Analysis",
      isBuiltIn: true,
      aspectValues: [
        {
          aspectName: "positive",
          suggestionType: "none",
          aspectColor: "rgb(0,255,0)"
        },

        {
          aspectName: "negative",
          suggestionType: "decrease",
          aspectColor: "rgb(255,0,0)"
        },

        {
          aspectName: "neutral",
          suggestionType: "none",
          aspectColor: "rgb(255,255,0)"
        }
      ]
    },


    {
      aspectCategory: "Gender Analysis",
      isBuiltIn: true,
      aspectValues: [
        {
          aspectName: "masculine",
          suggestionType: "increase",
          aspectColor: "rgb(0,125,255)"
        },

        {
          aspectName: "feminine",
          suggestionType: "decrease",
          aspectColor: "rgb(255,0,125)"
        },
      ]
    },

  
    {
      aspectCategory: "Happiness Analysis",
      isBuiltIn: true,
      aspectValues: [
        {
          aspectName: "happy",
          suggestionType: "increase",
          aspectColor: "rgb(0,255,0)"
        },

        {
          aspectName: "sad",
          suggestionType: "decrease",
          aspectColor: "rgb(255,0,0)"
        },
      ]
    },



  ];


  constructor(private textSentimentAnalysisService: TextSentimentAnalysisService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {

    this.currentAspect = this.supportedAspects[0];

    this.metricsDisplay.aspectCategorySelected.subscribe((x)=>{
      let selectedAspect = this.supportedAspects.filter((a)=>{return a.aspectCategory == x;})[0];
      this.currentAspect = selectedAspect;
      console.log(selectedAspect);
    });


    setTimeout(() => {
      this.metricsDisplay.setSupportedAspects(this.supportedAspects);
    });

  }

  analyseSentiments() {

    this.isProcessing = true;
    this.metricsDisplay.showProcessingStatus();

    this.textSentimentAnalysisService.textSentimentAnalysisText(this.textDisplay.getSourceText(), this.currentAspect.aspectValues, 
      result => {
        this.isProcessing = false;
        this.metricsDisplay.hideProcessingStatus();

        this.sentimentAnalysisResult = result;
        this.textDisplay.showAnalysisResult(this.sentimentAnalysisResult, this.currentAspect);
        this.metricsDisplay.showAnalysisResult(this.sentimentAnalysisResult);
        return;

      },
      error => {
        this.isProcessing = false;
        console.log(error);
      });
  }


  reset() {
    this.textDisplay.reset();
    this.metricsDisplay.reset();
  }

}
