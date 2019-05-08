import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MyApp } from './app.component';

import { Vibration } from '@ionic-native/vibration';
import { CallNumber } from '@ionic-native/call-number';

import {UsersPageModule} from "../pages/users_lists/users_lists.module";
import { HomePage } from '../pages/home/home';
import { TerbitanTempatanPage } from '../pages/terbitan-tempatan/terbitan-tempatan';
import { TerbitanLuarnegaraPage } from '../pages/terbitan-luarnegara/terbitan-luarnegara';
import { PengumumanPage } from '../pages/pengumuman/pengumuman';
import { ProfailPage} from '../pages/profail/profail';
import { AboutPage } from '../pages/about/about';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TerbitanTempatanPage,
    TerbitanLuarnegaraPage,
    PengumumanPage,
    ProfailPage,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    UsersPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TerbitanTempatanPage,
    TerbitanLuarnegaraPage,
    PengumumanPage,
    ProfailPage,
    AboutPage,
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    Vibration,
    AuthServiceProvider,
    CallNumber,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
