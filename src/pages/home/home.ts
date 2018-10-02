import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = [];
  //utamaTempatan: any;
  utamaTempatan : {total: number, baru: number, semula: number, semak: number, sah: number, sijil: number}
  utamaLuarNegara : {total: number, baru: number, semula: number, semak: number, sah: number, sijil: number}

  //user = [];
  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public authService:AuthServiceProvider
  ) {
    this.utamaTempatan = {total: null, baru: null, semula: null, semak: null, sah: null, sijil: null}
    this.utamaLuarNegara = {total: null, baru: null, semula: null, semak: null, sah: null, sijil: null}
  }

  ionViewDidLoad(){
    let user = JSON.parse(localStorage.getItem('userData'));
    this.userData = user["syarikat_profile"];

  
    //this.userData = user;
    console.log('localstorage :' + user["pengguna_id"]);
    let pengguna_id = user["pengguna_id"];
    //this.api.utamaTempatan();
    //let data : any = JSON.stringify(this.api.utamaTempatan());
    this.api.utamaTempatan(pengguna_id).then( result => {
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

    this.api.utamaLuarNegara(pengguna_id).then( result => {
      let list : any = result;
      let data = list.statistik;
      let datasijil = list.sijil;
      this.utamaLuarNegara = {
        total: data[0].total, 
        baru: data[0].baru, 
        semula: data[0].semula, 
        semak: data[0].semak, 
        sah: data[0].sah, 
        sijil: datasijil[0].total
      }
      console.log('utamaLuarNegara' + JSON.stringify(data[0].total));
      console.log(list);
    }).catch(err => {
       console.log("Failed to get Luar negara !: " + err);
    });
    //console.log('utamaTempatan :' );
  }



}
