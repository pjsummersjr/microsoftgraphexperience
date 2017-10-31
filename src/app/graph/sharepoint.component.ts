import { Component, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { GraphService } from '../services/graph.service';
import { SharePointSite } from '../entities/site';

@Component({
    templateUrl:'./sharepoint.component.html'
})
export class SharePointComponent implements OnInit {

    private sites: Observable<SharePointSite[]>;

    constructor(private graphService: GraphService){
    }

    getSites(): void {
        this.sites = this.graphService.getSites();
    }

    ngOnInit(): void {
        this.getSites();
    }
    
}
@Component({
    selector:'site-list',
    template:`
        <div *ngFor="let site of sites | async">{{site.displayName}}</div>
    `
})
export class SiteListComponent {
    @Input()sites: SharePointSite[];
}