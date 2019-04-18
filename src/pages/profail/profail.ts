import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profail',
  templateUrl: 'profail.html',
})
export class ProfailPage {
  userData:{
    syarikat_nama:string,
    syarikat_alamat:string,
    syarikat_notelpejabat:string,
    syarikat_emel:string,
    syarikat_poskod:string, 
    syarikat_bandar:string


  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userData={
      syarikat_nama:null,
      syarikat_alamat:null,
      syarikat_notelpejabat:null,
      syarikat_emel:null,
      syarikat_poskod:null, 
      syarikat_bandar:null
    }
  }

  ionViewDidLoad() {
    let user = JSON.parse(localStorage.getItem('userData'));
    //this.userData=user["syarikat_profile"]; 
    this.userData={
      syarikat_nama:user["syarikat_profile"].syarikat_nama,
      syarikat_alamat:user["syarikat_profile"].syarikat_alamat,
      syarikat_notelpejabat:user["syarikat_profile"].syarikat_notelpejabat,
      syarikat_emel:user["syarikat_profile"].syarikat_emel,
      syarikat_poskod:user["syarikat_profile"].syarikat_poskod,
      syarikat_bandar:user["syarikat_profile"].syarikat_bandar

    }
    console.log(this.userData);
    console.log('ionViewDidLoad ProfailPage');
  }

}
