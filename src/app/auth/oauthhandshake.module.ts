import { NgModule } from '@angular/core'; 
import { OAuthCallbackComponent } from './oauthcallback.component'; 
import { OAuthCallbackHandler } from './oauthguard.handler'; 
@NgModule({ 
    imports: [], 
    declarations: [ OAuthCallbackComponent], 
    providers: [OAuthCallbackHandler] 
}) 
export class OAuthHandshakeModule { } 