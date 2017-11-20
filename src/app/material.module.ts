import { NgModule } from '@angular/core';
import { MatTabsModule, 
            MatToolbarModule,
            MatButtonModule,
            MatInputModule,
            MatCardModule,
            MatGridListModule,
            MatExpansionModule,
            MatProgressBarModule, 
            MatDatepickerModule,
            MatNativeDateModule
        } from '@angular/material';

@NgModule({
    imports:[MatTabsModule, 
                MatToolbarModule, 
                MatButtonModule, 
                MatInputModule,
                MatCardModule,
                MatExpansionModule,
                MatProgressBarModule,
            MatGridListModule,
            MatDatepickerModule,
            MatNativeDateModule
        ],
    exports:[MatTabsModule, 
                MatToolbarModule, 
                MatButtonModule, 
                MatInputModule,
                MatCardModule,
                MatExpansionModule,
                MatProgressBarModule,
            MatGridListModule,
            MatDatepickerModule,
            MatNativeDateModule
        ]
})
export class MaterialModule {} 