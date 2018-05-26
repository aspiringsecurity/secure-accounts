import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,PopoverController, AlertController, Events } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import{LocalStorageProvider }from'../../providers/local-storage/local-storage';
import { DatePipe } from '../pipes/date/date';
 /* Generated class for the EditentryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editentry',
  templateUrl: 'editentry.html',
})
export class EditentryPage {
  entry: any = {};
	account : any;
	enableClicked: boolean;
		date: Date ;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public viewCtrl: ViewController,
				public datePicker: DatePicker,
				public popoverCtrl: PopoverController,
				public alertCtrl: AlertController,
				public store: LocalStorageProvider,
				public events: Events) {

		this.entry = this.navParams.get('data');
		this.account = this.navParams.get('account');
		this.enableClicked = false;
			this.date = new Date();
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad EditModalPage');
	}

	updateEntry(){
		this.viewCtrl.dismiss(this.entry);
	}

	closeModal(){
		this.viewCtrl.dismiss();
	}

	openDatePicker(){
		this.datePicker.show({
		  date: new Date(),
		  mode: 'date'
		}).then(
		  date => {
		  	console.log('Got date: ', date);
		  	this.entry.date = new Date(date);
		  },
		  err => console.log('Error occurred while getting date: ', err)
		);
	}

	update(){
	
		console.log("Update transaction => "+this.entry.id);
		this.store.editEntry(this.entry, this.account);
		this.events.subscribe('entry:updated' , time => {
			console.log("Updated transaction => "+this.entry.id +" at "+ time);
		    this.viewCtrl.dismiss();
				
		});

	}
	

	delete(){
		// console.log("Delete transaction => "+this.entry.id);
		let confirm = this.alertCtrl.create({
	    title: 'Confirm delete',
	    message: 'Do you want to delete this transaction?',
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: () => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Ok',
	        handler: () => {
	          // console.log('Ok clicked');
	          // Delete the entry
	          this.store.deleteEntry(this.entry, this.account);
	          this.events.subscribe('entry:deleted', time => {
			    // user and time are the same arguments passed in `events.publish(user, time)`

			    this.viewCtrl.dismiss();
			  });
	        }
	      }
	    ]
	  });
	  confirm.present();
	}

	edit(val){
		// console.log(val);
		if(val){
			let alert = this.alertCtrl.create({
				title: 'Enable',
				subTitle: 'Enabling the amount entries may lead to data loss.',
				buttons: ['Ok']
			});
			alert.present();
		}
		this.enableClicked = val;
		
	}

}