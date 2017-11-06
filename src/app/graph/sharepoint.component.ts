import { Component, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { GraphService } from '../services/graph.service';
import { SharePointSite } from '../entities/site';

import {MatGridListModule,MatCardModule,MatProgressBarModule} from '@angular/material';

@Component({
    templateUrl:'./sharepoint.component.html',
    styleUrls:['sp.component.css']
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
    templateUrl:'./sitelist.component.html',
    styleUrls:['sp.component.css']
})
export class SiteListComponent {
    @Input()rootSite: SharePointSite;
    @Input()sites:SharePointSite[];
    constructor() {

    }
}

@Component({
    selector:'sp-site',
    templateUrl:'./spsite.component.html',
    styleUrls:['sp.component.css']
})
export class SPSiteComponent {
    @Input()site: SharePointSite;
}