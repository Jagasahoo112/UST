import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  authenticatedUser = {
    userId: null,
    email: null,
    password: null,
    fullName: "Guest",
    thumbnail: "lab.jpg"
  };

  constructor(public authService: AuthenticationService) {
    let loggedInUser = this.authService.getAuthenticatedUser();
    this.authenticatedUser = loggedInUser;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
