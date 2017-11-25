import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Searchbar } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'search-city', 
  templateUrl: 'search-city.html'
}) 
export class SearchCityPage {
 
  searchkey :any;
  cities: any = [];

  @ViewChild('mainSearchbar') searchBar: Searchbar
   
  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, private http: HttpClient  ) {
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

  getCities(ev) {
    let val = ev.target.value;
    this.http.get("http://punto20171017111129.azurewebsites.net/api/City?search="+val)
    .subscribe(result => {      
      this.cities = result;
    })
  }
 

  select(item:any){
    this.viewCtrl.dismiss(item); 
  }
  
}
