import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { NavController, ViewController } from 'ionic-angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

//@IonicPage() 
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
 
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;
 
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private http: HttpClient) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
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

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {

    if (!this.form.valid) { return; }
		
  	var urlcategory = "http://punto20171017111129.azurewebsites.net/api/Advertisements";

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
        ImageData: this.form.controls.profilePic.value,
        Title: this.form.controls['name'].value,
        Description: this.form.controls['about'].value,
		    CityId: 1
    });

    this.http.post(urlcategory, body, { headers: headers} ).subscribe();
    this.viewCtrl.dismiss();
    //this.viewCtrl.dismiss(this.form.value);
  }
}
