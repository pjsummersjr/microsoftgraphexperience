import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Document} from '../doclist/document';
import { SharePointSite } from '../entities/site';

import {AuthService} from '../auth/auth.service';

let graphEndPoints = {
    baseEndPoint: "https://graph.microsoft.com/",
    beta: this.baseEndPoint + "/beta",
    myTrending: "https://graph.microsoft.com/beta/me/insights/trending?$select=",
    sites: "https://graph.microsoft.com/v1.0/sites/root?$select=description,id,lastModifiedDateTime,name,webUrl,displayName",
    spRootSite: "https://graph.microsoft.com/v1.0/sites/root?$select=description,id,lastModifiedDateTime,name,webUrl,displayName"
}

@Injectable()
export class GraphService {
    constructor(private authService: AuthService, private http: Http){}

   
    getMyTrending(): Observable<Document[]>{
        let url = graphEndPoints.myTrending;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).map(response => response.json().value as Document[]);
    }

    getSites(): Observable<SharePointSite[]> {
        let url = graphEndPoints.sites;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).map(response => response.json() as SharePointSite[]);
    }

    getRootSite(): Observable<SharePointSite> {
        let url = graphEndPoints.spRootSite;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).map(response => response.json() as SharePointSite);
    }

    private getHeaders(resource: string): Headers {
        //let resourceToken = this.adalService.accessToken;
        let resourceToken: string;
        if(resource){
            resource = "https://graph.microsoft.com";
            resourceToken = this.getToken(resource);
        }
        
        return new Headers({'Content-Type': 'application/json', 
        'authorization': "Bearer " + resourceToken});
    }

    private getToken(resource: string): string {
        return this.authService.accessToken
    }
}