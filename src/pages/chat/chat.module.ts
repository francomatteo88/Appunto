import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat'; 
import { SearchModalPage } from '../search-modal/search-modal';

@NgModule({
  declarations: [
    ChatPage,
    SearchModalPage 
  ],
  imports: [ 
    IonicPageModule.forChild(ChatPage),
  ],
  exports: [
    ChatPage
  ], 
  entryComponents: [
    SearchModalPage
  ],
})
export class ProfilePageModule { }
