import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      // if(this.authService.isAuthenticated()) {
      //   return true;
      // } else {
      //   this.router.navigate(["login"]);
      //   return false;
      // }
      
      return this.authService.currentUser$.pipe(
        map(user => {
          if(user) {
            return true;
          }
          else {
            this.router.navigate(['login']);
            return false;
          }
        })
      );
  }
  
}
