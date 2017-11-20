import { Injectable } from '@angular/core'; 

@Injectable() 
export class AuthConfigService { 
    constructor() { } 
    
    public get getAuthConfig(): any { 
        return { 
            clientId: 'ff58daec-2e99-4ece-9f34-05eedc1aff51', 
            graphScopes: ["Sites.ReadWrite.All","Calendars.Read"],
            cacheLocation: 'localStorage' 
        }; 
    } 
} 