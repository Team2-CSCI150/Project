import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogInPage } from './log-in/log-in.page';
import { RegisterPage } from './register/register.page';
import { HomePage } from './home/home.page';

import { Geolocation } from "@ionic-native/geolocation/ngx";

@NgModule({
  declarations: [
	AppComponent,
	/*LogInPage,
	RegisterPage,
	HomePage*/
	],
  entryComponents: [
	AppComponent,
	/*LogInPage,
	RegisterPage,
	HomePage*/
  ],
  imports: [
	BrowserModule, 
	HttpClientModule,
	IonicModule.forRoot(), 
	AppRoutingModule
	],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
