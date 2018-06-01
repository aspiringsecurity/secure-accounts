import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ContactPage, DeleteAccountPage } from '../pages/contact/contact';
import { CreateAccountPage} from'../pages/create-account/create-account';
import { HomePage,OptionsPopoverPage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FilesPage}from'../pages/files/files';
import { AccountPage}from '../pages/account/account';
import { PurchasePage}from'../pages/purchase/purchase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { IonicStorageModule } from '@ionic/storage';
import{DeletePage} from '../pages/delete/delete';
import{JournalPage}from '../pages/journal/journal';
import{UtilityProvider}from'../providers/utility/utility';
import{BudgetdepositPage}from'../pages/budgetdeposit/budgetdeposit';
import{TransferPage}from'../pages/transfer/transfer';
import{BudgtdepoPage}from'../pages/budgtdepo/budgtdepo';
import{UserguidePage} from '../pages/userguide/userguide';
import{EditentryPage}from'../pages/editentry/editentry';
import{OptionsPage}from'../pages/options/options';
import{CameraviewPage}from '../pages/cameraview/cameraview';
import{CamerapreviewPage}from '../pages/camerapreview/camerapreview';
import { AmountPipe } from '../pipes/amount/amount';
import { DatePipe } from '../pipes/date/date';
import { DatePicker } from '@ionic-native/date-picker';
import { EmailComposer } from '@ionic-native/email-composer';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { ExpandableComponent } from '../components/expandable/expandable';
import{TipsPage}from'../pages/tips/tips';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import{NotifyPage}from'../pages/notify/notify';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import{AngularFireModule} from'angularfire2';
import{Push}from'@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {CameraPreview} from '@ionic-native/camera-preview';


export const firebaseconfig={
  apiKey: "AIzaSyDJbewQsyr6lqE2xSQZ2Z1dbDvH_q7V0L0",
    authDomain: "fir-cloudmessaging-36a89.firebaseapp.com",
    databaseURL: "https://fir-cloudmessaging-36a89.firebaseio.com",
    projectId: "fir-cloudmessaging-36a89",
    storageBucket: "fir-cloudmessaging-36a89.appspot.com",
    messagingSenderId: "28839893727"
};

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    FilesPage,
    AccountPage,
    CreateAccountPage,
    PurchasePage,
    DeletePage,
    JournalPage,
    BudgetdepositPage,
    TransferPage,
   OptionsPopoverPage,
    BudgtdepoPage,
    DeleteAccountPage,
    UserguidePage,EditentryPage,OptionsPage,AmountPipe,DatePipe,
    ExpandableComponent,
    TipsPage,
    NotifyPage,
    CameraviewPage,
    CamerapreviewPage
  
  ],
  imports: [
    [ BrowserModule, HttpModule],
    IonicModule.forRoot(MyApp),
 IonicStorageModule.forRoot(),
 AngularFireModule.initializeApp(firebaseconfig)
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    FilesPage,
    AccountPage,
    PurchasePage,DeletePage,
    JournalPage,
    BudgetdepositPage,
    TransferPage,
    BudgtdepoPage,
    OptionsPopoverPage,
    UserguidePage,EditentryPage,OptionsPage,DeleteAccountPage,
    TipsPage,
    NotifyPage,
    CameraviewPage,
    CamerapreviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
     AngularFireDatabase,
    AngularFireModule,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    UtilityProvider,
    DatePicker,
    DatePipe,
    AmountPipe,
     EmailComposer,
    Printer,
    UtilityProvider,
    InAppBrowser,
    Push,
    CameraPreview

    
  ]
})
export class AppModule {}
