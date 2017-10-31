import { NgModule } from '@angular/core';
import { MatTabsModule, 
            MatToolbarModule,
            MatButtonModule,
            MatInputModule,
            MatCardModule } from '@angular/material';

@NgModule({
    imports:[MatTabsModule, 
                MatToolbarModule, 
                MatButtonModule, 
                MatInputModule,
                MatCardModule],
    exports:[MatTabsModule, 
                MatToolbarModule, 
                MatButtonModule, 
                MatInputModule,
                MatCardModule]
})
export class MaterialModule {} 