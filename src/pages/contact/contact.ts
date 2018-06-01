import { Component } from '@angular/core';
import { NavController,AlertController,Events,ToastController,NavParams } from 'ionic-angular';
import { CreateAccountPage} from '../create-account/create-account';
import {DeletePage} from '../delete/delete';
import{JournalPage}from '../journal/journal';
import{BudgetdepositPage} from '../budgetdeposit/budgetdeposit';
import{TransferPage} from'../transfer/transfer';
import{UserguidePage} from'../userguide/userguide';
import{BudgtdepoPage}from '../budgtdepo/budgtdepo';
import{CamerapreviewPage}from '../camerapreview/camerapreview';
import { LocalStorageProvider, Entry } from '../../providers/local-storage/local-storage';

@Component({

  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
	accountsList:any = [];
register: any = {};
	constructor(public navCtrl: NavController,
		public alertCtrl: AlertController,
		public store:LocalStorageProvider,
		public toastCtrl: ToastController,
				public events: Events, ) {
				this.store.getAccountList().then(data => {
     		this.accountsList = data;
	    });
	}
	loadCreatePage(){
		this.navCtrl.push(CreateAccountPage);
	}
	loaddeletePage()
	{
		this.navCtrl.push(DeletePage);
	}
	loadjournal()
	{
		this.navCtrl.push(JournalPage);

	}
	loadbudgets()
	{
		this.navCtrl.push(BudgtdepoPage);
	}
	loadtransfer()
	{
		this.navCtrl.push(TransferPage);
	}
	loaduserguide()
	{
		this.navCtrl.push(UserguidePage);
	}
viewsummary()
{
	this.navCtrl.push(BudgetdepositPage);
}
camerapreview()
{
	this.navCtrl.push(CamerapreviewPage);
}




		dodelete(){
		const that = this;
		let alert = this.alertCtrl.create();
	    alert.setTitle('Select Account');

	    this.store.getAccountList().then(data => {
        	this.accountsList = data;
			let accounts = this.accountsList;
			console.log("Total accounts=>"+accounts.length);
			for(var i in accounts){
				alert.addInput({
					type: 'radio',
					label: accounts[i]+'',
					value: accounts[i]+'',
					checked: false
				});
     		}	


     		alert.addButton('Cancel');
		    alert.addButton({
		      text: 'OK',
		      handler: account => {
		        if(!account) return;
		        console.log("Delete account => "+account);
		        let confirmAlert = this.alertCtrl.create({
				    title: 'Confirm delete',
				    message: 'Do you want to delete account '+account+'?',
				    buttons: [
				      {
				        text: 'Cancel',
				        role: 'cancel',
				        handler: () => {
				          /// console.log('Cancel clicked');
				        }
				      },
				      {
				        text: 'Ok',
				        handler: () => {
				           // console.log('Buy clicked');
						    this.store.get(account).then(data => {
					           	that.register = JSON.parse(data) || {};
					           	const balance = this.register.checkbook[this.register.checkbook.length-1].balance;
					           	if(balance && balance > 0){
					           		console.log(balance+" needs to be transfered");
					           		that.navCtrl.push(DeleteAccountPage, {
					           			balance : balance, account: account
					           		});

					           		that.events.subscribe('amount:transfered', (time) => {
									    // user and time are the same arguments passed in `events.publish(user, time)`
									    console.log('Account '+account+' deleted at '+ time);
									    that.store.delete(account);
									    that.presentToast("Account deleted successfully");
									});
					           	}
								else{
									this.store.delete(account);
									this.presentToast("Account deleted successfully");
								}
				           	});
				        }
				      }
				    ]
				 });
				confirmAlert.present();
			  }
		    });


     		alert.present();
        });
	}

	presentToast(msg) {
	    let toast = this.toastCtrl.create({
	    message: msg,
	    duration: 3000,
	    position: 'bottom'
	    });

	    toast.onDidDismiss(() => {
	      // console.log('Dismissed toast');
	    });

	    toast.present();
  	}

  	setDefaultAccount(){
  		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
			this.store.setAccount(this.accountsList[0]);
		});
  	}

 
}
@Component({
  template: `
	<ion-header>
	 <ion-navbar>
	   <ion-title>Transfer Amount</ion-title>
	 </ion-navbar>
	</ion-header>
  	<ion-content  class="background">
      <ion-item>
		  <ion-label>Amount: {{ amount | amountpipe }} </ion-label>
		</ion-item>

		<ion-item>
		  <ion-label>From account: {{ accountFrom }} </ion-label>
		</ion-item>

		<ion-item>
		  <ion-label>To account: </ion-label>
		  <ion-select [(ngModel)]="accountSelected" multiple="false" (ionChange)="updateSelectedAccount(accountSelected)">
		    <ion-option  *ngFor='let account of accountsList' [value]="account">{{ account }}</ion-option>
		  </ion-select>
		</ion-item>
      <br>

      <button ion-button type="submit" (click)="transferRemaining()" full>Transfer Amount</button>
	</ion-content>
  `
})

export class DeleteAccountPage {

	accountsList : any = [];
	accountSelected: any;
	accountFrom: any;
	amount :any;
	register: any = {};
	
	constructor(public params: NavParams,
				public store: LocalStorageProvider,
				public toastCtrl: ToastController,
				public events: Events,
				public navCtrl: NavController){

		this.accountFrom = this.params.get('account');
		console.log(this.accountFrom);
		this.amount = this.params.get('balance');

		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
			this.accountSelected = this.accountsList[0];
		});

	}

	transferRemaining(){
		if(this.accountSelected=="")
		{
		this.presentToast("Select the to account");
			return;	
		}
		 else if(this.accountSelected == this.accountFrom) {
			this.presentToast("Cannot transfer within the same account.");
			return;
		}
		else
		{
		console.log("Transfering "+this.amount+" from account "+this.accountFrom+" to "+this.accountSelected);
		this.presentToast("Transfering "+this.amount+" from account "+this.accountFrom+" to "+this.accountSelected);
	    const descFrom = 'Transfer from account '+this.accountFrom;

	    this.store.get(this.accountSelected).then(data => {
			this.register = JSON.parse(data) || {};
			// this.register.checkbook;

			let balance  = this.amount;
			console.log("Add "+this.register.checkbook[this.register.checkbook.length-1].balance+" & "+balance);
			balance = parseInt(balance.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);

			let entry = new Entry(new Date().toString(), 
			          'NEFT',
			          descFrom,
			          'R',
			          0,
			          this.amount, 
			          balance);

			this.register.checkbook.push(entry);

			// console.log(JSON.stringify(this.register)); 
			this.store.set(this.accountSelected, JSON.stringify(this.register)).then(val => {
				// console.log('Journal entry Created');
				this.events.publish('amount:transfered', Date.now());
				this.navCtrl.pop();
			});
		
		});
		}
	}
	
	updateSelectedAccount(account){
    	this.accountSelected = account;
  	}


	presentToast(msg) {
	    let toast = this.toastCtrl.create({
	    message: msg,
	    duration: 5000,
	    position: 'bottom'
	    });

	    toast.onDidDismiss(() => {
	      // console.log('Dismissed toast');
	    });

	    toast.present();
  	}
}