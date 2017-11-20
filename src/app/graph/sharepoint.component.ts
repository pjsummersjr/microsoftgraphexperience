import { Component, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { GraphService } from '../services/graph.service';
import { SharePointSite } from '../entities/graph';

import {MatGridListModule,MatCardModule,MatProgressBarModule} from '@angular/material';

@Component({
    templateUrl:'./sharepoint.component.html',
    styleUrls:['graph.component.css']
})
export class SharePointComponent implements OnInit {

    private sites: SharePointSite[];
    private rootSite: SharePointSite;
    private statusMesage: string;

    constructor(private graphService: GraphService){
    }

    getSites(): void {
        this.graphService.getSites().
        subscribe((sitedata) => this.sites = sitedata,
            (error) => { this.statusMesage = 'An error has occurred retrieving the site data';}
        );
    }

    getRootSite(): void {
        
        this.graphService.getRootSite().
            subscribe((site) => {
                console.log(site);
                this.rootSite = site;
            });
    }

    ngOnInit(): void {
        this.getSites();
        this.getRootSite();
    }
    
}
@Component({
    selector:'site-list',
    templateUrl:'./sitelist.component.html',
    styleUrls:['graph.component.css']
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
    styleUrls:['graph.component.css']
})
export class SPSiteComponent {
    @Input()site: SharePointSite;
}