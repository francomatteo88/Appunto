import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchModalPage } from '../search-modal/search-modal';
import "rxjs/Rx";
import { ItemCreatePage } from '../item-create/item-create';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { SearchPage } from '../search/search';

@IonicPage() 
@Component({ 
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
 
  email: any; 
  password: any;
  currentItems: any = []; 
  
  advs: any = []; 
 
  constructor(public navCtrl: NavController,  public navParams: NavParams, private http: Http, public modalCtrl: ModalController,public  loadingCtrl: LoadingController,public storage: Storage ) { 
 
    this.storage.get("email").then((value) => {
      if (value != null) {
        this.email = value;
 
        this.storage.get("password").then((value) => {
          if (value != null) {
            this.password = value; 
            this.loadData();

          }
        });  

      }
    });
 
  } 

  logout(){
    this.storage.set("email", null);
    this.storage.set("password", null);
    this.navCtrl.setRoot(SearchPage); 
  }


  

  loadData(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append("Authorization", "Basic " + btoa(this.email + ":" + this.password));  
    let options = new RequestOptions({ headers: headers });

    //get annunci
    this.http.get("http://punto20171017111129.azurewebsites.net/api/Advertisement",options )
    .subscribe(result => {   
      
      this.currentItems = result.json();   

      for (var i = 0; i <  this.currentItems.length; i++) { 
        this.advs.push(this.currentItems[i]);
      };
   

     });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  openItem(item: any) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }  
 

}
