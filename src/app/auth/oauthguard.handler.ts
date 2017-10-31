import { Injectable } from '@angular/core'; 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { AuthService } from './auth.service'; 

@Injectable() 
export class OAuthCallbackHandler implements CanActivate { 
    constructor(private router: Router, private adalService: AuthService) { } 
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
        
        if (this.adalService.userInfo) { 
            var returnUrl = route.queryParams['returnUrl']; 
            if (!returnUrl) { 
                this.router.navigate(['home']); 
            } else { 
                this.router.navigate([returnUrl], { queryParams: route.queryParams }); 
            } 
        } 
        else {
            this.router.navigate(['login']); 
        } 
        return false; 
    } 
}