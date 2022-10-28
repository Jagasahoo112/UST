import { Component, OnInit, ViewChild } from '@angular/core';
import {VisualAnalysisService} from '../../services/visual-analysis.service';

@Component({
  selector: 'app-visual-analysis',
  templateUrl: './visual-analysis.component.html',
  styleUrls: ['./visual-analysis.component.scss']
})
export class VisualAnalysisComponent implements OnInit {
  @ViewChild("visualAnalysisList") visualAnalysisList;
  @ViewChild("annotationCanvas") annotationCanvas;
  @ViewChild("imagePicker") imagePicker;

  public analysisResults = null;
  private selectedImageData = null;


  public analysisResultsViewModel = null; 

  constructor(private visualAnalysisService: VisualAnalysisService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit () {

    setTimeout(()=>{

      this.visualAnalysisService.getSourceImages(results=>{
        console.log("result...... ",results)
        this.imagePicker.imageList = results;
      }, null);

    });
    
  }

  handleMetricSelected(eventArgs) {
    this.annotationCanvas.showAnnotation(eventArgs.objectId, eventArgs.metricId);
  }

  handleMetricDeselected(eventArgs) {
    this.annotationCanvas.hideAnnotation(eventArgs.objectId, eventArgs.metricId);
  }

  handleImageSelected(eventArgs) {
    this.selectedImageData = eventArgs.selectedImage;
    this.analyseImage(this.selectedImageData);
  }

  private analyseImage(imageData) {

    this.annotationCanvas.loadImage(imageData.imagePath);
    this.visualAnalysisList.analysisStatus = "Processing";

    this.visualAnalysisService.analyseImage(imageData.imageId, result=> {
      this.analysisResults = result;

      this.annotationCanvas.analysisResults = this.analysisResults;
      this.annotationCanvas.updateAnnotations();
      this.annotationCanvas.hideAllAnnotations();

      this.visualAnalysisList.analysisResults = this.analysisResults;
      this.visualAnalysisList.analysisStatus = "ResultsAvailable";
      this.visualAnalysisList.updateView();
      //this.createViewModel(result);
    }, null);
  }

  private createViewModel(analysisResults: any) {
    if(analysisResults != null) {
      this.analysisResultsViewModel = analysisResults.map(x=> {
        
        let metricsViewModel = null;

        if(x.metrics != null) {
          metricsViewModel = [];

          x.metrics.forEach(m => {

            if(m.metricId == "MARGINS") {
              let itemMetrics =  [
                {metricName: "Margin Left",   currentValue: `${m.currentValue.left} px`, expectedValue: `${m.expectedValue.left} px`, isValid: (m.currentValue.left == m.expectedValue.left)},
                {metricName: "Margin Top",    currentValue: `${m.currentValue.top} px`, expectedValue: `${m.expectedValue.top} px`, isValid: (m.currentValue.top == m.expectedValue.top)},
                {metricName: "Margin Right",  currentValue: `${m.currentValue.right} px`, expectedValue: `${m.expectedValue.right} px`, isValid: (m.currentValue.right == m.expectedValue.right)},
                {metricName: "Margin Bottom", currentValue: `${m.currentValue.bottom} px`, expectedValue: `${m.expectedValue.bottom} px`, isValid: (m.currentValue.bottom == m.expectedValue.bottom)}
              ];
              metricsViewModel = metricsViewModel.concat(itemMetrics);
            }
          });
            

            
          
      }

        let itemViewModel = {
          objectId: x.objectId,
          metrics: metricsViewModel
        };

        return itemViewModel;
      });
    }
   
  }

}
