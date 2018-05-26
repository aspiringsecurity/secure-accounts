import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import{LocalStorageProvider, Checkbook, Entry }from'../../providers/local-storage/local-storage';
import{PermaccformPage}from'../../pages/permaccform/permaccform';
import{ContactPage} from'../../pages/contact/contact';
import{FilesPage}from '../../pages/files/files';
import{ToastController}from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import{Validators,FormBuilder,FormGroup}from'@angular/forms';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'})

export class CreateAccountPage {

	visibleState = 'visible';
	account:FormGroup;
	list: any = {};
	name:any=[];
	add:any={};
	bank:any={};
	constructor(public navCtrl: NavController, 
				public formBuilder: FormBuilder,
				public store: LocalStorageProvider,
				public toastCtrl:ToastController,
				public actionSheetCtrl:ActionSheetController ,
				public events : Events ) {
				this.account = this.formBuilder.group({
		  name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
		  budget: [''],
		  balance: ['', Validators.required],
		});
	}
	ionViewDidLoad() {
		 console.log('ionViewDidLoad CreateAccountPage');
	}



	/*createAccount()
	{

	
let key = this.account.value.name;
		key = this._formatString(key);

		let checkbook = [];
		let datas = {date: new Date().toLocaleDateString(), num: 1, description: 'Opening Balance', r: 'R', withdraw: 0,
					deposit:  this.account.value.balance, balance: this.account.value.balance};
		checkbook.push(datas);

		this.list = {
			created: new Date().toString(), budget: this.account.value.budget, balance: this.account.value.balance ,
			 checkbook : checkbook
		};
		this.store.set(key, JSON.stringify(this.list));

	alert("Account created");
			


}
*/



createAccount()
{

 let actionsheet = this.actionSheetCtrl.create({
 title:"Create Another account",
 buttons:[{
 text: 'Yes',
 handler: () => {
	 if(this.account.value.name=='')
	 {
		 alert("Please enter account name");
		 return;
	 }
	
	 else if(this.account.value.budget=="")
	 {
		 alert("Enter the valid  pay period budget");
	 }
	 else if(this.account.value.budget<0)
		{
alert("enter a positive  pay period budget amount");
		}
		else if(this.account.value.budget>9999999999)
		{
alert("enter a valid Pay Period Budget");
		}

		else if(this.account.value.balance=="")
{

	alert("Enter valid opening Balance");
}
else if(this.account.value.balance<0)
		{
alert("enter a positive  balance");
		}
		else if(this.account.value.balance>9999999999)
		{
alert("enter a valid opening balance");
		}
 else if(this.account.value.name.maxLength>=15)
{
alert("Please Enter valid account name of maximum length 15");
return;
}
 else
 {
 let key = this.account.value.name;
		key = this._formatString(key);
		this.store.get(key).then(data=>
		{
			if(data)
			{
				alert("exists");
			}
			else
			{
		
	

   let entries = [];

		let entry = new Entry(new Date().toString(), 'DEP','Opening Balance','R',0, this.account.value.balance, this.account.value.balance);
		// console.log(entry);
		entries.push(entry);
		let checkbook = new Checkbook(this.account.value.balance, this.account.value.budget, entries);


		this.store.set(key, JSON.stringify(checkbook)).then(val => {
			this._presentToast("Successfully created account: "+this.account.value.name);
			this.events.publish('account:created', new Date().toLocaleString());

		
			this.navCtrl.pop();

					});
			

		

this._presentToast("Successfully created account: "+this.account.value.name +new Date().toLocaleString());
	//this.events.publish('account:created', new Date().toLocaleString());
this._presentToast("Account created ,Create more accounts now");
			

   this.navCtrl.push(CreateAccountPage);
			}
			})
 //console.log("Camera Clicked");
}
 }
 },{
 text: 'No',
 handler: ()=>{
	 if(this.account.value.name=='')
	 {
		 alert("Please enter account name");
		 return;
	 }
	
	 else if(this.account.value.budget=="")
	 {
		 alert("Enter the valid  pay period budget");
	 }
	 else if(this.account.value.budget<0)
		{
alert("enter a positive  pay period budget amount");
		}
		else if(this.account.value.budget>9999999999)
		{
alert("enter a valid Pay Period Budget");
		}

		else if(this.account.value.balance=="")
{

	alert("Enter valid opening Balance");
}
else if(this.account.value.balance<0)
		{
alert("enter a positive  balance");
		}
		else if(this.account.value.balance>9999999999)
		{
alert("enter a valid opening balance");
		}
 else if(this.account.value.name.maxLength>=15)
{
alert("Please Enter valid account name of maximum length 15");
return;
}
   	 else
	 {
	 
	 let key = this.account.value.name;
		key = this._formatString(key);
		this.store.get(key).then(data=>
		{
			if(data)
			{
				alert("exists");
			}
			else
			{
		

	let entries = [];

		let entry = new Entry(new Date().toString(), 'DEP','Opening Balance','R',0, this.account.value.balance, this.account.value.balance);
		// console.log(entry);
		entries.push(entry);
		let checkbook = new Checkbook(this.account.value.balance, this.account.value.budget, entries);
		// console.log(checkbook);
		// console.log(JSON.stringify(checkbook));

		this.store.set(key, JSON.stringify(checkbook)).then(val => {
			this._presentToast("Successfully created account: "+this.account.value.name+new Date().toLocaleString());
			
			this.navCtrl.pop();
		});
			}
		});
	 }	
 }
 }]
 

 });
 
	
 actionsheet.present();
}
	switchToApp(){
		this.navCtrl.setRoot(TabsPage);
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
 


}


