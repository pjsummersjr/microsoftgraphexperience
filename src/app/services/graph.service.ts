import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Document} from '../doclist/document';
import { SharePointSite } from '../entities/site';

import {AdalService} from '../adal/adal.service';

let graphEndPoints = {
    baseEndPoint: "https://graph.microsoft.com/",
    beta: this.baseEndPoint + "/beta",
    myTrending: "https://graph.microsoft.com/beta/me/insights/trending",
    sites: "https://graph.microsoft.com/v1.0/sites/root"
}

@Injectable()
export class GraphService {
    constructor(private adalService: AdalService, private http: Http){}

   
    getMyTrending(): Observable<Document[]>{
        let url = graphEndPoints.myTrending;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).map(response => response.json().value as Document[]);
    }

    getSites(): Observable<SharePointSite[]> {
        let url = graphEndPoints.sites;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).map(response => response.json().value as SharePointSite[]);
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
        let _this = this;
        let token: string;
        this.adalService.getResourceToken(resource).subscribe({ 
            next: (value) => token = value 
        });
        return token;
    }
}