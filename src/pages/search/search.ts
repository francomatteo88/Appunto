import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchModalPage } from '../search-modal/search-modal';
import { AdvancedSearchPage } from '../advanced-search/advanced-search';
import "rxjs/Rx";
import { ItemCreatePage } from '../item-create/item-create';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  skip: any = 0;
  searchkey :any;
  currentItems: any = [];
  firstColumnItems: any = [];
  secondColumnItems: any = [];
  loading: any;
  CategoryId :any;
  CityId :any;
  CityName:any;

  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public modalCtrl: ModalController,public  loadingCtrl: LoadingController,public storage: Storage,private geolocation: Geolocation) { 
 

    var email: string = "";
    this.storage.get("email").then((value) => {
      if (value != null) {
        email = value;
        this.loggedIn = true;
      } 
    }); 

    var search_string = "";
    if (this.searchkey != undefined){
      search_string = "&search_query="+this.searchkey;
    }

    
    this.http.get("http://punto20171017111129.azurewebsites.net/api/Search?skip="+this.skip+search_string)
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
     });

    //  this.geolocation.getCurrentPosition().then((resp) => {
    //   alert(resp.coords.latitude);
    //   alert(resp.coords.longitude);
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });

  }

  
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Ricerca in corso...'
    });
    this.loading.present();
  };
   
  dismissLoading(){ 
    this.loading.dismiss();
  }

  advancedsearch(){
    let itemcreateModal = this.modalCtrl.create(AdvancedSearchPage, { searchkey: this.searchkey });

    itemcreateModal.onDidDismiss(data => {
    
    });

    itemcreateModal.present();

  }

  searchmodal() {   
    let itemcreateModal = this.modalCtrl.create(SearchModalPage, { searchkey: this.searchkey });
    this.presentLoadingDefault(); 
    itemcreateModal.onDidDismiss(data => {
      this.skip = 0;
      this.searchkey = data;

      var search_string = "";
      if (this.searchkey != undefined){
        search_string = "&search_query="+this.searchkey;
      }

      this.http.get("http://punto20171017111129.azurewebsites.net/api/Search?skip="+this.skip+search_string)
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
    });
    itemcreateModal.present();
  }

  doInfinite(infiniteScroll) {
    this.skip++;
    var search_string = "";
    if (this.searchkey != undefined){
      search_string = "&search_query="+this.searchkey;
    }
    this.http.get("http://punto20171017111129.azurewebsites.net/api/Search?skip="+this.skip+search_string)
    .subscribe(result => {
      this.currentItems = result;
      for (var i = 0; i < this.currentItems.length; i++) { 
        if ( i % 2 == 0){  
          this.firstColumnItems.push(this.currentItems[i]);
        }else{
          this.secondColumnItems.push(this.currentItems[i]);
        };
      };
      infiniteScroll.complete();
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
 
  newAdv() {
    // let itemcreateModal = this.modalCtrl.create(ItemCreatePage, { userId: 8675309 });
    // itemcreateModal.present();
    this.navCtrl.push(ItemCreatePage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  myprofile(){
  
    this.navCtrl.push(ProfilePage);
  }


  ionViewDidLoad() {
 
   }
 


}
