import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html'
}) 
export class SearchModalPage {
   
  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController) {
     
  }  
  
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  search(q: string){
    this.viewCtrl.dismiss(q);
  }
  
}
