import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PengumumanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pengumuman',
  templateUrl: 'pengumuman.html',
})
export class PengumumanPage {

  details=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.details = this.navParams.get('item');
    console.log(this.details );
    //console.log('ionViewDidLoad PengumumanPage');
  }

}
