import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material';
import { Document } from './document';

import { SearchService } from '../services/search.service';

@Component({
    selector: 'document-list',
    templateUrl: './doclist.component.html'
})
export class DocListComponent {
    @Input() documents: Document[];
}