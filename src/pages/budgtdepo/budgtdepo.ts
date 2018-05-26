import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import{Validators,FormBuilder,FormGroup}from'@angular/forms';
import {AddaccountProvider} from '../../providers/addaccount/addaccount';
import { LocalStorageProvider, Checkbook, Entry } from '../../providers/local-storage/local-storage';
import { DatePicker } from '@ionic-native/date-picker';
/*
 * Generated class for the BudgtdepoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-budgtdepo',
  templateUrl: 'budgtdepo.html',
})
export class BudgtdepoPage {
  budgetdepos:FormGroup;
  list:any={};
	register: any = [];
accountsList : any = [];
	date: Date ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
  public formBuilder: FormBuilder,public store:LocalStorageProvider,public datePicker:DatePicker) {
    this.budgetdepos= this.formBuilder.group({
		date: ['', Validators.required],
    accountname:[''],
		   details: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
		  amount: ['', Validators.required],
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgtdepoPage');
  }
depositbudget()
{
  	let key = this.budgetdepos.value.accountname;
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

 if(this.budgetdepos.value.details=="")
{
	alert("Please add details");

}
else if(this.budgetdepos.value.amount=="")
{
	alert("Please add amount to deposit");
}
else if(this.budgetdepos.value.amount<0)
		{
alert("enter a positive  amount");
		}
		else if(this.budgetdepos.value.amount>9999999999)
		{
alert("enter a valid  amount");
		}
else
{

		this.store.get(key).then(data => {
			this.register = JSON.parse(data) || {};
		
			console.log(JSON.stringify(this.register));

		
let balances =parseInt(this.budgetdepos.value.amount) ;
			//console.log("Add "+this.register.checkbook[this.register.checkbook.length-1].balance+" & "+balances);
		  balances = parseInt(balances.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);

let entry = new Entry(new Date().toString(), 
								  this.budgetdepos.value.num,
								  this.budgetdepos.value.details,
								  this.budgetdepos.value.bank,
								  this.budgetdepos.value.withdrawal,
								  this.budgetdepos.value.amount, 
								  balances);

			this.register.checkbook.push(entry);

			this.store.set(key, JSON.stringify(this.register));
			this.list = {
			created: new Date(this.date).toString(), accountname:this.budgetdepos.value.accountname, details: this.budgetdepos.value.details ,
		amount:this.budgetdepos.value.amount,
			 
		};
		
		

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

}