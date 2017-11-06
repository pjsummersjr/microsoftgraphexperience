import { NgModule } from '@angular/core';
import { MatTabsModule, 
            MatToolbarModule,
            MatButtonModule,
            MatInputModule,
            MatCardModule,
            MatGridListModule,
        MatProgressBarModule } from '@angular/material';

@NgModule({
    imports:[MatTabsModule, 
                MatToolbarModule, 
                MatButtonModule, 
                MatInputModule,
                MatCardModule,
                MatProgressBarModule,
            MatGridListModule],
    exports:[MatTabsModule, 
                MatToolbarModule, 
                MatButtonModule, 
                MatInputModule,
                MatCardModule,
                MatProgressBarModule,
            MatGridListModule]
})
export class MaterialModule {} 