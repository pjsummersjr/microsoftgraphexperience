import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
import { SharePointComponent, SiteListComponent, SPSiteComponent } from './graph/sharepoint.component';
import { CalendarComponent, CalendarItemComponent } from './graph/calendar.component';

import { OAuthCallbackComponent } from './auth/oauthcallback.component';
import { OAuthCallbackHandler } from './auth/oauthguard.handler';
import { AuthenticationGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthConfigService } from './auth/auth.config.service'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DocListComponent,
    AzureSearchComponent,
    GraphComponent,
    SharePointComponent,
    CalendarComponent,
    CalendarItemComponent,
    SiteListComponent,
    SPSiteComponent,
    OAuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      //{ path: 'id_token', component: OAuthCallbackComponent, canActivate: [OAuthCallbackHandler] },
      //{ path: 'access_token', component: OAuthCallbackComponent, canActivate: [OAuthCallbackHandler] },
      {
        path: 'azure-search', component: AzureSearchComponent, canActivate: [AuthenticationGuard]
      },
      {
        path: 'sites', component: SharePointComponent, canActivate: [AuthenticationGuard]
      },
      {
        path: 'calendar', component: CalendarComponent, canActivate: [AuthenticationGuard]
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
              AuthService,
            AuthenticationGuard,
          AuthConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
