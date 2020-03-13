import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()// pr inj un service ds un autre (ici on veut AuthService)
export class AuthGuard implements CanActivate {

    constructor(private authService : AuthService, private router: Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.isAuth){
            return true;
        }
        else {
            this.router.navigate(['/auth']);
        }
    }
}