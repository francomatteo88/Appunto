import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl , FormArray } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage() 
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})    
export class ItemDetailPage { 
  item: any; 

  chat:FormGroup;
  email: any;
  password: any;

  constructor(public navCtrl: NavController, navParams: NavParams,public  formBuilder: FormBuilder, private http: Http,public storage: Storage ) {
    this.item = navParams.get('item');

    this.chat = formBuilder.group({
      AdvertisementId: this.item.AdvertisementId,
      Message: ['', Validators.required], 
    });

    this.storage.get("email").then((value) => {
      if (value != null) {
        this.email = value;
      }
    });

    this.storage.get("password").then((value) => {
      if (value != null) {
        this.password = value;
      }
    });

  }

  newchat(){
    
    var urlcategory = "http://punto20171017111129.azurewebsites.net/api/AdvertisementChat";
    
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let username: string = this.email;
     let password: string = this.password;
 
     headers.append("Authorization", "Basic " + btoa(username + ":" + password));  
     let options = new RequestOptions({ headers: headers });
 
     var body = JSON.stringify(this.chat.getRawValue());
 
     this.http.post(urlcategory, body, options ).subscribe();    

  }

} 
