import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchPage } from '../search/search';
import "rxjs/Rx";
import { ItemCreatePage } from '../item-create/item-create';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
   
@IonicPage() 
@Component({ 
  selector: 'welcome-page',
  templateUrl: 'welcome.html'
})
export class WelcomePage { 
  


  
  constructor(public navCtrl: NavController,  public navParams: NavParams, private http: Http, public modalCtrl: ModalController,public  loadingCtrl: LoadingController,public storage: Storage ) { 
 
  
 
  }
  
  startApp(){
    this.navCtrl.setRoot(SearchPage);
  }

}
