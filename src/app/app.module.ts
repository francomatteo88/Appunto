import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule  } from '@angular/common/http';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { SearchModalPage } from '../pages/search-modal/search-modal'; 
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
 
@NgModule({
  declarations: [ 
    MyApp,
    SearchPage,
    ItemCreatePage,
    SearchModalPage,
    LoginPage
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ItemCreatePage,
    SearchModalPage,
    LoginPage
  ],
  providers: [
    Camera,		
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
