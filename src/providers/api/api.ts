import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiBaseUrl = "http://localhost/epembekal/api";

@Injectable()
export class ApiProvider {

  constructor(
    public http: Http, 
    public httpClient : HttpClient
  ) {
    console.log('Hello ApiProvider Provider');
  }

  utamaTempatan(){
    console.log('Utama Tempatan...');
    let url : string = apiBaseUrl + '/utama-tempatan-pemohon.php?pengguna_id=357-11111111';

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
}
