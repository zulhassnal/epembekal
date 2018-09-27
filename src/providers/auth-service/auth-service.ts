import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiURL = 'http://www.kometsoft.net/epembekal/api/login.php';
let apiSemakanStatus = 'http://www.kometsoft.net/epembekal/api/semakan-status.php?';
let apiBaseUrl = "http://localhost/kkmm/api";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, public httpClient : HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  // Get User from LocalStorage
  getUser(){
    let data = localStorage.getItem('userData');
    if (data) {
      return JSON.parse(data);
    }
  }

  // Get Senarai Terbitan for selected user 
  getSenaraiTerbitan(pengguna_id : string){
    let url : string = apiSemakanStatus + 'pengguna_id=' + pengguna_id;

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe(data => {
        resolve(data);
        console.log("Data Semakan: " + data);
      }, err => {
        reject(err);
        console.log("Error to get senarai terbitan :" + err);
      })
    })

} // End of getSenaraiTerbitan()

  postData(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiURL, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
           console.log('Login via API success: ' + res.json());
        }, (err) => {
          reject(err);
          console.log('Login via API failed: ' + err);

        });
    });

  }

  pengumuman(){
    let url : string = apiBaseUrl + '/pengumuman.php';

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe(data => {
        resolve(data);
        console.log("Data Pengumuman: " + data);
      }, err => {
        reject(err);
        console.log("Error to get pengumuman :" + err);
      })
    })
  }

}

