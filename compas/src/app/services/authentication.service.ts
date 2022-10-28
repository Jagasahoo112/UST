import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import {UserAuthInfo} from '../entities/user-auth-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { of } from 'rxjs';
import {ApiServiceBase} from './api-service-base';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiServiceBase {

  private _isAuthenticated: boolean;
  private _authenticatedUser = null;


  

  private _currentUserSource = new ReplaySubject<UserAuthInfo>(1);
  public currentUser$ = this._currentUserSource.asObservable();

  


  constructor(private router: Router, private http: HttpClient) {
    super();
    this._isAuthenticated = false;
  }

  login(email: string, password: string): Observable<boolean> {
   return this.http.post(this.apiBaseUrl+"api/authentication",
    {email: email, password:password}).pipe(
      map((response:UserAuthInfo) => {
        const user : UserAuthInfo = response;
        if(user) {
          //localStorage.clear();
          //localStorage.removeItem('access_token');
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("access_token", JSON.stringify(user.authToken));
          this._currentUserSource.next(user);
          this._isAuthenticated = true;

          return true;
        } else {
          return false;
        }
      }),
      catchError((error, caught)=>{
        return of(false);
      }));

    // let userMatch = this._users.filter(u => {
    //   return (u.email == email && u.password == password)
    // });

    // if (userMatch.length > 0) {
    //   this._isAuthenticated = true;
    //   this._authenticatedUser = userMatch[0];
    // } else {
    //   this._isAuthenticated = false;
    // }

     //return null;

  }


  async GetUserAccessibleApplications(successCallback, errorCallback) {
    return await this.http.get(this.apiBaseUrl+"api/Application/GetUserAccessibleApplications").subscribe(result => {
      successCallback(result);
     
    });

  }

  async GetUserAccessibleApplications1() {
    return this.http.get(this.apiBaseUrl+"api/Application/GetUserAccessibleApplications").subscribe(result => {
     // successCallback(result);
     
    });

  }

  logout() {
    this._isAuthenticated = false;
    this.router.navigate(['login']);
    //localStorage.removeItem('access_token');
    localStorage.clear();
  }


  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getAuthenticatedUser() {
    const userDetails = localStorage.getItem('user');
    var user = JSON.parse(userDetails);

    //let user = this._authenticatedUser == null ? this._users[0] : this._authenticatedUser; //Temporary for development
    return user;
    // return this._authenticatedUser;
  }

  public loadPersistedUserAuth = ():void => {
    const user:UserAuthInfo = JSON.parse(localStorage.getItem("user"));
    this._currentUserSource.next(user);
  }

}
