import { Injectable } from '@angular/core'; 

@Injectable() 
export class AdalConfigService { 
    constructor() { } 
    
    public get getAdalConfig(): any { 
        return { 
            //instance: 'https://login.microsoftonline.com/',
            //tenant: 'paulsummfy18.onmicrosoft.com', 
            clientId: 'a3366039-61a6-4078-a426-a106e1319e1d', 
            graphScopes: [],
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/',
            cacheLocation: 'localStorage' 
        }; 
    } 
} 