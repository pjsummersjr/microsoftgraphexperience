import {Component, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MatButtonModule,MatInputModule} from '@angular/material';

import { GraphService } from '../services/graph.service';
import { Document } from '../doclist/document';

@Component({
    selector: 'graph',
    templateUrl: './graph.component.html'
})
export class GraphComponent {
    documents: Observable<Document[]>;

    constructor(private graphService: GraphService){} 

    search(): void {
        this.documents = this.graphService.getMyTrending();
    }
}