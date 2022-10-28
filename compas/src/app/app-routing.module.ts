import { IntelligentSearchComponent } from './demos/intelligent-search/intelligent-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TextParaphrasingComponent} from "./demos/text-paraphrasing/text-paraphrasing.component";
import {AuthGuard} from "./guards/auth.guard";
import { TextAbstractiveSummarizationComponent } from './demos/text-abstractive-summarization/text-abstractive-summarization.component';
import { VisualAnalysisComponent } from './demos/visual-analysis/visual-analysis.component';
import {TextSentimentAnalysisComponent} from "./demos/text-sentiment-analysis/text-sentiment-analysis.component";
import { NewsletterGenerationComponent } from './demos/newsletter-generation/newsletter-generation.component';
import { GrammarCheckComponent } from './demos/grammar-check/grammar-check.component';
import { IntelligentMomExtractionComponent } from './demos/intelligent-mom-extraction/intelligent-mom-extraction.component';
import { TextConversationSummarizationComponent } from './demos/text-conversation-summarization/text-conversation-summarization.component';
import { QuestionAnsweringComponent } from './demos/question-answering/question-answering.component';
import { DatavisualizationComponent } from './demos/datavisualization/datavisualization.component';
import { ActionItemExtractionComponent } from './demos/action-item-extraction/action-item-extraction.component';
import { TelepresenceComponent } from './demos/telepresence/telepresence.component';
import { TextToSpeechConversionComponent } from './demos/text-to-speech-conversion/text-to-speech-conversion.component';
import { RealTimeSpeechRecognitionComponent } from './demos/real-time-speech-recognition/real-time-speech-recognition.component';
import {ResumeIntelligenceComponent} from './demos/resume-intelligence/resume-intelligence.component';
import { VirtualPlatformComponent } from './demos/virtual-platform/virtual-platform.component';
import { SearchNotaionComponent } from './demos/search-notaion/search-notation.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },     
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'demos/text-paraphrasing', component: TextParaphrasingComponent, canActivate:[AuthGuard]},
  { path: 'demos/text-abstractive-summarization', component: TextAbstractiveSummarizationComponent, canActivate:[AuthGuard]},
  { path: 'demos/visual-analysis', component: VisualAnalysisComponent, canActivate:[AuthGuard]},
  { path: 'demos/text-sentiment-analysis', component: TextSentimentAnalysisComponent, canActivate:[AuthGuard]},
  { path: 'demos/newsletter-generation', component: NewsletterGenerationComponent, canActivate:[AuthGuard]},
  { path: 'demos/grammar-check', component: GrammarCheckComponent, canActivate:[AuthGuard]},
  { path: 'demos/intelligent-mom-extraction', component: IntelligentMomExtractionComponent, canActivate:[AuthGuard]},
  { path: 'demos/text-conversation-summarization', component: TextConversationSummarizationComponent, canActivate:[AuthGuard]},
  { path: 'demos/question-answering',component:QuestionAnsweringComponent, canActivate:[AuthGuard]},
  { path: 'demos/data-visualization',component:DatavisualizationComponent, canActivate:[AuthGuard]},
  { path: 'demos/action-item-extraction',component:ActionItemExtractionComponent, canActivate:[AuthGuard]},
  { path: 'demos/telepresence',component:TelepresenceComponent, canActivate:[AuthGuard]},
  { path: 'demos/text-speech-conversion',component:TextToSpeechConversionComponent, canActivate:[AuthGuard]},
  { path: 'demos/real-time-speech-recognition',component:RealTimeSpeechRecognitionComponent, canActivate:[AuthGuard]},
  { path: 'demos/resume-intelligence',component:ResumeIntelligenceComponent,canActivate:[AuthGuard]},
  { path: 'demos/intelligent-search', component:IntelligentSearchComponent,canActivate:[AuthGuard]},
  { path: 'demos/virtual-Platform',component:VirtualPlatformComponent, canActivate:[AuthGuard]},
  { path: 'demos/search-notation',component:SearchNotaionComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
