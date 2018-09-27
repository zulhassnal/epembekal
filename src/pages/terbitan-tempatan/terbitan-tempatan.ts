import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the TerbitanTempatanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terbitan-tempatan',
  templateUrl: 'terbitan-tempatan.html',
})
export class TerbitanTempatanPage {
  userData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let user = JSON.parse(localStorage.getItem('userData'));
    this.userData = user["syarikat_profile"];
    console.log('ionViewDidLoad TerbitanTempatanPage');
  }

  showDetail() {
    const confirm = this.alertCtrl.create({
      title: 'Dokumen Tidak Lengkap',
      message: 'Dokumen audit tidak lengkap. Tidak lengkap. Sila Hantar dengan kadar segera.',
      buttons: [
        {
          text: 'Tutup',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Chit Chat',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }



}
