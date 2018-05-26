import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators,FormBuilder,FormGroup }from'@angular/forms';
import { LocalStorageProvider, Checkbook, Entry } from '../../providers/local-storage/local-storage';
import { DatePicker } from '@ionic-native/date-picker';
@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage {

	journal:FormGroup;
  list:any={};
 	accountsList : any = [];
	accountSelected: any;
	register: any = [];
date: Date ;
	constructor(public navCtrl:NavController,
				public navParams:NavParams,
				public store:LocalStorageProvider,
				public formBuilder: FormBuilder,
				public toastCtrl:ToastController ,
				public datePicker:DatePicker) {

		this.journal = this.formBuilder.group({
			date: ['', Validators.required],
			withdrawal: [''],
			deposit:[''],
			bank:[''],
			num:[''],
			details:['',Validators.required],
			accountname: ['', Validators.required],
		});

		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
			// this.accountSelected = this.accountsList[0];
		});
			this.date = new Date();

	}


	ionViewWillEnter() {
		this.store.getAccountList().then(transfer => {
			this.accountsList = transfer;
			//this.transfer.value.accountSelected = this.accountsList[0];
		});
	}

	journaldata() {
		let key = this.journal.value.accountname;
		if(!key){
			return;
		}
		// console.log(key);
		key = this._formatString(key);
		// console.log(key);
		if(!key) {
			alert("Please select an account first");
			return;
		}
		if(this.journal.value.details=="")
		{
			alert("Please enter the details");
		}
		else if((this.journal.value.deposit=="")&&(this.journal.value.withdrawal==""))
		{
			alert("Please enter the  correct deposit or withdrawal amount");
		}
		else if(this.journal.value.withdrawal<0)
		{
alert("enter a positive withdrawal amount");
		}
		else if(this.journal.value.withdrawal>9999999999)
		{
alert("enter a valid withdrawal amount");
		}
		else if(this.journal.value.deposit<0)
		{
alert("enter a positive deposit amount");
		}
		
		else if(this.journal.value.deposit>9999999999)
		{
alert("enter a  valid deposit amount");
		}
		
		else if((this.journal.value.bank !=='R')&&(this.journal.value.bank!=='X'))
		{
			alert("Bank Reconcile values should be R or X only");
		}
		else
		{
		this.store.get(key).then(data => {
			this.register = JSON.parse(data) || {};
			// this.register.checkbook;
			console.log(JSON.stringify(this.register));

if(!this.journal.value.deposit || this.journal.value.deposit == '') this.journal.value.deposit = 0;
if(!this.journal.value.withdrawal || this.journal.value.withdrawal == '') this.journal.value.withdrawal = 0;
			
			let balances =parseInt(this.journal.value.deposit) - parseInt(this.journal.value.withdrawal);
			
			// console.log(balances);
			// console.log(JSON.stringify(this.register.checkbook));
			console.log("Add "+this.register.checkbook[this.register.checkbook.length-1].balance+" & "+balances);
			balances = parseInt(balances.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);
			
			let entry = new Entry(new Date(this.date).toString(), 
								  this.journal.value.num,
								  this.journal.value.details,
								  this.journal.value.bank,
								  this.journal.value.withdrawal,
								  this.journal.value.deposit, 
								  balances);

			this.register.checkbook.push(entry);

			this.store.set(key, JSON.stringify(this.register));
			
		

			// console.log('Journal entry Created');
			this._presentToast("Transaction added successfully");
			this.navCtrl.pop();

		});
		
	}
	}

	_formatString(name){
		/* Remove whitespaces */
		while(name.indexOf(" ") != -1){
			name = name.replace(" ","");
		}
		return name;
	}

loadDatePicker(){
		console.log("loading date picker.. ");
		this.datePicker.show({
		  date: new Date(),
		  mode: 'date',
		}).then(
		  date => {
		  	// console.log('Got date: ', date);
		  	this.date = new Date(date);
		  },
		  err => console.log('Error occurred while getting date: ', err)
		);
	}

	_presentToast(msg) {
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

}
