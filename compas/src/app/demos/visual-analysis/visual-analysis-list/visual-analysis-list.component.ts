import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'visual-analysis-list',
  templateUrl: './visual-analysis-list.component.html',
  styleUrls: ['./visual-analysis-list.component.scss']
})
export class VisualAnalysisListComponent implements OnInit {
  @Input() public analysisResults: any;
  @Output() public metricSelected = new EventEmitter();
  @Output() public metricDeselected = new EventEmitter();

  public analysisResultsViewModel = null;
  public analysisStatus = "NoImageSelected";

  constructor() { }

  ngOnInit(): void {
  }

  public updateView() {
    this.createViewModel(this.analysisResults);
  }

  private showAnnotations(objectId:string, metricId:string ) {
    this.metricSelected.emit({objectId: objectId, metricId:metricId});
  }

  private hideAnnotations(objectId:string, metricId:string) {
    this.metricDeselected.emit({objectId: objectId, metricId:metricId});
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


