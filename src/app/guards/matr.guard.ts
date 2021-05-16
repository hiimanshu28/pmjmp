import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyauthService } from '../services/myauth.service';

@Injectable({
  providedIn: 'root'
})
export class MatrGuard implements CanActivate {
  constructor(private myauth:MyauthService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.myauth.isLoggedIn) this.router.navigateByUrl('profile');
    else this.router.navigateByUrl('signin');
    return true;
  }
  
}
