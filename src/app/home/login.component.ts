import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl:'./login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private adalService: AuthService){        

    }

    
    ngOnInit() {
        console.debug(this.adalService.userInfo);        
        if(this.adalService.isAuthenticated){
            this.router.navigate['home'];
        }
    }
    
    login(): void {
        this.adalService.login();
    }
    
    public get isLoggedIn() {
        return this.adalService.isAuthenticated;
    }
}