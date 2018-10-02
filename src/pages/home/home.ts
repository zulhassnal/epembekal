import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = [];
  //utamaTempatan: any;
  utamaTempatan : {total: number, baru: number, semula: number, semak: number, sah: number, sijil: number}

  //user = [];
  constructor(public navCtrl: NavController,public api: ApiProvider) {
    this.utamaTempatan = {total: null, baru: null, semula: null, semak: null, sah: null, sijil: null}
  }

  ionViewDidLoad(){
    let user = JSON.parse(localStorage.getItem('userData'));
    this.userData = user["syarikat_profile"];

  
    //this.userData = user;
    console.log('localstorage :' + user["syarikat_profile"]);

    //this.api.utamaTempatan();
    //let data : any = JSON.stringify(this.api.utamaTempatan());
    this.api.utamaTempatan().then( result => {
      let list : any = result;
      //this.utamaTempatan = list;
      //this.utamaTempatan = list.statistik;
      let data = list.statistik;
      let datasijil = list.sijil;
      this.utamaTempatan = {
        total: data[0].total, 
        baru: data[0].baru, 
        semula: data[0].semula, 
        semak: data[0].semak, 
        sah: data[0].sah, 
        sijil: datasijil[0].total
      }
      //console.log('utamaTempatan' + JSON.stringify(data[0].total));
      console.log(list);
    }).catch(err => {
       console.log("Failed to get Pengumuman !: " + err);
    });
    
    //console.log('utamaTempatan :' );
  }



}
