import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchModalPage } from '../search-modal/search-modal';
import "rxjs/Rx";
import { ItemCreatePage } from '../item-create/item-create';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  skip: any = 0;
  searchkey :any;
  currentItems: any = [];
  
  advertisements: any = [];

  loading: any;

  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public modalCtrl: ModalController,public  loadingCtrl: LoadingController,public storage: Storage ) { 

    var email: string = "";
    this.storage.get("email").then((value) => {
      if (value != null) {
        email = value;
        this.loggedIn = true;
      }
    });

    //get annunci
    this.http.get("http://punto20171017111129.azurewebsites.net/api/")
    .subscribe(result => {      
      this.currentItems = result;
      this.firstColumnItems = [];
      this.secondColumnItems = [];
      for (var i = 0; i < this.currentItems.length; i++) { 
        if ( i % 2 == 0){  
          this.firstColumnItems.push(this.currentItems[i]);
        }else{
          this.secondColumnItems.push(this.currentItems[i]);
        };
      };
      this.dismissLoading();
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
