import { Component, Input, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Calendar, CalendarItem } from '../entities/graph';
import { GraphService } from '../services/graph.service';

@Component({
    selector: 'calendar-detail',
    templateUrl: 'calendar-detail.component.html',
    styleUrls: ['graph.component.css']
})
export class CalendarDetailComponent implements OnInit {

    private detailItem: CalendarItem;
    private people: string[];
    private documents: string[];

    constructor(private graphService: GraphService, private router: ActivatedRoute) {}

    loadItemDetail(): void {
        const id: string = this.router.snapshot.paramMap.get('id');
    }

    loadPeople(): void {
        console.log('Loading people information for event');
    }

    loadDocuments(): void {
        console.log('Loading trending documents for people associated with this event');
    }

    ngOnInit(): void {
        console.log('Initialized the Calendar Detail View');
    }
}
