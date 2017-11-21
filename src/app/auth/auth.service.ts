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
                console.debug("Id token acquired");
                _this.accessToken;
            }, 
            function(error){console.error("Error logging in" + error)}
        ); 
    } 
    logout() { 
        this.authApp.logOut(); 
    } 
    handleTokenCallback(token, source) { 
        console.log("Token retrieved from " + source);
        this.access_token = token;
    } 

    public get accessToken() {
        var _this = this;
        console.debug("Trying to get the access token");
        if(!this.access_token) {
            console.debug("Don't currently have the access token. Requesting it from the service");
            _this.authApp.acquireTokenSilent(_this.configService.getAuthConfig.graphScopes).
            then(
                function (token){
                    _this.handleTokenCallback(token, "acquireTokenSilent - success");
                },
                function (error){
                    _this.authApp.acquireTokenPopup(_this.configService.getAuthConfig.graphScopes).
                    then(
                        function(token){
                            _this.handleTokenCallback(token, "acquireTokenPopup");
                        },
                        function(error){console.error("Error retrieving token: " + error);}
                    )
                    console.debug("Error retrieving token: " + error);
                }
            );
        }
        else { console.debug("Already have the access token. Returning it.");}
        return this.access_token;
    }
    
    public get userInfo() { 
        return this.authApp.getUser(); 
    } 
    

    public get isAuthenticated() { 
        return this.userInfo; 
    } 
}