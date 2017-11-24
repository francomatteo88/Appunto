import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Searchbar } from 'ionic-angular';
      
@Component({
  selector: 'advanced-search', 
  templateUrl: 'advanced-search.html'
}) 
export class AdvancedSearchPage {
 
  searchkey :any;

 
  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController) {
     this.searchkey = navParams.get('searchkey');

  }  
  

  cancel() {
    this.viewCtrl.dismiss();
  } 
  
  search(q: string){
    this.viewCtrl.dismiss(q);
  }
  
}
