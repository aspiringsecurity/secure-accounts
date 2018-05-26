import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

export class Entry {
	id: string;
	date: string;
	num: string;
	description: string;
	r: string;
	withdraw: number;
	deposit: number;
	balance: number;

	constructor(date, num, description, r, withdraw, deposit, balance){
		this.id = new Date().getTime().toString();
		this.date = date;
		this.num = num || '';
		this.description = description || '';
		this.r = r || '';
		this.withdraw = withdraw || 0;
		this.deposit = deposit || 0;
		this.balance = balance || 0;
	}
}

export class Checkbook {

	created: string;
	budget: number;
	balance: number;
	checkbook: any = [];

	constructor(balance ,budget, checkbook){
		this.created = new Date().toString();
		this.budget = budget || 0;
		this.balance = balance || 0;
		this.checkbook = checkbook;
	}
}

@Injectable()
export class LocalStorageProvider {

	constructor(public http: Http,
				public storage: Storage,
				public events: Events) {
		// console.log('Hello LocalStorageProvider Provider');
	}

	set(key, account)
	{
		return this.storage.set(key, account);
		}
		

   setminBal(minbal){
    this.storage.set('minbal',minbal);
   }
 
	getminbal(){
    	this.storage.get('minbal').then(minbal=>{
    		console.log('minbal: '+ minbal);
    	});
    }


	
	get(key){
		return this.storage.get(key);

	}
	

	isAccountPresent(){
		return new Promise((resolve, reject) => {
			this.storage.forEach( (value, key, index) => {
				// console.log(value);
				resolve(true)
			});
		});
        
	}
	
	delete(key){
		return this.storage.remove(key);
	}

	getAccountList(){
		return new Promise((resolve, reject) => {
			let accounts = [];
			this.storage.forEach( (value, key, index) => {
				// value = JSON.parse(value);
				if(key != 'account') {
					accounts.push(key);
				}
			});
			setTimeout(() =>{
				if(accounts && accounts.length > 0){
					// console.log(accounts);
					resolve(accounts);
					return;
				}
			}, 1000);
		});
	}

	getAllAccounts(){
		return new Promise((resolve, reject) => {
			let accounts = [];
			this.storage.forEach( (value, key, index) => {
				if(key != 'account') {
					value = JSON.parse(value);
						let checkbook = value.checkbook;
					accounts.push({name: key, created: new Date(value.created).toLocaleDateString() , budget: value.budget,obalance: value.balance,
							
				});
				}
			});
			setTimeout(() =>{
				if(accounts && accounts.length > 0){
					// console.log(accounts);
					resolve(accounts);
				}	
				
			}, 1000);
		});
	

	}

	deleteEntry(entry, key){
		// console.log("To delete => "+entry.id);
		this.get(key).then(data =>{
			data = JSON.parse(data) || {};
			let checkbook = data.checkbook;
			// console.log("before delete: "+JSON.stringify(checkbook));
			for (var count = 0; count < checkbook.length; count++) {
			    let value = checkbook[count];
			    if(value.id == entry.id){
					console.log("removing entry..."+value.id);
					checkbook.splice(count, 1);
				}
			}

			this.set(key, JSON.stringify(data)).then(val =>{
				this.updateBalance(key);
				this.events.publish('entry:deleted', new Date().toLocaleString());
			});
		});
	}

	editEntry(entry, key){
		this.get(key).then(data =>{
			data = JSON.parse(data) || {};
			let checkbook = data.checkbook;
			console.log("before delete: "+JSON.stringify(checkbook));
			for (var count = 0; count < checkbook.length; count++) {
			    let value = checkbook[count];
			    if(value.id == entry.id){
					console.log("editing entry..."+value.id);
					value.date = new Date(entry.date).toString();
					value.num = entry.num;
					value.description = entry.description;
					value.r = entry.r;
					value.withdraw = entry.withdraw;
					value.deposit = entry.deposit;
				}
			}

			if(entry.id == checkbook[0].id){
				console.log("Updating "+checkbook[0].description);
				data.balance = parseInt(entry.deposit) - parseInt(entry.withdraw);
			}


			this.set(key, JSON.stringify(data)).then(val =>{
				this.updateBalance(key);
				this.events.publish('entry:updated', new Date().toLocaleString());
			});
			
		});
	}

	updateBalance(key){
		this.get(key).then(data => {
			let balance = 0;
			data = JSON.parse(data) || {};
			let checkbook = data.checkbook;
			for(var i in checkbook){

				balance += checkbook[i].deposit - checkbook[i].withdraw;
				checkbook[i].balance = balance;
				// console.log(checkbook[i].balance);
			}

			this.set(key, JSON.stringify(data));
		});
	}

	setAccount(account){
		this.storage.set('account', account);
	}

	getAccount(){
		return this.storage.get('account').then(account =>{
			if(!account){
				this.getAccountList().then(list => {
					if(list){
						this.setAccount(list[0]);
						console.log("Setting account => "+list[0]);
						return list[0];
					}
					else{
						return null;
					}
				});
			}
			return account;

		});
	}

}
