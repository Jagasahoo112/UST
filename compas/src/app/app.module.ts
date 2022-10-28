import { TrailingTextPipe } from './pipes/trailing-text.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SolutionTileListComponent } from './solution-tile-list/solution-tile-list.component';
import { TextParaphrasingComponent } from './demos/text-paraphrasing/text-paraphrasing.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { TextAbstractiveSummarizationComponent } from './demos/text-abstractive-summarization/text-abstractive-summarization.component';
import { VisualAnalysisComponent } from './demos/visual-analysis/visual-analysis.component';
import { TextSentimentAnalysisComponent } from './demos/text-sentiment-analysis/text-sentiment-analysis.component';
import { SentimentTextDisplayComponent } from './demos/text-sentiment-analysis/sentiment-text-display/sentiment-text-display.component';
import { SentimentMetricsDisplayComponent } from './demos/text-sentiment-analysis/sentiment-metrics-display/sentiment-metrics-display.component';
import { AnnotationCanvasComponent } from './demos/visual-analysis/annotation-canvas/annotation-canvas.component';
import { VisualAnalysisListComponent } from './demos/visual-analysis/visual-analysis-list/visual-analysis-list.component';
import { ImagePickerComponent } from './demos/visual-analysis/image-picker/image-picker.component';
import { NewsletterGenerationComponent } from './demos/newsletter-generation/newsletter-generation.component';
import { QuillModule } from 'ngx-quill';
import { NewsletterDataSourceListingComponent } from './demos/newsletter-generation/newsletter-data-source-listing/newsletter-data-source-listing.component';
import { NewsletterTemplateListingComponent } from './demos/newsletter-generation/newsletter-template-listing/newsletter-template-listing.component';
import { NewsletterPreviewComponent } from './demos/newsletter-generation/newsletter-preview/newsletter-preview.component';
import { GrammarCheckComponent } from './demos/grammar-check/grammar-check.component'
import { FileSaverModule } from 'ngx-filesaver';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { IntelligentMomExtractionComponent } from './demos/intelligent-mom-extraction/intelligent-mom-extraction.component';
import { IntelligentMomConversationListingComponent } from './demos/intelligent-mom-extraction/intelligent-mom-conversation-listing/intelligent-mom-conversation-listing.component';
import { IntelligentMomSummaryComponent } from './demos/intelligent-mom-extraction/intelligent-mom-summary/intelligent-mom-summary.component';
import { IntelligentMomActionItemsListingComponent } from './demos/intelligent-mom-extraction/intelligent-mom-action-items-listing/intelligent-mom-action-items-listing.component';
import { TextConversationSummarizationComponent } from './demos/text-conversation-summarization/text-conversation-summarization.component';
import { QuestionAnsweringComponent } from './demos/question-answering/question-answering.component';
import { QuestionAnsweringContentDisplayComponent } from './demos/question-answering/question-answering-content-display/question-answering-content-display.component';
import { QuestionAnsweringAnswerDetailsComponent } from './demos/question-answering/question-answering-answer-details/question-answering-answer-details.component';
import { DatavisualizationComponent } from './demos/datavisualization/datavisualization.component';
import { ActionItemExtractionComponent } from './demos/action-item-extraction/action-item-extraction.component';
import { ActionItemExtractionContentDisplayComponent } from './demos/action-item-extraction/action-item-extraction-content-display/action-item-extraction-content-display.component';
import { ActionItemExtractionListItemsComponent } from './demos/action-item-extraction/action-item-extraction-list-items/action-item-extraction-list-items.component';
import { FormValidatorDirective } from './validator/form-validator.directive';
import { TelepresenceComponent } from './demos/telepresence/telepresence.component';
import { TextToSpeechConversionComponent } from './demos/text-to-speech-conversion/text-to-speech-conversion.component';
import { AuthInterceptor } from './interceptor/AuthInterceptor';
import { RealTimeSpeechRecognitionComponent } from './demos/real-time-speech-recognition/real-time-speech-recognition.component';
import { ResumeIntelligenceComponent } from './demos/resume-intelligence/resume-intelligence.component';
import { ResumeRepositoryComponent } from './demos/resume-intelligence/resume-repository/resume-repository.component';
import { ResumeSearchComponent } from './demos/resume-intelligence/resume-search/resume-search.component';
import { ResumeAnalyzeComponent } from './demos/resume-intelligence/resume-analyze/resume-analyze.component';
import { ResumeDocumentListComponent } from './demos/resume-intelligence/resume-repository/resume-document-list/resume-document-list.component';
import { ResumeDocumentViewComponent } from './demos/resume-intelligence/resume-repository/resume-document-view/resume-document-view.component';
import { ResumeFileUploderComponent } from './demos/resume-intelligence/resume-repository/resume-file-uploder/resume-file-uploder.component';
import { ResumeRepositorySearchComponent } from './demos/resume-intelligence/resume-repository/resume-repository-search/resume-repository-search.component';
import { ResumeSearchQueryComponent } from './demos/resume-intelligence/resume-search/resume-search-query/resume-search-query.component';
import { ResumeSearchQuerySuggestionsComponent } from './demos/resume-intelligence/resume-search/resume-search-query-suggestions/resume-search-query-suggestions.component';
import { ResumeSearchResultComponent } from './demos/resume-intelligence/resume-search/resume-search-result/resume-search-result.component';
import { ResumeSearchResultFileViewComponent } from './demos/resume-intelligence/resume-search/resume-search-result/resume-search-result-file-view/resume-search-result-file-view.component';
import { ResumeDocumentViewFileComponent } from './demos/resume-intelligence/resume-repository/resume-document-list/resume-document-view-file/resume-document-view-file.component';
import { IntelligentSearchComponent } from './demos/intelligent-search/intelligent-search.component';
import { RepositoryComponent } from './demos/intelligent-search/repository/repository.component';
import { DocumentListComponent } from './demos/intelligent-search/repository/document-list/document-list.component';
import { DocumentViewFileComponent } from './demos/intelligent-search/repository/document-list/document-view-file/document-view-file.component';
import { DocumentViewComponent } from './demos/intelligent-search/repository/document-view/document-view.component';
import { RepositorySearchComponent } from './demos/intelligent-search/repository/repository-search/repository-search.component';
import { SearchRootComponent } from './demos/intelligent-search/search-root/search-root.component';
import { SearchQueryComponent } from './demos/intelligent-search/search-root/search-query/search-query.component';
import { SearchResultComponent } from './demos/intelligent-search/search-root/search-result/search-result.component';
import { SearchResultFileViewComponent } from './demos/intelligent-search/search-root/search-result/search-result-file-view/search-result-file-view.component';
import { SearchQuerySuggestionsComponent } from './demos/intelligent-search/search-root/search-query-suggestions/search-query-suggestions.component';
import { FileUploaderIntelligentSearchComponent} from './demos/intelligent-search/repository/file-uploader/file-uploader.component';
import { ToastrModule } from 'ngx-toastr';
import { VirtualPlatformComponent } from './demos/virtual-platform/virtual-platform.component';
import { SearchNotaionComponent } from './demos/search-notaion/search-notation.component';  
import {MatGridListModule} from '@angular/material/grid-list';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; 
import { NgxDocViewerModule } from 'ngx-doc-viewer'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SolutionTileListComponent,
    TextParaphrasingComponent,
    MainNavbarComponent,
    TextAbstractiveSummarizationComponent,
    VisualAnalysisComponent,
    AnnotationCanvasComponent,
    TextSentimentAnalysisComponent,
    SentimentTextDisplayComponent,
    SentimentMetricsDisplayComponent,
    VisualAnalysisListComponent,
    ImagePickerComponent,
    NewsletterGenerationComponent,
    NewsletterDataSourceListingComponent,
    NewsletterTemplateListingComponent,
    NewsletterPreviewComponent,
    GrammarCheckComponent,
    FileUploaderComponent,
    IntelligentMomExtractionComponent,
    IntelligentMomConversationListingComponent,
    IntelligentMomSummaryComponent,
    IntelligentMomActionItemsListingComponent,
    TextConversationSummarizationComponent,
    QuestionAnsweringComponent,
    QuestionAnsweringContentDisplayComponent,
    QuestionAnsweringAnswerDetailsComponent,
    DatavisualizationComponent,
    ActionItemExtractionComponent,
    ActionItemExtractionContentDisplayComponent,
    ActionItemExtractionListItemsComponent,
    FormValidatorDirective,
    TelepresenceComponent,
    TextToSpeechConversionComponent,
    RealTimeSpeechRecognitionComponent,
    ResumeIntelligenceComponent,
    ResumeRepositoryComponent,
    ResumeSearchComponent,
    ResumeAnalyzeComponent,
    ResumeDocumentListComponent,
    ResumeDocumentViewComponent,
    ResumeFileUploderComponent,
    ResumeRepositorySearchComponent,
    ResumeSearchQueryComponent,
    ResumeSearchQuerySuggestionsComponent,
    ResumeSearchResultComponent,
    ResumeSearchResultFileViewComponent,
    TrailingTextPipe,
    ResumeDocumentViewFileComponent,
    IntelligentSearchComponent,
    RepositoryComponent,
    DocumentListComponent,
    DocumentViewFileComponent,
    DocumentViewComponent,
    RepositorySearchComponent,
    SearchRootComponent,
    SearchQueryComponent,
    SearchResultComponent,
    SearchResultFileViewComponent,
    SearchQuerySuggestionsComponent,
    FileUploaderIntelligentSearchComponent,
    VirtualPlatformComponent,
    SearchNotaionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FileSaverModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ColorPickerModule ,
    MatGridListModule,
    PdfViewerModule,
    NgxDocViewerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },TrailingTextPipe],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

}
