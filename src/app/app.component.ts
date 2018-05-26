import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{Push,PushObject,PushOptions}from'@ionic-native/push';
import { TabsPage } from '../pages/tabs/tabs';
import{LocalStorageProvider}from'../providers/local-storage/local-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,public store:LocalStorageProvider, splashScreen: SplashScreen,public push:Push,public alertctrl:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     // this.setalert();
      this.pushsetup();


    });
  }

  /*setalert()
  {
    if(this.store.getEmail<=this.totalCurrentBalance)
		{
			alert("You have reached your minimum balance");
		}
  }*/
  pushsetup()
  {
    const options:PushOptions={
      android:{
        senderID:'28839893727'
      },
      ios:{



      },
      windows:{


      },

    };
    const  pushObject: PushObject=this.push.init(options);

    pushObject.on('notification').subscribe((notification:any)=>
    {
      if (notification.additionalData.foreground)
      {
  let  youralert=this.alertctrl.create({
    title:'CheckbookApp',
    message:notification.message
  })
  youralert.present();
      }
    });
 pushObject.on('registration').subscribe((registration:any)=>console.log('welcome user'));
  pushObject.on('error').subscribe((error:any)=>console.log('error'));
    }  
}
