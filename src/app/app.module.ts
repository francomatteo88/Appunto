import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { Items } from '../mocks/providers/items';
import { Api } from '../providers/providers';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemCreatePage } from '../pages/item-create/item-create';

@NgModule({
  declarations: [ 
    MyApp,
    SearchPage,
    ItemCreatePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ItemCreatePage
  ],
  providers: [
    Api,
    Items,
    Camera,		
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
