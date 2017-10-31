import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { DocListComponent } from './doclist/doclist.component';

import { SearchService} from './services/search.service';
import { AzureSearchComponent } from './azure-search/azure-search.component';
import { HomeComponent} from './home/home.component';
import { LoginComponent } from './home/login.component';
import { GraphService } from './services/graph.service';
import { GraphComponent } from './graph/graph.component';
import { SharePointComponent, SiteListComponent } from './graph/sharepoint.component';

import { OAuthCallbackComponent } from './adal/oauthcallback.component';
import { OAuthCallbackHandler } from './adal/oauthguard.handler';
import { AuthenticationGuard } from './adal/auth.guard';
import { AdalService } from './adal/adal.service';
import { AdalConfigService } from './adal/adal.config.service'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DocListComponent,
    AzureSearchComponent,
    GraphComponent,
    SharePointComponent,
    SiteListComponent,
    OAuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      { path: 'id_token', component: OAuthCallbackComponent, canActivate: [OAuthCallbackHandler] },
      { path: 'access_token', component: OAuthCallbackComponent, canActivate: [OAuthCallbackHandler] },
      {
        path: 'azure-search', component: AzureSearchComponent, canActivate: [AuthenticationGuard]
      },
      {
        path:'sites', component: SharePointComponent, canActivate: [AuthenticationGuard]
      },
      {
        path: 'graph', component: GraphComponent, canActivate: [AuthenticationGuard]
      },
      { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] }
    ])
  ],
  providers: [SearchService, 
              GraphService,
              OAuthCallbackHandler,
              AdalService,
            AuthenticationGuard,
          AdalConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
