import { Observable } from 'rxjs/Observable'; 
import { Injectable } from '@angular/core'; 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router'; 
import { AuthService } from './auth.service'; 

@Injectable() 
export class AuthenticationGuard implements CanActivate { 
    constructor(private router: Router, private adalService: AuthService) { } 
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
        let navigationExtras: NavigationExtras = { 
            queryParams: { 'redirectUrl': route.url } 
        }; 
        
        if (!this.adalService.userInfo) { 
            this.router.navigate(['login'], navigationExtras); 
        } 
        return true; 
    } 
} 