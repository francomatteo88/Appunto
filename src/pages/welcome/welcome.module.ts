import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome'; 
import { SearchModalPage } from '../search-modal/search-modal';

@NgModule({
  declarations: [
    WelcomePage,
    SearchModalPage  
  ],
  imports: [ 
    IonicPageModule.forChild(WelcomePage),
  ],
  exports: [
    WelcomePage 
  ], 
  entryComponents: [
    SearchModalPage
  ],
})
export class ProfilePageModule { }
