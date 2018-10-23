import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CallNumber } from '@ionic-native/call-number';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//let apiBaseUrl = "http://localhost/epembekal/api";
let apiBaseUrl ="http://203.217.179.121/api/epembekal";

@Injectable()
export class ApiProvider {

  constructor(
    public http: Http, 
    public httpClient : HttpClient,
    private callNumber: CallNumber
  ) {
    console.log('Hello ApiProvider Provider');
  }

  dateformating(data){ // yyyy-mm-dd
    let year = data.substring(0, 4);
    let month = data.substring(5, 7);
    let day = data.substring(8, 10);
    let fulldate = day + '-' + month + '-' + year;

    return fulldate;
  }

  utamaTempatan(pengguna_id){
    console.log('Utama Tempatan...');
    let url : string = apiBaseUrl + '/utama-tempatan-pemohon.php?pengguna_id='+ pengguna_id;

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe(data => {
        resolve(data);
        //console.log("api utama tempatan: " + JSON.stringify(data));
      }, err => {
        reject(err);
        console.log("Error to get utama tempatan :" + err);
      })
    })


  }
  utamaLuarNegara(pengguna_id){
    console.log('Utama Luar Negara...');
    let url : string = apiBaseUrl + '/utama-luar-negara-pemohon.php?pengguna_id='+ pengguna_id;

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe(data => {
        resolve(data);
        //console.log("api utama tempatan: " + JSON.stringify(data));
      }, err => {
        reject(err);
        console.log("Error to get utamaluar negara :" + err);
      })
    })


  }


  terbitanTempatan(pengguna_id){
    let url : string = apiBaseUrl + '/semakan-status.php?pengguna_id='+ pengguna_id;
    console.log('terbitanTempatan...');

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe(data => {
        resolve(data);
        //console.log("api utama tempatan: " + JSON.stringify(data));
      }, err => {
        reject(err);
        console.log("Error to get terbitan tempatan :" + err);
      })
    })
  }

  terbitanLuarNegara(pengguna_id){
    let url : string = apiBaseUrl + '/semakan-status.php?pengguna_id='+ pengguna_id;
    console.log('terbitanLuarNegara...');

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe(data => {
        resolve(data);
        //console.log("api utama tempatan: " + JSON.stringify(data));
      }, err => {
        reject(err);
        console.log("Error to get luar negara :" + err);
      })
    })
  }

  callPerform(){
    this.callNumber.callNumber("0199553193", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }


}
