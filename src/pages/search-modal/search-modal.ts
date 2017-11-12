import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage() 
@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html'
}) 
export class SearchModalPage {
  item: any;  

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.item = navParams.get('item');
  } 

}
