import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DisclaimerService } from 'src/app/services/disclaimer.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  public authError: string = "";

  constructor(private router: Router, private authService: AuthenticationService, private disclaimerService: DisclaimerService) { }

  ngOnInit(): void {
  }

  login() {
    this.authError = "";
    this.authService.login(this.email, this.password).subscribe(success=>{
      if(success)
      {
        this.disclaimerService.reset();
      this.router.navigate(['dashboard']);   
      } else {
        this.authError = "Sign-in failed. Invalid email or password.";
      }
    }, error=>{
      this.authError = "Error occured during sign-in. Please try again.";
    });

    // if (this.authService.login(this.email, this.password)) {
    //   this.disclaimerService.reset();
    //   this.router.navigate(['dashboard']);
    // } else {
    //   this.authError = "Sign-in failed. Invalid email or password.";
    // }
  }

  isAuthError(): boolean {
    return (this.authError.length > 0);
  }

}
