import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = [];
  //user = [];
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    let user = JSON.parse(localStorage.getItem('userData'));
    this.userData = user["syarikat_profile"];
    //this.userData = user;
    console.log('localstorage :' + user["syarikat_profile"]);
  }

}
