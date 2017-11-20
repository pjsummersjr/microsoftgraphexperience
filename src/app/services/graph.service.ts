import { Injectable, Pipe } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Document} from '../doclist/document';
import { SharePointSite, CalendarItem, Person, Attendee } from '../entities/graph';

import { AuthService } from '../auth/auth.service';
import { AppService } from './app.service';

let graphEndPoints = {
    baseEndPoint: "https://graph.microsoft.com/",
    beta: this.baseEndPoint + "/beta",
    myTrending: "https://graph.microsoft.com/beta/me/insights/trending?$select=",
    sites: "https://graph.microsoft.com/v1.0/sites/root/sites?search=*&$select=description,id,lastModifiedDateTime,name,webUrl,displayName",
    spRootSite: "https://graph.microsoft.com/v1.0/sites/root?$select=description,id,lastModifiedDateTime,name,webUrl,displayName",
    calView: "https://graph.microsoft.com/v1.0/me/calendar/calendarView?"
}

@Injectable()
export class GraphService extends AppService {
    constructor(private authService: AuthService, private http: Http){
        super();
    }

   
    getMyTrending(): Observable<Document[]>{
        let url = graphEndPoints.myTrending;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).map(response => response.json().value as Document[]);
    }

    getSites(): Observable<SharePointSite[]> {
        let url = graphEndPoints.sites;
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).
            map(response => response.json().value as SharePointSite[]).
            catch(this.handleError);
    }
    getRootSite(): Observable<SharePointSite> {
        let url = graphEndPoints.spRootSite;
        let headers: Headers = this.getHeaders(url);

        return this.http.get(url, {headers: headers}).
                map(response => response.json() as SharePointSite).
                catch(this.handleError);
    }

    getCalendarItems(startDate:Date = new Date(), endDate?:Date): Observable<CalendarItem[]>{
        //If end date is null, set it to the end of the day specified by start date
        if(endDate == null){
            endDate = startDate;
            endDate.setHours(11,59,59);
        }
        let url = graphEndPoints.calView + "startdatetime=2017-01-01T01:00:00Z&enddatetime=2017-12-31T23:00:00Z&$select=subject,importance,organizer,attendees,start,end"
                                           
        let headers: Headers = this.getHeaders(url);
        return this.http.get(url, {headers: headers}).
            map((response) => {      
                    return response.json().value.map(event =>
                        {
                            var item:CalendarItem = new CalendarItem();
                            item.importance = event.importance;
                            item.subject = event.subject;
                            item.start = new Date(event.start.dateTime);
                            item.end = new Date(event.end.dateTime);
                            if(item.start.getDate() != item.end.getDate() || 
                                item.start.getMonth() != item.end.getMonth() ||
                                item.start.getFullYear() != item.end.getFullYear())
                            {
                                item.isMultiDay = true;
                            }
                            item.organizer = new Person();
                            item.organizer.emailAddress.name = event.organizer.emailAddress.name;

                            item.attendees = event.attendees.map((attendee) => attendee as Attendee);

                            return item; 
                        }
                    )                                             
            }).
            catch(this.handleError);
    }

    private getHeaders(resource: string): Headers {
        
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