import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html'
}) 
export class SearchModalPage {

  searchkey :any;

  @ViewChild('mainSearchbar') searchBar: Searchbar
  
  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController) {
     this.searchkey = navParams.get('searchkey');

  }  
  
  ionViewDidEnter() {
	setTimeout(()=>{
      this.searchBar.setFocus();
	}, 150);
  }
  
  cancel() {
    this.viewCtrl.dismiss();
  } 
  
  search(q: string){
    this.viewCtrl.dismiss(q);
  }
  
}
