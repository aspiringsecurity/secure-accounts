import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-budgetdeposit',
  templateUrl: 'budgetdeposit.html',
})
export class BudgetdepositPage {

	register: any = [];
	accountsList : any = [];
	accountSelected: any;
	created: any = new Date();
	obalance: number = 0.00;
	payPeriod: number = 0.00;
	display: any  = {};
	columns: any;
	selectOptions: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public store: LocalStorageProvider) {

		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
		});

		this.display = {
			date: true, num: false, description: false, r: false, debit: false, credit: false, balance: true
		};

	}

	ionViewWillEnter() {
		// console.log('ionViewDidLoad SummaryPage');
		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
		});
		this.store.getAccount().then(account => {
			if(!account) return;
			this.accountSelected = account;
			this.loadCheckbook(this.accountSelected);
		});
	}

	loadCheckbook(account){
		this.store.get(account).then(data => {
			this.register = JSON.parse(data) || {};
			console.log("Register => "+JSON.stringify(this.register));
			this.created = this.register.created;
			console.log(this.created);
			console.log(this.register.created);
			this.obalance = this.register.balance;
			this.payPeriod = this.register.budget;
		});
	}

	updateSelectedAccount(account){
		this.accountSelected = account;
		this.loadCheckbook(account);
		this.store.setAccount(account);
	}

	updateColumns(){
		Object.keys(this.display).map(val => { this.display[val] = false; });

		this.columns.map((value, key) =>{
			// console.log(key+ " val => "+value);
			Object.keys(this.display).map( data =>{
				if(value == data){
					this.display[value] = true;
				}
			});
			// console.log("value => "+value+"  display[value] =>  "+this.display[value]);
		});
	}

}
