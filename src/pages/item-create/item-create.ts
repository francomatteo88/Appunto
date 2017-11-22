import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';


@IonicPage() 
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
 
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
 
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private http: Http,public storage: Storage) {
    this.form = formBuilder.group({
      images: formBuilder.array([
        new FormControl()
      ]),
      name: ['', Validators.required],
      about: ['']
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 640,
        targetHeight: 640 
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpeg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  } 

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }	

  	var urlcategory = "http://punto20171017111129.azurewebsites.net/api/Advertisement";
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let username: string = 'matteo';
    let password: string = 'Sup3rg3n10';

    headers.append("Authorization", "Basic " + btoa(username + ":" + password));  
    let options = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
        Images: this.form.controls.profilePic.value,
        Title: this.form.controls['name'].value,
        Description: this.form.controls['about'].value,
		    CityId: 1
    });

    this.http.post(urlcategory, body, options ).subscribe();
    this.viewCtrl.dismiss();
    //this.viewCtrl.dismiss(this.form.value);
  }
}
