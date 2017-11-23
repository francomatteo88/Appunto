import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchPage } from '../search/search';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  account: { email: string, password: string, firstname:string, lastname:string } = {
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    private http: Http,
    public toastCtrl: ToastController,public storage: Storage) {
  }

  // Attempt to login in through our User service
  doRegister() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    let options = new RequestOptions({ headers: headers });
    var body = JSON.stringify(this.account);
    this.http.post("http://punto20171017111129.azurewebsites.net/api/User", body, options).subscribe((resp) => {
      this.storage.set("email", this.account.email);
      this.storage.set("password", this.account.password);
      this.navCtrl.setRoot(SearchPage);
  }, err => {
    let toast = this.toastCtrl.create({
      message: "Errore in registrazione",
      duration: 3000,
      position: 'top'
    }); 
    toast.present();
  });

  }

}
