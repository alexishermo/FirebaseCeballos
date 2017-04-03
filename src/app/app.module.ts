import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Conexion con Firebase

import {AngularFireModule} from 'angularfire2';
export const CONFIG={
    apiKey: "AIzaSyAVVBfIgPaKm6KhBlu8hPTwC-tQg5ON-Ns",
    authDomain: "fir-440ce.firebaseapp.com",
    databaseURL: "https://fir-440ce.firebaseio.com",
    projectId: "fir-440ce",
    storageBucket: "fir-440ce.appspot.com",
    messagingSenderId: "587123869243"
}

//Conexion para Notificaciones

import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
const CLOUDSETTINGS: CloudSettings={
  'core':{
    'app_id':'8a381064'
  },
  'push':{
    'sender_id':'587123869243',
    'pluginConfig':{
      'ios':{
        'badge':true,
        'sound':true
      },
      'android':{
        'iconColor':'#343434'
      }
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(CONFIG),
    CloudModule.forRoot(CLOUDSETTINGS)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
