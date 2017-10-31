import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Document } from '../doclist/document';


//https://docs.microsoft.com/en-us/azure/search/search-query-rest-api
let azureSearchConfig = {
    uriEndpoint: "https://pjs.search.windows.net/indexes/retaildemo/docs?api-version=2016-09-01",
    queryKey: "492C826C034276E6B0273CF734F68260"
}

@Injectable()
export class SearchService {

    constructor(private http: Http) {}

    private headers: Headers = new Headers({'Content-Type': 'application/json', 'api-key': azureSearchConfig.queryKey});

    search(term: string): Observable<Document[]>{
        let url = azureSearchConfig.uriEndpoint + '&search=' + term + '&$select=productname,productid,productdescription,primaryimage';
        return this.http.get(url, {headers: this.headers}).map(response => response.json() as Document[]);
    }

}