import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { SharedModule } from '@edocsforms/shared';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ConfirmationService, DialogService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './in-memory-data.service';

// Imports for loading & configuring the in-memory web api
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 0 }),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  declarations: [AppComponent],
  providers: [DialogService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
