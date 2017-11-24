import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile'; 
import { SearchModalPage } from '../search-modal/search-modal';

@NgModule({
  declarations: [
    ProfilePage,
    SearchModalPage
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
  exports: [
    ProfilePage
  ], 
  entryComponents: [
    SearchModalPage
  ],
})
export class ProfilePageModule { }
