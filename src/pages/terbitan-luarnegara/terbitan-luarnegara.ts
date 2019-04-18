import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { HomePage } from '../home/home';

/**
 * Generated class for the TerbitanLuarnegaraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-terbitan-luarnegara',
  templateUrl: 'terbitan-luarnegara.html',
})
export class TerbitanLuarnegaraPage {
  showHidePerincian:boolean;
  userData = [];
  mainSystemUrl: any;
  //terbitanTempatan: any;
  cetakPdf: {
    ids: string,
    idp: string,
    sid: number,
    _token: string
  }
  terbitanLuarNegara : {permohonan_status: string,
    permohonan_tarikhdaftar:Date,
    jenis_permohonan:string,
    no_sijil:string, 
    status_sijil:string, 
    sijil_tarikhmula:Date, 
    sijil_tarikhmula_display:string, 
    sijil_tarikhtamat:Date,
    sijil_tarikhtamat_display:string,  
    semakan_status:string, 
    semakan_catatantidaklengkap:string}
  constructor(public api: Api, public navCtrl: NavController, 
    public navParams: NavParams,public alertCtrl: AlertController) {
      this.terbitanLuarNegara = {permohonan_status: null, 
        permohonan_tarikhdaftar: null,
        jenis_permohonan:null, 
        no_sijil:null, 
        status_sijil:null, 
        sijil_tarikhmula:null, 
        sijil_tarikhmula_display:null,
        sijil_tarikhtamat:null, 
        sijil_tarikhtamat_display:null,  
        semakan_status:null,
        semakan_catatantidaklengkap:null}
      
    this.cetakPdf = {
      ids: null,
      idp: null,
      sid: Math.random(),
      _token: null
    }
    this.showHidePerincian=false;
  }

  ionViewDidLoad() {
    let user = JSON.parse(localStorage.getItem('userData'));
    this.userData = user["syarikat_profile"];
    console.log('ionViewDidLoad TerbitanLuarNegaraPage');
    let pengguna_id = user["pengguna_id"];
    this.api.terbitanLuarNegara(pengguna_id).then( result => {
      // console.log("Home.ts Result :" + result);
      let list : any = result;
      let data = list.terbitan_luarnegara;
      //this.terbitanLuarNegara = JSON.stringify( data[0] );
      this.terbitanLuarNegara = {
        permohonan_status: data[0].permohonan_status,
        permohonan_tarikhdaftar: data[0].permohonan_tarikhdaftar,
        jenis_permohonan: data[0].jenis_permohonan,
        no_sijil: data[0].no_sijil,
        status_sijil: data[0].status_sijil,
        sijil_tarikhmula: data[0].sijil_tarikhmula,
        sijil_tarikhmula_display: this.api.dateformating(data[0].sijil_tarikhmula),
        sijil_tarikhtamat: data[0].sijil_tarikhtamat,
        sijil_tarikhtamat_display: this.api.dateformating(data[0].sijil_tarikhtamat),
        semakan_status: data[0].semakan_status,
        semakan_catatantidaklengkap: data[0].semakan_catatantidaklengkap

      }
      this.cetakPdf.idp = data[0].md5_permohonan_id;
      this.cetakPdf.ids = data[0].md5_syarikat_id;
      this.cetakPdf._token = data[0]._token;
      this.mainSystemUrl = this.api.mainSystemUrl();
      console.log('cetak pdf params : ' + JSON.stringify(this.cetakPdf));
      console.log('terbitan luar negara: ' + JSON.stringify( data[0].permohonan_status )+ 
      JSON.stringify( data[0].permohonan_tarikhdaftar )+ 
        JSON.stringify( data[0].jenis_permohonan )+ 
        JSON.stringify( data[0].no_sijil )+ 
        JSON.stringify( data[0].status_sijil )+ 
        JSON.stringify( data[0].sijil_tarikhmula)+ 
        JSON.stringify( data[0].sijil_tarikhtamat )+
        JSON.stringify( data[0].semakan_status));
    }).catch(err => {
     alert('Tiada data Permohonan Luar Negara!');
         this.navCtrl.setRoot(HomePage);
       console.log("Failed to get terbitan luar negara !: " + err);
    });
  }

  showDetail(semakan_catatantidaklengkap) {

    let data = semakan_catatantidaklengkap;
    const confirm = this.alertCtrl.create({
      title: 'Dokumen Tidak Lengkap',
      message: data,
      buttons: [
        {
          text: 'Tutup',
          handler: () => {
            console.log('Tutup clicked');
          }
        },
        {
          text: 'Hubungi Urusetia',
          handler: () => {
            this.api.callPerform();
            console.log('Call clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  callNumber(){
    this.api.callPerform();
   }

   hideShowPerincian(){
    if(this.showHidePerincian==true){
      this.showHidePerincian=false;
    }else{
      this.showHidePerincian=true;
    }

    console.log('hideShowPerincian : ' +  this.showHidePerincian);
  }


  
}
