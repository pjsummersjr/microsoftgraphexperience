/// <reference path="../../../node_modules/@types/adal/index.d.ts" />
/// <reference path="../../../node_modules/msal/out/msal.d.ts" />
import { Injectable } from '@angular/core'; 
import { AuthConfigService } from './auth.config.service';

import '../../../node_modules/msal/out/msal';


@Injectable() 
export class AuthService {
    private authApp;
    private access_token;
    constructor(private configService: AuthConfigService) {
        this.authApp = new Msal.UserAgentApplication(configService.getAuthConfig.clientId, null, this.handleTokenCallback);
    }

    login() { 
        var _this = this;
        this.authApp.loginPopup(this.configService.getAuthConfig.graphScopes).
        then(
            function(id_token: string) {
                console.log("Id token acquired");
                _this.accessToken;
            }, 
            function(error){console.log("Error logging in" + error)}
        ); 
    } 
    logout() { 
        this.authApp.logOut(); 
    } 
    handleTokenCallback(errorDesc, token, error, tokenType) { 
        if(!token){
            console.log("Error getting token: " + errorDesc);
        }
    } 

    public get accessToken() {
        var _this = this;
        console.log("Trying to get the access token");
        if(!this.access_token) {
            console.log("Don't currently have the access token. Requesting it from the service");
            _this.authApp.acquireTokenSilent(_this.configService.getAuthConfig.graphScopes).
            then(
                function (token){
                    console.log("Retrieved access token");
                    _this.access_token = token;
                },
                function (error){
                    _this.authApp.acquireTokenPopup(_this.configService.getAuthConfig.graphScopes).
                    then(
                        function(token){_this.access_token = token},
                        function(error){console.log("Error retrieving token: " + error);}
                    )
                    console.log("Error retrieving token: " + error);
                }
            );
        }
        else { console.log("Already have the access token. Returning it.");}
        return this.access_token;
    }
    
    public get userInfo() { 
        return this.authApp.getUser(); 
    } 
    

    public get isAuthenticated() { 
        return this.userInfo; 
    } 
}