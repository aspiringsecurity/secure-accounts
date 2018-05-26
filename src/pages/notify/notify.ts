import { Component } from '@angular/core';
import { IonicPage, NavController, Platform,NavParams,AlertController } from 'ionic-angular';
import{Validators,FormBuilder,FormGroup}from'@angular/forms';
import{LocalStorageProvider }from'../../providers/local-storage/local-storage';

import {LocalNotifications} from '@ionic-native/local-notifications';
/**
 * 
 * Generated class for the NotifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notify',
  templateUrl: 'notify.html',
})
export class NotifyPage {
 notifications: any[] = [];
parameter1:any;
  	notify:FormGroup;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public formBuilder:FormBuilder,
 // public hs :HomePage,
public platform:Platform,
  public alertCtrl:AlertController,
  public localNotifications:LocalNotifications,
  public localstorage:LocalStorageProvider) {
  this.notify = this.formBuilder.group({
		
		  minbalance: ['', Validators.required],
		});

    
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifyPage');
this.parameter1=this.navParams.get('params');
console.log(this.parameter1);
    //console.log(this.hs.totalCurrentBalance);
  }


  addNotifications()
  {

    let minb=this.notify.value.minbalance;
    if(this.parameter1<=minb)
    {
       let notification = {
                id: 1,
                title: 'Checkbook App!',
                text: 'You reached your minimum balance :)',
                
            };
 
        
            this.notifications.push(notification);
    }

   if(this.platform.is('cordova')){
 
        // Cancel any existing notifications
        this.localNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            this.localNotifications.schedule(this.notifications);
 
            this.notifications = [];
            let alert = this.alertCtrl.create({
                title: 'Notifications set',
                buttons: ['Ok']
            });
            alert.present();
        });
   }
  }
    cancelAll(){
 
    this.localNotifications.cancelAll();
 
    let alert = this.alertCtrl.create({
        title: 'Notifications cancelled',
        buttons: ['Ok']
    });
 
    alert.present();
 
}
 
}
