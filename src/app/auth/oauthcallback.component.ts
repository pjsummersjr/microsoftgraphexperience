import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AuthService } from './auth.service'; 
@Component({ 
    template: '<div>Please wait...</div>' 
}) 
export class OAuthCallbackComponent implements OnInit { 
    constructor(private router: Router, private adalService: AuthService) { } 
    
    ngOnInit() { 
        if (!this.adalService.userInfo) { 
            this.router.navigate(['login']); 
        } else { 
            this.router.navigate(['home']); 
        } 
    } 
} 