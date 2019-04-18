import {Component} from '@angular/core';
import {App,IonicPage, NavController, ToastController, LoadingController, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../providers";
import {UsersPage} from "../users_lists/users_lists";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'

})
export class WelcomePage {
  form: FormGroup;
  isReadyToSave: boolean;
  falsemsg:string;
  responseData : any;
  userData = {"pengguna_idpengguna": "", "pengguna_katalaluan": ""};
  pengumuman : any;
  // @ViewChild(Nav) nav: Nav;
  pages: any[] = [
    {title: 'Users Lists', component: 'UsersPage'}
  ];
  account: { pengguna_idpengguna: string , pengguna_katalaluan:string} = {
    pengguna_idpengguna: '',
    pengguna_katalaluan: ''
  };
  private signinErrorString: string;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public translateService: TranslateService,
              public loadingCtrl: LoadingController,public formBuilder: FormBuilder,
              public viewCtrl: ViewController,public app: App,public user: User,
              public authService:AuthServiceProvider,public events: Events) {

    this.form = formBuilder.group({
      user_name: ['',Validators.required],
      user_pass: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signinErrorString = value;
    })

    this.falsemsg = "Welcome !";
  }

  signIn(){
    if (!this.form.valid) {
      let toast = this.toastCtrl.create({
        message: "ID Pengguna dan katalaluan diperlukan untuk daftar masuk.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    else  {
      let loading = this.loadingCtrl.create({
        content: 'Sila tunggu...'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.user.login(this.account).subscribe((resp) => {
          // this.navCtrl.push(this.pages[0].component);
        }, (err) => {
          this.navCtrl.setRoot(UsersPage);
          let toast = this.toastCtrl.create({
            message: this.falsemsg,//"opps ! some issues had occured please try again later !", //this.signinErrorString
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }, 2000);
    }
  }

  LoginViaAPI(){
    if (!this.form.valid) {
      let toast = this.toastCtrl.create({
        message: "ID Pengguna dan katalaluan diperlukan untuk daftar masuk.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }else {
      let loading = this.loadingCtrl.create({
        content: 'Sila tunggu...'
      });
      loading.present();
    // Login via API
    setTimeout(() => {  
      loading.dismiss();
    this.authService.postData(this.userData).then((result) => {
      this.responseData = result;
      console.log(result);

      if(this.responseData.message == 'success'){
          console.log(this.responseData);
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          //this.navCtrl.push(TabsPage);
          this.events.publish('user:login', JSON.parse(localStorage.getItem('userData')));
          this.navCtrl.setRoot(HomePage);
          console.log('set root HomePage');
      }
      else{
        /*
        let alert = this.alertCtrl.create({
          title: 'Ralat',
          subTitle: this.responseData.message,
          buttons: ['Tutup']
        });
        alert.present();
        */
       //loading.dismiss();
        let toast = this.toastCtrl.create({
          message: this.responseData.message,//"opps ! some issues had occured please try again later !", //this.signinErrorString
          duration: 3000,
          position: 'top'
        });
        toast.present();
        
        console.log("Invalid user..."); 
      }
    }, (err) => {
      // Error log
      console.log('LoginViaAPI Failed: ' + err);
    });
    }, 2000);
  }

}
  signup() {
    this.navCtrl.push('UsersPage');
  }
}
