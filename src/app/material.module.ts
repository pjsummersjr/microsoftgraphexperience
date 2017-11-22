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
            MatNativeDateModule,
            MatIconModule
        } from '@angular/material';

@NgModule({
    imports: [MatTabsModule,
                MatToolbarModule,
                MatButtonModule,
                MatInputModule,
                MatCardModule,
                MatExpansionModule,
                MatProgressBarModule,
            MatGridListModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatIconModule
        ],
    exports: [MatTabsModule,
                MatToolbarModule,
                MatButtonModule,
                MatInputModule,
                MatCardModule,
                MatExpansionModule,
                MatProgressBarModule,
            MatGridListModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatIconModule
        ]
})
export class MaterialModule {}
