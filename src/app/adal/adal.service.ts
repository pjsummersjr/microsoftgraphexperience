/// <reference path="../../../node_modules/@types/adal/index.d.ts" />
/// <reference path="../../../node_modules/msal/out/msal.d.ts" />
import { Injectable } from '@angular/core'; 
import { AdalConfigService } from './adal.config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';

import '../../../node_modules/msal/out/msal';

import 'expose-loader?AuthenticationContext!../../../node_modules/adal-angular/lib/adal.js'; 

let createAuthFunc: adal.AuthenticationContextStatic = AuthenticationContext;

@Injectable() 
export class AdalService {
    private context: adal.AuthenticationContext;
    constructor(private configService: AdalConfigService) {
        this.context = new createAuthFunc(configService.getAdalConfig);
    }

    login() { 
        this.context.login(); 
    } 
    logout() { 
        this.context.logOut(); 
    } 
    handleCallback() { 
        this.context.handleWindowCallback(); 
    } 
    
    public get userInfo() { 
        return this.context.getCachedUser(); 
    } 
    public getAccessToken(resourceId: string):string { 
        return this.context.getCachedToken(resourceId);
        //return this.context.getCachedToken(this.configService.getAdalConfig.clientId); 
    } 

    public getResourceToken(resourceName: string): Observable<string>{
        let _this = this;   // save outer this for inner function      
        let errorMessage: string;

        return Observable.bindCallback(acquireTokenInternal, function (token: string) {

            if (!token && errorMessage) {
                throw (errorMessage);
            }
            return token;
        })();     
        
        function acquireTokenInternal(cb: any): string {

            let s: string = '';
            _this.context.acquireToken(resourceName, (error: string, tokenOut: string) => {
                if (error) {

                    _this.context.error('Error when acquiring token for resource: ' + resourceName, error);

                    errorMessage = error;

                    cb(<string>null);

                } else {

                    cb(tokenOut);

                    s = tokenOut;

                }
            });
            return s;
        }
    }

    public get isAuthenticated() { 
        return this.userInfo; 
    } 
}