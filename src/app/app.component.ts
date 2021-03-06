import { Component, ViewChild } from '@angular/core';
import { ModalController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from '../pages/search/search';
import { WelcomePage } from '../pages/welcome/welcome';
import { ItemCreatePage } from '../pages/item-create/item-create';
 

@Component({
  selector: 'MyApp',
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) nav: Nav; 
 
  rootPage: any = WelcomePage;
  createPage: any = ItemCreatePage;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController) {
    this.initializeApp(); 
 
    // used for an example of ngFor and navigation
    // this.pages = [
	  //   { title: 'Cerca', component: SearchPage } 
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  } 



}
