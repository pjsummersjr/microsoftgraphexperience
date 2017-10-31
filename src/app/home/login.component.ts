import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { AdalService } from '../adal/adal.service';

@Component({
    templateUrl:'./login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private adalService: AdalService){
        this.adalService.handleCallback();
        if(this.adalService.userInfo){
            this.router.navigate['home'];
        }
    }

    
    ngOnInit() {
        console.log(this.adalService.userInfo);
    }
    
    login(): void {
        this.adalService.login();
    }
    
    public get isLoggedIn() {
        return this.adalService.isAuthenticated;
    }
}