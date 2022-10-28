import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResumeIntelligenceService } from 'src/app/services/resume-intelligence.service';

@Component({
  selector: 'app-resume-analyze',
  templateUrl: './resume-analyze.component.html',
  styleUrls: ['./resume-analyze.component.scss']
})
export class ResumeAnalyzeComponent implements OnInit {
  private userId: string = null;

  resumeAnalysisData = null;

  //   "clusterTag": "AI/ML",
  //   "keywords": [
  //     {
  //       "score": 0.033,
  //       "word": "abovementioned"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "known"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "kerala"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "listener"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "learner"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "optimistic"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "knowledge"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "john"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "place"
  //     },
  //     {
  //       "score": 0.022,
  //       "word": "information"
  //     }
  //   ],
  //   "parsedDetails": {
  //     "Companies worked at": [
  //       "Ace Components & Electronics Pvt. Ltd.",
  //       "Jimcap Electronics Pvt.Ltd"
  //     ],
  //     "degree": [],
  //     "designition": [],
  //     "email": "Sreeramr123@gmail.com",
  //     "name": "SREERAM RAMACHANDRAN",
  //     "phone": "+918921319637",
  //     "skills": [
  //       "Known : English",
  //       " Malayalam(MT)",
  //       " Tamil",
  //       " Hindi",
  //       "Strength : Confident",
  //       " Optimistic",
  //       " Punctual",
  //       " Hardworking",
  //       " Quick Learner",
  //       " Good Listener.",
  //       "1- John Chembukavu",
  //       "Head of Department",
  //       "Electrical and Electronics IESCE",
  //       "",
  //       "Chittilappilly",
  //       " Kerala",
  //       "Contact: +91- 9447808065",
  //       "DECLARAT I ON",
  //       "I hereby declare that the above-mentioned information is correct to the best of my knowledge and I bear the",
  //       "responsibility for the correctness of the above-mentioned particulars.",
  //       "Date: 01/11/2020 SREERAM R",
  //       "Place: Thrissur"
  //     ],
  //     "total_exp": 2019,
  //     "university": []
  //   },
  //   "uniqueId": "af10bdbb1cef43f5b24df17eb93fec79",
  //   "wordCloud": [
  //     "Known : English",
  //     " Malayalam(MT)",
  //     " Tamil",
  //     " Hindi",
  //     "Strength : Confident",
  //     " Optimistic",
  //     " Punctual",
  //     " Hardworking",
  //     " Quick Learner",
  //     " Good Listener.",
  //     "1- John Chembukavu",
  //     "Head of Department",
  //     "Electrical and Electronics IESCE",
  //     "Chittilappilly",
  //     " Kerala",
  //     "Contact: +91- 9447808065",
  //     "DECLARAT I ON",
  //     "I hereby declare that the above-mentioned information is correct to the best of my knowledge and I bear the",
  //     "responsibility for the correctness of the above-mentioned particulars.",
  //     "Date: 01/11/2020 SREERAM R",
  //     "Place: Thrissur"
  //   ]

  // };

  constructor(private resumeService: ResumeIntelligenceService, private authService: AuthenticationService) {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.userId = loggedInUser.userId.replace(/-/g, '');
  }

  ngOnInit(): void {
  }

  updateAnalysis(fileId: string) {
    this.resumeAnalysisData = null;

    this.resumeService.getResumeAnalysis([fileId], this.userId, (response)=> {
      this.resumeAnalysisData = response[0];
    }, (err)=> {});
  }

  isList(item) {
    return Array.isArray(item);
  }

}
