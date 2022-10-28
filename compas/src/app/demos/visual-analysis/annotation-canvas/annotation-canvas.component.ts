import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare const fabric: any;

@Component({
  selector: 'annotation-canvas',
  templateUrl: './annotation-canvas.component.html',
  styleUrls: ['./annotation-canvas.component.scss']
})
export class AnnotationCanvasComponent implements OnInit {

  @ViewChild("annotationCanvas") annotationCanvas;
  @ViewChild("annotationImage") annotationImage;

  private canvas: any;
  @Input() private analysisResults: any;

  private annotationGraphics = {};
  private currentImageGraphic = null;
  private boundingBoxGraphics = {};

  private imageWidthScaleFactor = 1;
  private imageHeightScaleFactor = 1;
  private imgWidth = 0;
  private imgHeight = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.annotationCanvas.nativeElement);
    this.canvas.backgroundColor = 'gray';


    this.loadImage("assets/images/img-placeholder-lg.jpg");

  }

 public loadImage(imageUrl:string) {

  this.removeAllGraphics();

  fabric.Image.fromURL(imageUrl, (img) => {

    let canvasWidth = 600;
    let canvasHeight = 600;

    //i create an extra var for to change some image properties
    var imgGraphic = img.set({ left: 0, top: 0, selectable: false /*, scaleX: this.imageWidthScaleFactor, scaleY: this.imageHeightScaleFactor*/ });
    
    
    
    if(img.width > img.height) {
      imgGraphic.scaleToWidth(canvasWidth);
    } else {
      imgGraphic.scaleToHeight(canvasHeight);
    }

    this.imgWidth = imgGraphic.width * imgGraphic.scaleX;
    this.imgHeight = imgGraphic.height * imgGraphic.scaleY;

    this.imageWidthScaleFactor = this.imgWidth / img.width;
    this.imageHeightScaleFactor =  this.imgHeight / img.height;

    this.canvas.add(imgGraphic);
    imgGraphic.sendToBack();

    this.currentImageGraphic = imgGraphic;

  });
 }

  public showAnnotation(objectId, annotationId) {
    this.setAnnotationVisibility(objectId, annotationId, true);
  }

  public hideAnnotation(objectId, annotationId) {
      this.setAnnotationVisibility(objectId, annotationId, false);
  }

  public updateAnnotations() {
    if (this.analysisResults == null) {
      return;
    }

    this.analysisResults.forEach(ob => {

      let bb = {...ob.boundingBox}; 

      //rescale bb according to scaled image
      bb.left = bb.left * this.imageWidthScaleFactor;
      bb.top = bb.top * this.imageHeightScaleFactor;
      bb.width = bb.width * this.imageWidthScaleFactor;
      bb.height = bb.height * this.imageHeightScaleFactor;




      if (bb != null) {
        // create a rectangle object
        var bbRect = new fabric.Rect({
          left: bb.left,
          top: bb.top,
          width: bb.width,
          height: bb.height,
          stroke: 'red',
          fill: 'red',
          opacity: 0.3,
          strokeWidth: 2,
          selectable: false
        });

        this.boundingBoxGraphics[ob.objectId] = bbRect;

        // "add" rectangle onto canvas
        this.canvas.add(bbRect);
      }

      var annotations = {};


      if (ob.metrics != null) {
        ob.metrics.forEach(m => {
          if (m.metricId == "MARGINS") {
            let margin = {...m.currentValue};
            let margin_unscaled = m.currentValue;

            //Rescale margins
            margin.left *= this.imageWidthScaleFactor;
            margin.top *= this.imageHeightScaleFactor;
            margin.right *= this.imageWidthScaleFactor;
            margin.bottom *= this.imageHeightScaleFactor;
            

            let cx = bb.left + (bb.width / 2.0);
            let cy = bb.top + (bb.height / 2.0);

            let marginLeftGraphics = this.drawMeasurementLine(0, cy, margin.left, cy, `${margin_unscaled.left} px`); //left margin
            let marginTopGraphics = this.drawMeasurementLine(cx, 0, cx, margin.top, `${margin_unscaled.top} px`); //top margin
            let marginRightGraphics = this.drawMeasurementLine((bb.left + bb.width), cy, this.imgWidth, cy, `${margin_unscaled.right} px`); //right margin
            let marginBottomGraphics = this.drawMeasurementLine(cx, (bb.top + bb.height), cx, this.imgHeight, `${margin_unscaled.bottom} px`); //bottom margin

            annotations["Margin Left"] = marginLeftGraphics;
            annotations["Margin Top"] = marginTopGraphics;
            annotations["Margin Right"] = marginRightGraphics;
            annotations["Margin Bottom"] = marginBottomGraphics;
          }
        });
      }

      this.annotationGraphics[ob.objectId] = annotations;
    });

  }

  private setAnnotationVisibility(objectId, annotationId, isVisible) {

    if (this.annotationGraphics[objectId] != null && this.annotationGraphics[objectId][annotationId] != null) {
      this.annotationGraphics[objectId][annotationId].forEach(g => {
        g.visible = isVisible;
      });

      this.canvas.renderAll();
    }
  }

  private hideAllAnnotations() {
    for (let key in this.annotationGraphics) {
      let annotations = this.annotationGraphics[key];

      if (annotations != null) {
        for (let key in annotations) {
          let graphicsList = annotations[key];
          graphicsList.forEach(x=>{
            x.visible = false;
          });
        }
      }
    }

    this.canvas.renderAll();
  }

  private removeAllGraphics() {

    //Clear Image
    if(this.currentImageGraphic != null) {
      this.canvas.remove(this.currentImageGraphic);
    }


    //Clear bounding boxes
    for(let key in this.boundingBoxGraphics) {
      let bbGraphic = this.boundingBoxGraphics[key];

      this.canvas.remove(bbGraphic);
    }

    //Clear annotations
    for (let key in this.annotationGraphics) {
      let annotations = this.annotationGraphics[key];

      if (annotations != null) {
        for (let key in annotations) {
          let graphicsList = annotations[key];
          graphicsList.forEach(x=>{
            this.canvas.remove(x);
          });
        }
      }
    }

    this.canvas.renderAll();
  }

  private drawMeasurementLine(x1, y1, x2, y2, text) {
    let lineStrokeWidth = 2;
    let line = new fabric.Line([x1, y1, x2, y2], { stroke: "red", strokeWidth: lineStrokeWidth, selectable: false });

    let c1 = new fabric.Circle({ radius: 3, fill: "red", originX: "center", originY: "center", left: x1, top: y1, selectable: false });
    let c2 = new fabric.Circle({ radius: 3, fill: "red", originX: "center", originY: "center", left: x2, top: y2, selectable: false });

    
    let avgTextWidthPixels = 10;
    let avgTextHeightPixels = 10;

    let textLeftPos = (((x2 - x1) == 0) ? x1 : (Math.min(x1,x2) + (Math.abs(x2 - x1) / 2.0))) - avgTextWidthPixels; //position center horizontally if needed
    let textTopPos = (((y2 - y1) == 0) ? y1 :  (Math.min(y1,y2) + (Math.abs(y2 - y1) / 2.0))) - avgTextHeightPixels; //position center vertically if needed
    let textGraphic = new fabric.Text(text, { left: textLeftPos, top: textTopPos, fontSize: 10, fill: "yellow" });
    this.canvas.add(textGraphic);
    this.canvas.add(line, c1, c2);

    return [textGraphic, line, c1, c2];
  }

}
