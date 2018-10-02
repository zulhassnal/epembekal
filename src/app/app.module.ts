import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { TerbitanTempatanPage } from '../pages/terbitan-tempatan/terbitan-tempatan';
import { TerbitanLuarnegaraPage } from '../pages/terbitan-luarnegara/terbitan-luarnegara';
import { PengumumanPage } from '../pages/pengumuman/pengumuman';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TerbitanTempatanPage,
    TerbitanLuarnegaraPage,
    PengumumanPage
  ],
  imports: [
    BrowserModule, HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TerbitanTempatanPage,
    TerbitanLuarnegaraPage,
    PengumumanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiProvider
  ]
})
export class AppModule {}
