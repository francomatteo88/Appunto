import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchPage } from '../search/search';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    private http: Http,
    public toastCtrl: ToastController) {
  }

 
  // Attempt to login in through our User service
  doLogin() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    let options = new RequestOptions({ headers: headers });
    var body = JSON.stringify(this.account);
    this.http.post("http://punto20171017111129.azurewebsites.net/api/Login", body, options).subscribe((resp) => {
      this.navCtrl.setRoot(SearchPage);
  }, err => {
    let toast = this.toastCtrl.create({
      message: "Email o password sbagliata",
      duration: 3000,
      position: 'top'
    }); 
    toast.present();
  });

     
   


  }
}
