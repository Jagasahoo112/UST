import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'solutionslab-beta';
  constructor(private authenticationService:AuthenticationService){
       
  }

  ngOnInit(): void {
    this.authenticationService.loadPersistedUserAuth();
  }
}
