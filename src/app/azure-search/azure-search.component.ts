import {Component, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MatButtonModule,MatInputModule} from '@angular/material';

import { SearchService } from '../services/search.service';
import { Document } from '../doclist/document';

@Component({
    selector: 'azure-search',
    templateUrl: './azure-search.component.html'
})
export class AzureSearchComponent {
    documents: Observable<Document[]>;

    constructor(private searchService: SearchService){} 

    search(): void {
        this.documents = this.searchService.search('*');
      }
}