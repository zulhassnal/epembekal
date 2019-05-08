import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://epembekal.local/api';
  mainSystemUrl_: string = "http://epembekal.local/";

  constructor(
    public http: HttpClient,
    private callNumber: CallNumber
    ) {
  }

  mainSystemUrl(){
    return this.mainSystemUrl_;
  }
  
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
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
    let url : string = this.url + '/utama-tempatan-pemohon.php?pengguna_id='+ pengguna_id;

    return new Promise((resolve, reject) => {
      this.http.get(url)
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
    let url : string = this.url + '/utama-luar-negara-pemohon.php?pengguna_id='+ pengguna_id;

    return new Promise((resolve, reject) => {
      this.http.get(url)
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
    let url : string = this.url + '/semakan-status.php?pengguna_id='+ pengguna_id;
    console.log('terbitanTempatan...');

    return new Promise((resolve, reject) => {
      this.http.get(url)
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
    let url : string = this.url + '/semakan-status.php?pengguna_id='+ pengguna_id;
    console.log('terbitanLuarNegara...');

    return new Promise((resolve, reject) => {
      this.http.get(url)
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
