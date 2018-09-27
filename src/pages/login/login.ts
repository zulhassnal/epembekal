import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"pengguna_idpengguna": "", "pengguna_katalaluan": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
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


}
