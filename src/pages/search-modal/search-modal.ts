import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams,ViewController,Searchbar } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

declare var google: any;

@Component({
  selector: 'page-search-modal', 
  templateUrl: 'search-modal.html'
}) 
export class SearchModalPage {
  
  searchkey :any; 
  @ViewChild('mainSearchbar') searchBar: Searchbar;
  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder) {
     this.searchkey = navParams.get('searchkey');
     
      this.loadMap();
    

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
  


   geocodeAddress(geocoder, address) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
      
        let mapOptions = {
          center: results[0].geometry.location,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var resultsMap = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

        resultsMap.addListener('center_changed', function() {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          marker.setPosition(map.getCenter());
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


  loadMap(){

    var geocoder = new google.maps.Geocoder();


   
    this.geolocation.getCurrentPosition().then((position) => {
        
           let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
           let mapOptions = {
             center: latLng,
             zoom: 11,
             mapTypeId: google.maps.MapTypeId.ROADMAP
           }

           var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
           var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });

          map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            marker.setPosition(map.getCenter());
          });

         }, (err) => {
           this.geocodeAddress(geocoder,"Roma"); 
         });
      
     }

}
