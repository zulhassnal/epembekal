import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { PengumumanPage } from '../pengumuman/pengumuman';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"pengguna_idpengguna": "", "pengguna_katalaluan": ""};
  pengumuman : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public authService:AuthServiceProvider,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    this.authService.pengumuman().then( result => {
      // console.log("Home.ts Result :" + result);
      let list : any = result;
      this.pengumuman = list;
      console.log('Pengumuman' + list);
    }).catch(err => {
       console.log("Failed to get Pengumuman !: " + err);
    });
    console.log('ionViewDidLoad LoginPage');
  }

  LoginViaAPI(){

    // Login via API
    this.authService.postData(this.userData).then((result) => {
      this.responseData = result;
      console.log(result);

      if(this.responseData.message == 'success'){
          console.log(this.responseData);
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          //this.navCtrl.push(TabsPage);
          this.navCtrl.setRoot(HomePage);
          console.log('set root HomePage');
      }
      else{ 
        alert(this.responseData.message);
        console.log("Invalid user..."); }
    }, (err) => {
      // Error log
      console.log('LoginViaAPI Failed: ' + err);
    });

}

  detailPengumuman(params){
    if (!params) params = {};
    this.navCtrl.push(PengumumanPage, {item : params});
    console.log('detail pengumuman : ' +  params);
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Reset Katalaluan',
      inputs: [
        {
          name: 'Email',
          placeholder: 'email'
        }

      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset Katalaluan',
          handler: data => {
            //if (User.isValid(data.username, data.password)) {
              // logged in!
            //} else {
              // invalid login
            //  return false;
           // }
          }
        }
      ]
    });
    alert.present();
  }


}
