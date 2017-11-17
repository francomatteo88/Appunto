import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchModalPage } from '../search-modal/search-modal';
import "rxjs/Rx";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public modalCtrl: ModalController,public  loadingCtrl: LoadingController ) { 
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

  openItem(item: any) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }  

  searchmodal() {   
    let itemcreateModal = this.modalCtrl.create(SearchModalPage, { searchkey: this.searchkey });
    this.presentLoadingDefault(); 
    itemcreateModal.onDidDismiss(data => {
      this.skip = 0;
      this.searchkey = data;
      this.http.get("http://punto20171017111129.azurewebsites.net/api/Search?skip="+this.skip+"&search_query="+data)
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
    this.http.get("http://punto20171017111129.azurewebsites.net/api/Search?skip="+this.skip+"&search_query="+this.searchkey)
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

}
