import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class VisualAnalysisService extends ApiServiceBase{

  //private SERVICE_URL = "http://20.54.90.50";
  private SERVICE_URL = this.compassBaseUrl;
  private GET_IMAGES_ENDPOINT = this.SERVICE_URL + "visualanalysis/Api/GetImages";
  private ANALYSE_IMAGES_ENDPOINT = this.SERVICE_URL + "visualanalysis/Api/VisualAnalysis";

  constructor(private httpClient: HttpClient) { 
    super();
  }

  analyseImage(targetImageId: string, successCallback, errorCallback) {

    let requestJson = { imageId: targetImageId,
                        objectIds: ["EYFrame", "EYLogo", "EYPanel"],
                        analysisParameters: ["MARGINS"]
    };

    this.httpClient.post(this.ANALYSE_IMAGES_ENDPOINT, requestJson).subscribe(result => {
      if(result["error"] == null) {
        let analysisResults = result["response"];
        successCallback(analysisResults);
      } else {
        errorCallback(result["error"]);
      }
  });

    // let analysisResults = [
    //   {
    //     objectId: "EY LOGO",
    //     boundingBox: { left: 470, top: 30, width: 100, height: 100 },
    //     metrics: [
    //       {
    //         metricId: "MARGINS",
    //         currentValue: { left: 470, top: 30, right: 30, bottom: 100 },
    //         expectedValue: { left: 470, top: 30, right: 30, bottom: 100 }
    //       }
    //     ]
    //   },

    //   {
    //     objectId: "EY PANEL",
    //     boundingBox: { left: 30, top: 170, width: 300, height: 230 },
    //     metrics: [
    //       {
    //         metricId: "MARGINS",
    //         currentValue: { left: 30, top: 170, right: 270, bottom: 100 },
    //         expectedValue: { left: 30, top: 170, right: 270, bottom: 100 }
    //       }
    //     ]
    //   },

    //   {
    //     objectId: "EY FRAME",
    //     boundingBox: null,
    //     metrics: null
    //   }


    // ];

    // successCallback(analysisResults);

  }


  getSourceImages(successCallback, errorCallback) {

    this.httpClient.get(this.GET_IMAGES_ENDPOINT).subscribe(result => {
        if(result["error"] == null) {
          var imageList = result["response"];
          imageList = imageList.map(i=>{
            i["imagePath"] = this.SERVICE_URL+"visualanalysis" + i["imagePath"];
            i["thumbnailPath"] = this.SERVICE_URL+"visualanalysis" + i["thumbnailPath"];
            return i;
          })
          successCallback(imageList);
        } else {
          errorCallback(result["error"]);
        }
    });


    // let imageList = [
    //   {
    //     imageId: "IMG1",
    //     thumbnailPath: "assets/images/qc/thumbnails/qc1.jpg",
    //     imagePath: "assets/images/qc/qc1.jpg"
    //   },

    //   {
    //     imageId: "IMG1",
    //     thumbnailPath: "assets/images/qc/thumbnails/qc1.jpg",
    //     imagePath: "assets/images/qc/qc1.jpg"
    //   },

    //   {
    //     imageId: "IMG1",
    //     thumbnailPath: "assets/images/qc/thumbnails/qc1.jpg",
    //     imagePath: "assets/images/qc/qc1.jpg"
    //   },

    //   {
    //     imageId: "IMG1",
    //     thumbnailPath: "assets/images/qc/thumbnails/qc1.jpg",
    //     imagePath: "assets/images/qc/qc1.jpg"
    //   },

    //   {
    //     imageId: "IMG1",
    //     thumbnailPath: "assets/images/qc/thumbnails/qc1.jpg",
    //     imagePath: "assets/images/qc/qc1.jpg"
    //   }

    // ];

    // setTimeout(()=>{successCallback(imageList)}, 2000);
  }



}
