import { Component, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { GraphService } from '../services/graph.service';
import { SharePointSite } from '../entities/site';

@Component({
    templateUrl:'./sharepoint.component.html'
})
export class SharePointComponent implements OnInit {

    private sites: Observable<SharePointSite[]>;
    private rootSite: Observable<SharePointSite>;

    constructor(private graphService: GraphService){
    }

    getSites(): void {
        this.sites = this.graphService.getSites();
    }

    getRootSite(): void {
        this.rootSite = this.graphService.getRootSite();
        this.rootSite.subscribe((site) => {console.log(site)});
    }

    ngOnInit(): void {
        this.getSites();
        this.getRootSite();
    }
    
}
@Component({
    selector:'site-list',
    template:`
        <div>{{rootSite.displayName}}</div>
    `
})
export class SiteListComponent {
    @Input()sites: SharePointSite[];
    @Input()rootSite: SharePointSite;
}