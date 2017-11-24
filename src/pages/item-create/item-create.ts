import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl , FormArray } from '@angular/forms';
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

  email: any;
  password: any;
 
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public  formBuilder: FormBuilder, public camera: Camera, private http: Http,public storage: Storage) {
    this.form = formBuilder.group({
      Images: formBuilder.array([]), 
      Title: ['', Validators.required], 
      Description: [''],
      CityId: 1,
      CategoryId:1,
      AdvertisementTypeId: 0
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
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

  initImage(data: any) {
    // initialize our address
    return this.formBuilder.group({
        imageData: [data]
    });  
  }
 
  addAddress(data: any) {
    // add address to the list
    const control = <FormArray>this.form.controls['Images'];
    control.push(this.initImage(data));
  }

// removeAddress(i: number) {
//     // remove address from the list
//     const control = <FormArray>this.myForm.controls['addresses'];
//     control.removeAt(i);
// }


  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 640,
        targetHeight: 640 
      }).then((data) => {
        //this.form.patchValue({ 'profilePic': 'data:image/jpeg;base64,' + data });
        this.addAddress('data:image/jpeg;base64,' + data );
        //fai add sulla lista
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  // per seleziona da gallery
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      //this.form.patchValue({ 'profilePic': imageData });
      this.addAddress(imageData);
    };
    reader.readAsDataURL(event.target.files[0]);
  } 
    


  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }	

  	var urlcategory = "http://punto20171017111129.azurewebsites.net/api/Advertisement";
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let username: string = this.email;
    let password: string = this.password;

    headers.append("Authorization", "Basic " + btoa(username + ":" + password));  
    let options = new RequestOptions({ headers: headers });

    var body = JSON.stringify(this.form.getRawValue());

    this.http.post(urlcategory, body, options ).subscribe();
    this.viewCtrl.dismiss();
    //this.viewCtrl.dismiss(this.form.value);
  }
}
