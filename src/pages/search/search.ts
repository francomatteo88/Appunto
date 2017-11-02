import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import "rxjs/Rx";

//import { Item } from '../../models/item';
//import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient ) { }

  /**
   * Perform a service for the proper items.
   */
   getItems(ev) {
     let val = ev.target.value;
     this.http.get("http://punto20171017111129.azurewebsites.net/api/Advertisements?search_query="+val)
		.subscribe(result => {
			this.currentItems = result;
        });
   }
   
   
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
