import { NgModule } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@NgModule({

})
/**
 * Base (abstract) service for the app
 */
export class AppService {

    /**
     * https://angular.io/tutorial/toh-pt6
     * https://www.youtube.com/watch?v=gJKuil24Jag
     */
    protected handleError(error: Response){
        console.error(error);
        return Observable.throw(error);
    }
}