import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

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
  //terbitanTempatan: any;
  terbitanTempatan : {permohonan_status: string}
  constructor(public api: ApiProvider, public navCtrl: NavController, 
    public navParams: NavParams,public alertCtrl: AlertController) {
      this.terbitanTempatan = {permohonan_status: null}
  }

  ionViewDidLoad() {
    let user = JSON.parse(localStorage.getItem('userData'));
    this.userData = user["syarikat_profile"];
    console.log('ionViewDidLoad TerbitanTempatanPage');
    this.api.terbitanTempatan().then( result => {
      // console.log("Home.ts Result :" + result);
      let list : any = result;
      let data = list.terbitan_tempatan;
      //this.terbitanTempatan = JSON.stringify( data[0] );
      this.terbitanTempatan = {
        permohonan_status: data[0].permohonan_status
      }
      console.log('terbitan tempatan: ' + JSON.stringify( data[0].permohonan_status ) );
    }).catch(err => {
       console.log("Failed to get terbitan tempatan !: " + err);
    });
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
