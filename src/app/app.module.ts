import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusComponent } from './status.component';
import { TokenInterceptorService } from './service/interceptor/token-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ErrorIntercept } from './service/interceptor/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercept,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
