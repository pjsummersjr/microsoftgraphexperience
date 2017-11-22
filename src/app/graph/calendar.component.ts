import { Component, Input, OnInit, NgModule } from '@angular/core';

import { Calendar, CalendarItem } from '../entities/graph';
import { GraphService } from '../services/graph.service';

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['graph.component.css']
})
export class CalendarComponent implements OnInit {

    @Input()startDate: Date;
    @Input()endDate: Date;

    private calItems: CalendarItem[];
    private statusMessage: string;

    constructor(private graphService: GraphService) {}

    getCalendarItems(): void {
        this.graphService.getCalendarItems(this.startDate, this.endDate).
            subscribe((events) => this.calItems = events,
            (error) => {
                this.statusMessage = 'Error retrieving calendar items';
            }
        );
        console.log(this.calItems);
    }

    updateCalendarItems(): void {
        console.log(this.startDate);
        console.log(this.endDate);
        this.getCalendarItems();
    }

    newRow(index: number): boolean {
        console.log('newRow');
        return ((index % 3) === 0);
    }

    ngOnInit(): void {
        this.getCalendarItems();
    }
}
@Component({
    selector:'calendar-item',
    templateUrl: 'calendar-item.component.html',
    styleUrls: ['graph.component.css']
})
export class CalendarItemComponent {
    @Input()event: CalendarItem;

    loadCalendarItemDetail(): void {
        console.log("Something");
    }
}
