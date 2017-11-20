

export class SharePointSite {
    description:string;
    id:string;
    lastModifiedDateTime:string;
    name:string;
    webUrl:string;
    displayName:string;
}

export class Calendar {

}

export class Person {
    emailAddress: {
        name:string;
        address: string;
    }

    constructor(){
        this.emailAddress = {
            name: "",
            address: ""
        };
    }
}

export class Attendee extends Person {
    type:string;
    status: {
        response:string;
        time: string;
    }

    constructor(){
        super();
        this.type = "";
        this.status = {
            response: "",
            time: ""
        };
    }
}

export class CalendarItem {
    subject: string;
    importance: string;
    start:Date;
    end:Date;
    isMultiDay:boolean = false;
    organizer: Person;
    attendees: Attendee[];
}