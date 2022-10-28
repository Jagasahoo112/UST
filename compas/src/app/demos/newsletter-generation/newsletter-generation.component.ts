import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsletterGenerationService } from "../../services/newsletter-generation.service";
import Stepper from 'bs-stepper';
import { FileSaverService } from 'ngx-filesaver';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'newsletter-generation',
  templateUrl: './newsletter-generation.component.html',
  styleUrls: ['./newsletter-generation.component.scss']
})
export class NewsletterGenerationComponent implements OnInit {

  private stepper: Stepper;
  private sourceFiles = null;
  private templateList = null;

  private selectedTemplateIndex = 0;

  @ViewChild("newsletterDataSourceListing") newsletterDataSourceListing;
  @ViewChild("newsletterTemplateListing") newsletterTemplateListing;
  @ViewChild("newsletterPreview") newsletterPreview;

  private currentStepIndex = 0;




  constructor(private newsletterGenerationService: NewsletterGenerationService,
    private fileSaverService: FileSaverService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    })
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.loadSourceFiles();

      this.newsletterDataSourceListing.newsletterGenerationService = this.newsletterGenerationService;
      this.newsletterDataSourceListing.authenticationService = this.authenticationService;

      this.newsletterDataSourceListing.fileListChanged.subscribe((result) => { this.sourceFiles = result }); //Update file list if new files are uploaded
      this.newsletterTemplateListing.templateSelected.subscribe((result) => { this.selectedTemplateIndex = result["selectedTemplateIndex"]; });

    });

  }


  loadSourceFiles() {
    let loggedInUser = this.authenticationService.getAuthenticatedUser();


    this.newsletterGenerationService.getSourceFiles(loggedInUser.userId, results => {
      this.sourceFiles = results;
      this.newsletterDataSourceListing.setSourceFiles(results);
      this.newsletterDataSourceListing.newsletterServiceBaseUrl = this.newsletterGenerationService.getBaseUrl();
    }, null);
  }

  loadTemplates() {
    this.newsletterGenerationService.getTemplates(results => {
      this.templateList = results;
      this.newsletterTemplateListing.templateList = results;
      this.newsletterTemplateListing.newsletterServiceBaseUrl = this.newsletterGenerationService.getBaseUrl();
    }, null);
  }

  generateNewsletter() {
    this.newsletterPreview.setNewsletterHtml("");
    let selectedTemplateId = this.templateList[this.selectedTemplateIndex]["templateId"];

    let loggedInUserId = this.authenticationService.getAuthenticatedUser().userId;

    this.newsletterGenerationService.generateNewsletter(this.newsletterDataSourceListing.getSelectedFiles(),
                                                        selectedTemplateId, 
                                                        loggedInUserId, 
                                                        result => {
                                                          this.newsletterPreview.setNewsletterHtml(result["newsletterHtml"]);
                                                        }, 
                                                      null);
  }

  downloadPdf() {
    this.newsletterGenerationService.generatePdfFromHtml(this.newsletterPreview.newsletterHtml, result => {
      // var url = window.URL.createObjectURL(result);
      // window.open(url);
      this.newsletterPreview.isDownloadingPdf = false;
      this.fileSaverService.save(result, "Newsletter.pdf");
    }, null);
  }

  downloadWord() {
    this.newsletterGenerationService.generateWordFromHtml(this.newsletterPreview.newsletterHtml, result => {
      // var url = window.URL.createObjectURL(result);
      // window.open(url);
      this.newsletterPreview.isDownloadingWord = false;
      this.fileSaverService.save(result, "Newsletter.docx");
    }, null);
  }

  canStepNext() {
    var canStep = false;

    switch (this.currentStepIndex) {
      case 0:
        if (this.newsletterDataSourceListing != null) {
          let categorizedFileList = this.newsletterDataSourceListing.getSelectedFiles();

          for (let key in categorizedFileList) {
            let fileList = categorizedFileList[key];

            if (fileList.length > 0) {
              canStep = true;
              break;
            }
          }
        }

        break;

      case 1:
        if (this.templateList != null) {
          canStep = true;
        }
        break;

      default:
        break;
    }

    return canStep;
  }

  canStepBack() {
    var canStep = false;

    switch (this.currentStepIndex) {
      case 1:
        canStep = true;
        break;

      case 2:
        canStep = true;
        break;

      default:
        break;
    }

    return canStep;
  }

  handleNextClick() {
   
    //Load templates if not already loaded
    if (this.currentStepIndex == 0 && this.templateList == null) {
      this.loadTemplates();
    }

    if (this.currentStepIndex == 1) {
      this.generateNewsletter();
    }

    this.stepper.next();
    this.currentStepIndex++;

  }

  handleBackClick() {
    this.stepper.previous();
    this.currentStepIndex--;
  }

}
