import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DisclaimerService } from 'src/app/services/disclaimer.service'
import {AuthenticationService} from '../services/authentication.service';
import {map} from 'rxjs/operators';
import { UserAuthInfo } from '../entities/user-auth-info';

declare var $: any;

@Component({
  selector: 'solution-tile-list',
  templateUrl: './solution-tile-list.component.html',
  styleUrls: ['./solution-tile-list.component.scss']
})
export class SolutionTileListComponent implements OnInit {

  disclaimer: boolean;

  applicationList = [];
  solutionList = [];
  applicationRoles = [];
  originalList = [];
  public authError: string = "";

  // public solutionList1 = [
  //   {
  //     title: "Intelligent MoM Generation",
  //     description: "A solution that automatically identifies speakers from meeting audio and extracts the meeting minutes.",
  //     headerImage: "card-header-audio.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Speech & Audio",
  //     demoLink: "demos/intelligent-mom-extraction"
  //   },

  //   {
  //     title: "Visual Analysis",
  //     description: "A solution that analyses visual structure of documents, validates against rules and detects any deviations.",
  //     headerImage: "card-header-vision.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Computer Vision",
  //     demoLink: "/demos/visual-analysis"
  //   },

  //   {
  //     title: "Intelligent Content Curation Tool",
  //     description: "A solution that detects multiple aspects within input text and helps in content curation by providing intelligent suggestions to reduce the influence of undesirable aspects within the content.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "/demos/text-sentiment-analysis"
  //   },


  //   {
  //     title: "Intelligent Newsletter Generation",
  //     description: "A solution that intelligently generates newsletters intelligently extracting content from source material alongside supporting flexible output templates.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "/demos/newsletter-generation"
  //   },

  //   {
  //     title: "Text Paraphrasing",
  //     description: "A solution that paraphrases input text alongside offering multiple suggestions to choose from.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "/demos/text-paraphrasing"
  //   },

  //   {
  //     title: "Abstractive Text Summarization",
  //     description: "A solution that generates abstractive summary of input text.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "/demos/text-abstractive-summarization"
  //   },



  //   {
  //     title: "Document Grammar and Spell Check",
  //     description: "A solution that does grammar and spelling checks providing intelligent suggestions.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "/demos/grammar-check"
  //   },

  //   // {
  //   //   title: "Intelligent MoM Generation",
  //   //   description: "A solution that automatically identifies speakers from meeting audio and extracts the meeting minutes.",
  //   //   headerImage: "card-header-audio.jpg",
  //   //   isDemoAvailable: false,
  //   //   isApiAvailable: false,
  //   //   isFeatured: false,
  //   //   category: "Speech & Audio",
  //   //   demoLink: "/demos/"
  //   // },

  //   {
  //     title: "Conversation Text Summarization",
  //     description: "A solution that generates abstractive summary of conversation text.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "/demos/text-conversation-summarization"
  //   },
  //   {
  //     title: "Intelligent Question Answering",
  //     description: "A solution that search for the answer from uploaded document based on the user query.",
  //     headerImage: "card-header-nlp.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Text & NLP",
  //     demoLink: "demos/question-answering"
  //   },
  //   {
  //     title: "Data Visualization",
  //     description: "A solution that allows advanced data visualizations.",
  //     headerImage: "card-header-vision.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "AR/VR",
  //     demoLink: "demos/data-visualization"
  //   },
  //   {
  //     title: "Speech-Driven Action Item Extraction",
  //     description: "A solution that transcribes audio recording containing custom catch-phrases and extracts/exports action items to Teams Planner.",
  //     headerImage: "card-header-audio.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Speech & Audio",
  //     demoLink: "demos/action-item-extraction"
  //   },
  //   {
  //     title: "3D Telepresence",
  //     description: "Capture any location in 3D and enable presentations in telepresence mode.",
  //     headerImage: "card-header-vision.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "AR/VR",
  //     demoLink: "demos/telepresence"
  //   },
  //   {
  //     title: "Real-Time Speech Synthesis",
  //     description: "Generate streaming audio from text/documents with ability to control audio parameters and highlight spoken text.",
  //     headerImage: "card-header-audio.jpg",
  //     isDemoAvailable: true,
  //     isApiAvailable: false,
  //     isFeatured: true,
  //     category: "Speech & Audio",
  //     demoLink: "demos/text-speech-conversion"
  //   }


  // ];



  public solutionCategories = ["Featured", "Computer Vision", "Speech & Audio", "Text & NLP", "AR/VR", "All"];
  public currentTab = this.solutionCategories[0];


  constructor(private router: Router, private disclaimerService: DisclaimerService, private authService: AuthenticationService) { }

  ngOnInit(): void {

    if (!this.disclaimerService.isDisclaimerDisplayed()) {
      $("#disclaimerModal").modal('show');
      this.disclaimerService.notifyDisclaimerDisplay();
    }
    this.authService.GetUserAccessibleApplications(
      r => {
        console.log(r) 
         
        this.solutionList = r;
        // var staticarraylist=[];

        // staticarraylist["appId"]= "3e23efe4-2549-47f9-9351-1a6a49ce36bd";
        // staticarraylist["appName"]= "Research Link PlatformDemo";
        // staticarraylist["category"]= "Text & NLP";
        // staticarraylist["demoLink"]= "/demos/search-notaion";
        // staticarraylist["description"]= "A complete 3d solution where we can virtually conduct any event to the audience, with a digital host, that can listen and respond to presenter's commands.";
        // staticarraylist["headerImage"]= "card-header-nlp.jpg";
        // staticarraylist["isApiAvailable"]= false;
        // staticarraylist["isDemoAvailable"]= true;
        // staticarraylist["isFeatured"]= true;
        // this.solutionList.push(staticarraylist);
    this.originalList =r

      },
      e => {
      });

  }
  filterApplications(category){
    
    this.currentTab  = category;
    if (this.currentTab == "Featured") {
      this.solutionList = this.originalList.filter(s => s.isFeatured);
     // return this.solutionList.filter(s => s.isFeatured);
    } else if (this.currentTab == "All") {
      this.solutionList = this.originalList;
      //return this.solutionList;
    } else {
      this.solutionList = this.originalList.filter(s => s.category == this.currentTab);
     // return this.solutionList.filter(s => s.category == this.currentTab)
    }
  }
  getSolutionsForActiveTab() {

    if (this.currentTab == "Featured") {
      return this.solutionList.filter(s => s.isFeatured && s.category == "Speech & Audio");
    } else if (this.currentTab == "All") {
      return this.solutionList;
    } else {
      return this.solutionList.filter(s => s.category == this.currentTab)
    }
  }

}
