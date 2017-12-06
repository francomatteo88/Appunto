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
import { SearchCityPage } from '../pages/search-city/search-city'; 
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AdvancedSearchPage } from '../pages/advanced-search/advanced-search'; 
import { Geolocation  } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';

@NgModule({ 
  declarations: [ 
    MyApp,
    SearchPage,
    ItemCreatePage,
    SearchModalPage,
    SearchCityPage, 
    AdvancedSearchPage, 
    RegisterPage,  
    WelcomePage, 
    ProfilePage,  
    LoginPage  
  ],
  imports: [
    BrowserModule,  
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp), 
    IonicStorageModule.forRoot() 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ItemCreatePage,
    SearchModalPage,
    AdvancedSearchPage, 
    SearchCityPage, 
    WelcomePage,
    RegisterPage,
    ProfilePage,
    LoginPage
  ],
  providers: [
    Camera,		
    Geolocation,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
