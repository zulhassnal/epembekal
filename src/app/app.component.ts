import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {TranslateService} from '@ngx-translate/core';
import {Config, Nav, Platform, ToastController, LoadingController} from 'ionic-angular';
import {FirstRunPage} from '../pages';
import {Settings} from '../providers';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { TerbitanTempatanPage } from  '../pages/terbitan-tempatan/terbitan-tempatan';
import { TerbitanLuarnegaraPage } from  '../pages/terbitan-luarnegara/terbitan-luarnegara';
import { ProfailPage} from '../pages/profail/profail';
import { AboutPage } from '../pages/about/about';

@Component({
  //user_ : this.userData,
  selector: 'side-main-menu',
  templateUrl: 'app.html'
  /*
  template: `<ion-menu [content]="content">
      <ion-header class="headerMAin">
        <ion-toolbar color="primary">
          <ion-buttons left>
            <button class="createUser" ion-button icon-only menuClose (click)="openPage(pages[4])">
              <ion-icon name="ios-create-outline" md="ios-create-outline" style="color:  #1ABC9C !important;"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="sideMenuIoncContent">
        
        <ion-list class="headerMAin" style="display: ">
          <ion-item style="background: black !important;border-bottom: 0.55px solid #000000!important;">
            <ion-list class="logoImage" menuClose (click)="openPage(pages[4])">
              <div class="circle-pic" text-center #profilePic [style.background-image]="'url(../../assets/img/advance-card-tmntr.jpg)'"></div>
              <!--<img class="circle-pic" src="../../assets/img/advance-card-tmntr.jpg"/>-->
            </ion-list>
            <h3 class="userName">Arnold Schwarzenegger</h3>
            <h3 class="userDetails">Former Governor of California</h3>
            <h3 class="userDetails">`+ this.user +` </h3>
          </ion-item>
        </ion-list>
        
        <ion-list>
          
          
          <button menuClose ion-item no-lines style="border-top: 0.55px solid #383838; !important;"
                  [class.activeHIghlight]="checkActive(pages[1])" (click)="openPage(pages[1])" class="buttonSIdeBAr">
            <ion-icon ios="ios-list-box-outline" class="sidebarCss" md="ios-list-box-outline"></ion-icon>
            Utama
          </button>

          <button menuClose ion-item no-lines [class.activeHIghlight]="checkActive(pages[2])"
                  (click)="openPage(pages[2])" class="buttonSIdeBAr">
            <ion-icon ios="ios-notifications-outline" class="sidebarCss" md="ios-notifications-outline"></ion-icon>
            Terbitan Tempatan
          </button>

          <button menuClose ion-item no-lines [class.activeHIghlight]="checkActive(pages[3])"
                  (click)="openPage(pages[3])" class="buttonSIdeBAr">
            <ion-icon ios="ios-notifications-outline" class="sidebarCss" md="ios-notifications-outline"></ion-icon>
            Terbitan Luar Negara
          </button>
          
          <button menuClose ion-item no-lines [class.activeHIghlight]="checkActive(pages[4])"
                  (click)="openPage(pages[4])" class="buttonSIdeBAr">
            <ion-icon ios="ios-person-outline" class="sidebarCss" md="ios-person-outline"></ion-icon>
            Profail
          </button>
          
          <button menuClose no-lines style="border-bottom: 0.55px solid #383838; !important;" ion-item
                  [class.activeHIghlight]="checkActive(pages[0])" (click)="openPage(pages[0])" class="buttonSIdeBAr">
            <ion-icon class="sidebarCss" ios="ios-log-out-outline" md="ios-log-out-outline"></ion-icon>
            Keluar
          </button>
         
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-nav #content [root]="rootPage"></ion-nav>`
    */
})


export class MyApp {

  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;
  activePage: any;
  pages: any[] = [
    /*
    {title: 'Welcome', component: 'WelcomePage'},
    {title: 'Signup', component: 'LoginPage'},
    {title: 'Master Detail', component: 'ListMasterPage'},
    {title: 'News Feed', component: 'NewsFeed'},
    {title: 'Profile', component: 'ProfilePage'},
    {title: 'Users Lists', component: 'UsersPage'},
    {title: 'Followers', component: 'Followers'},
    {title: 'Following', component: 'Following'},
    */
    {title: 'Welcome', component: 'WelcomePage'},
    {title: 'Utama', component: HomePage},
    {title: 'Terbitan Tempatan', component: TerbitanTempatanPage},
    {title: 'Terbitan Luar Negara', component: TerbitanLuarnegaraPage},
    //{title: 'Profail', component: 'ProfilePage'},
    {title: 'Profail', component: ProfailPage},
    {title: 'About', component: AboutPage},
  ]

  user: any;
  syarikat_nama: any;
  constructor(private translate: TranslateService, platform: Platform, settings: Settings,
              private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,public events: Events) {
      events.subscribe('user:login', (user) => {
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.syarikat_nama = user["syarikat_profile"].syarikat_nama;
        console.log('Welcome', user["syarikat_profile"].syarikat_nama);
      });
                
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#1ABC9C');

    });
    this.initTranslate();
    //this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("pengguna : " + this.user);
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    if (page.component == "WelcomePage") {
      let loading = this.loadingCtrl.create({
        content: 'Sila tunggu...'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.nav.setRoot(page.component);
        this.activePage = "random";
        let toast = this.toastCtrl.create({
          message: "Anda telah berjaya daftar keluar.",
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }, 2000);
    } else {
      this.nav.setRoot(page.component);
      //this.nav.setRoot(HomePage);
      this.activePage = page;
      console.log(page.component);
    }
  }
  checkActive(page) {
    return page == this.activePage;
  }
  
  userData(userInfo){
    console.log(userInfo);
    JSON.parse(localStorage.getItem('userData'))["syarikat_profile"].syarikat_nama;
  }
}
