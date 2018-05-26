import { Component,ViewChild } from '@angular/core';
import { NavController,ModalController,AlertController,LoadingController,PopoverController,Events,ViewController} from 'ionic-angular';
import{LocalStorageProvider }from'../../providers/local-storage/local-storage';
import{ToastController}from 'ionic-angular';
import{EditentryPage}from'../editentry/editentry';
import{CreateAccountPage}from'../../pages/create-account/create-account';
import { DatePicker } from '@ionic-native/date-picker';
import { UtilityProvider, APP_NAME } from '../../providers/utility/utility';
import { EmailComposer } from '@ionic-native/email-composer';
import { Printer, PrintOptions } from '@ionic-native/printer';
import{TipsPage}from'../tips/tips';
import{NotifyPage}from'../notify/notify';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	display: any = {};
	entry: any = {};
	register: any = [];
	accountsList : any=[] ;
	accountSelected: any;
	finalAmount: any;
	descShow: boolean;
	date:Date;
	finalBudget:number=0;
	accounts:any=[];
	totalBudget: any = 0 ;
	index: any;
	totalCurrentBalance :any = 0;

	 min:any;

	finalBalance:any = {};		

	@ViewChild('mycheckbook') mycontent;

	constructor(public navCtrl: NavController,
				public store:LocalStorageProvider,public toast:ToastController,
				public loadingCtrl: LoadingController,
				public popoverCtrl: PopoverController,
				public toastCtrl:ToastController,
				public events: Events,
				public datePicker:DatePicker,
				public viewCtrl:ViewController,
				public modalCtrl:ModalController,
			public util: UtilityProvider,
				public emailComposer: EmailComposer ,
				public printer: Printer,

				public alertCtrl: AlertController) 
				{


					this.store.getAllAccounts().then(datas => {
			// console.log(data);
			this.accounts = datas || [];
			 this.calculateBudget();
	
	
			
		});
		
		
	

  	this.date = new Date();
//console.log(this.accountsList.length);
					this.updateAccounts();
		
				//	this.finalAmount = 0;
		this.descShow = false;

		this.display = { help: true, sample: false, checkbook: false , summary:false};
			this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
			this.accountSelected = this.accountsList[0];
		});

	
				}
				updateAccounts(){
		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
		});

		
		this.store.getAccount().then(account => {
			console.log("Current account => "+account);
			if(!account) return;
			this.accountSelected = account;
			this.loadCheckbook(this.accountSelected);
		});
	}


	 calculateBudget(){
		 this.totalBudget=0;
	 	// console.log(JSON.stringify(this.accounts));
		Object.keys(this.accounts).map(key => {
			
			let account = this.accounts[key];
			this.totalBudget = parseFloat(this.totalBudget)+parseFloat(account.obalance);
			console.log(this.totalBudget);
		});
		
	}

	ionViewWillEnter(){
		
		this.totalBudget = 0;
this.totalCurrentBalance = 0;
		this.display.help = true;

		this.updateAccounts();


//this.setalert();
		this.store.getAccountList().then(accounts => {
			this.accountsList = accounts;
			this.accountSelected = this.accountsList[0];
			
		//	this.finalBudget = parseInt(this.finalBudget.toString())+parseInt(this.finalAmount.toString());
			//console.log(this.finalAmount.toString());
		
	//	console.log(this.finalBudget);
			this.loadCheckbook(this.accountSelected);
			//this.updateSelectedAccount(this.accounts);
		})
		setTimeout(()=>{
			if(this.accountsList.length == 0){
				this.showConfirm();
			}
		},1050);

		this.store.getAllAccounts().then(datas => {
			// console.log(data);
			this.accounts = datas || [];
			this.calculateBudget();	

		
		});
			
	}
	

	showConfirm(){
		let confirm = this.alertCtrl.create({
			title: 'Create a new Account',
			message: 'No account found. Do you want to create a new account?',
			buttons: [
			{
			  text: 'No',
			  handler: () => {
			    // console.log('Disagree clicked');
			  }
			},
			{
			  text: 'Yes',
			  handler: () => {
			    // console.log('Agree clicked');
			    this.navCtrl.push(CreateAccountPage);
			  }
			}
			]
		});
		confirm.present();
	}

	open(field){
		switch (field) {
			case "help":
				this.display.checkbook = false;
				this.display.help = true;
				this.display.sample = false;
				this.display.summary=false;
			break;
			case "sample":
				this.display.checkbook = false;
				this.display.help = false;
				this.display.sample = true;
				this.display.summary=false;
			break;
			case "checkbook":
				this.display.checkbook = true;
				this.display.help = false;
				this.display.sample = false;
				this.display.summary=false;
			break;
			case "summary":

			this.display.checkbook = false;
				this.display.help = false;
				this.display.sample = false;
				this.display.summary=true;
				break;
			default:
				// code...
				break;
		}
		// console.log("State change => "+JSON.stringify(this.display));
	}

	logEntry(){
		// console.log(this.entry); 
		/* TODO: Add appropriate validations here for different fields

		   TODO: Check  for decimal values
		*/

	
		
		if(!this.accountSelected) {
			alert("Please select an account first");
			return;
		}
		if(!this.entry.deposit&&!this.entry.withdraw)
		{
			alert("Enter the withdrawal or deposit amount");
		}
else
{
this.store.get(this.accountSelected).then(data => {
			this.register = JSON.parse(data) || [];
		if(!this.entry.deposit || this.entry.deposit == '') this.entry.deposit = 0;
		if(!this.entry.withdraw || this.entry.withdraw == '') this.entry.withdraw = 0;
		let balance  = this.entry.deposit - this.entry.withdraw;
			console.log("Add "+this.register.checkbook[this.register.checkbook.length-1].balance+" & "+balance);
			balance = parseInt(balance.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);
			let entryData = { date: new Date().toString(), num: this.entry.num, description: this.entry.description, 
						 r: this.entry.r, withdraw: this.entry.withdraw,
						deposit: this.entry.deposit, bank:this.entry.bank,balance: balance
			};

			// console.log(data);
			
			this.register.checkbook.push(entryData);

			console.log(JSON.stringify(this.register)); 
})
			this.store.set(this.accountSelected, JSON.stringify(this.register)).then(()=>{
	this._presentToast("Entries added,please refresh the checkbook for the updated balance in the account");


				this.calculateBudget();
				this.loadCheckbook(this.accountSelected);
			
});
		
}
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
 

 clearEntry()
 {
	this.entry.date = " ";
	 this.entry.num=" ";
	 this.entry.description=" ";
	  this.entry.r=" ";
	  this.entry.withdraw="";
	  this.entry.deposit="";
	 }
		/*loadCheckbook(account){
		this.store.get(account).then(data => {
			// console.log("Register --> "+data);
			this.register = JSON.parse(data) || {};
			if(data){
				this.finalAmount = this.register.checkbook[this.register.checkbook.length-1].balance;
			}
		});

		}*/
/*	loadCheckbook(account)
	{
		this.store.getAccountList().then(accounts => {
			for(let j=0; j<accounts.length; j++){
				this.store.get(account[j]).then(data => {
					let register = JSON.parse(data) || {};
					if(data){
						this.finalAmount[accounts[j]] = register.checkbook[register.checkbook.length-1].balance;
					}
				});
			}
		});*/

	/*setalert()
	{	
	 if(this.store.getBal()<this.totalCurrentBalance)
		{		
				alert("you have reached your min balance");
		}
		
	}*/



		/*if(this.totalCurrentBalance)
		{
			alert("You have reached your minimum balance");
		}*/
		
	
	

	loadCheckbook(account)
	{

		this.store.get(account).then(data => {
			// console.log("Register --> "+JSON.stringify(data));

			this.register = JSON.parse(data) || {};
			if(data){
				this.finalAmount = this.register.checkbook[this.register.checkbook.length-1].balance;
			}
		});
this.totalCurrentBalance = 0;

		
		Object.keys(this.accountsList).map(key =>{
			console.log(this.accountsList[key]); // this should display the account name one by one

			//for(let j=0; j<this.accountsList.length; j++){
			this.store.get(this.accountsList[key]).then(data => {

				let register = JSON.parse(data) || {};
				if(data){
					this.finalBalance[this.accountsList[key]] = register.checkbook[register.checkbook.length-1].balance;

				
					this.totalCurrentBalance = parseFloat(this.totalCurrentBalance) + parseFloat( register.checkbook[register.checkbook.length-1].balance);
				console.log(this.totalCurrentBalance);
			//this.store.getminbal();
			}
			//console.log(this.store.getminbal());
				//this.finalBalance=parseInt(this.finalBalance[this.accountsList[j]].toString())+parseInt(account.index);
	//this.totalCurrentBalance = parseFloat(this.totalCurrentBalance) + parseFloat( register.checkbook[register.checkbook.length-1].balance);
				//console.log(this.totalCurrentBalance);
				
			});
			
		
		});


	}
	



	updateSelectedAccount(account){
		this.accountSelected = account;
		this.loadCheckbook(account);
		this.store.setAccount(account);
		
	}

updateRow(row){
		this.navCtrl.push(EditentryPage, {
			data: row, account: this.accountSelected
		});
	}
	/*updateRow(row){
		// console.log("updating=> "+row)
		const that = this;
		let editentry = this.modalCtrl.create(EditentryPage, {data: row} );
		editentry.onDidDismiss(entry => {
			if(!entry) return;
			// console.log('Updating =>'+JSON.stringify(data));
			that.store.get(that.accountSelected).then(data => {
				that.register = JSON.parse(data) || [];
				let checkbook = that.register.checkbook;
			let balance  = entry.deposit - entry.withdraw;
			//	balance = parseInt(balance.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);
				let i:number;
				for(i =0; i< checkbook.length; i++){
					if(checkbook[i].id == entry.id){
						checkbook[i].date = new Date(entry.date).toString();
						checkbook[i].num = entry.num;
						checkbook[i].description = entry.description;
						checkbook[i].r = entry.r;
						checkbook[i].withdraw = entry.withdraw;
						checkbook[i].deposit = entry.deposit;
	//checkbook[i].balance =  parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);
						checkbook[i].balance=parseInt(checkbook[i-1].balance )+ parseInt(balance.toString()) ;
						this.store.set(this.accountSelected, JSON.stringify(this.register));
						return;
					}
				}
				// 

			});
		});
		editentry.present();
	}*/
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

	email(){
		// console.log(this.mycontent.nativeElement.innerHTML);
		this.descShow = true;
		this.presentLoading();

		setTimeout(()=>{
			let content = this.mycontent.nativeElement.innerHTML;
			this.descShow = false;
			this.util.convertToHtml(content, this.accountSelected).then(data => {
				
				this.openEmailComposer(data, this.accountSelected+ ' account attached');			
			
			});
		}, 700);
		
	}

	printFile(){
		this.descShow = true;
		this.presentLoading();

		setTimeout(()=>{
			let options : PrintOptions =  {
				name: this.accountSelected+'.html',
				printerId: 'printer007',
				duplex: true,
				landscape: false,
				grayscale: true
			};

			let content = this.mycontent.nativeElement.innerHTML;
			this.descShow = false;
			this.util.convertToHtml(content, this.accountSelected).then((data:string) => {
				// console.log(data);
				this.printer.print(data, options).then(success => {
					console.log(success);
				}, 
				err => console.log(err));
			
			});
		}, 700);
	}

	exportAsPDF(){
		this.descShow = true;
		this.presentLoading();

		setTimeout(()=>{
			let content = this.mycontent.nativeElement.innerHTML;
			this.descShow = false;
			this.util.convertToHtml(content, this.accountSelected).then((data:string) => {
				// console.log(data);
				 this.util.createPDF(data).subscribe(response => {
				 	let result = response.result;
				 	if(result == "ok"){
						let pdfurl = response.pdfurl;
						console.log(pdfurl);
						this.openEmailComposer(pdfurl, this.accountSelected+" PDF link available");
					}

				}, error => {
					console.log(JSON.stringify(error));
				}); //Cloudservice
			
			});
		}, 700);
	}

	openEmailComposer(url, subject){
		let email = {
				to: '',
				cc: '',
				bcc: ['', ''],
				subject: subject,
				body: url,
				isHtml: true
			};

		this.emailComposer.open(email);
	}

	presentLoading() {
	    let loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 1000
	    });
	    loader.present();
  	}

  	exportAsCSV(){
  		this.descShow = true;
		this.presentLoading();

		setTimeout(()=>{
			let content = this.mycontent.nativeElement.innerHTML;
			this.descShow = false;
			this.util.convertToCsv(content, this.accountSelected).then((data) => {
				// console.log(data);
				var csv = [];
				var iDiv = document.createElement('div');
				iDiv.id = 'iDiv';
				iDiv.innerHTML = data+'';
				// console.log(typeof data);
				
				var rows = iDiv.querySelectorAll("table tr");
				
			    for (var i = 0; i < rows.length; i++) {
					var row = [], cols = rows[i].querySelectorAll("td, th");
					
			        for (var j = 0; j < cols.length; j++) 
			            row.push(cols[j].innerHTML);
					csv.push(row.join(","));		
				}
				csv.join('\n');
				console.log(csv);
				iDiv = undefined;
				this.openEmailComposer(csv, this.accountSelected+ ' CSV attached');	
			});
		}, 700);
  	}
	  tips()
	  {
		  this.navCtrl.push(TipsPage);
	  }

notify()
{
this.navCtrl.push(NotifyPage,{
params:this.totalCurrentBalance
});
}
	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(OptionsPopoverPage);
		popover.present({
		  ev: myEvent
		});

		popover.onDidDismiss(data => {
			switch (data) {
				
				case "email":
						this.email();
					break;
				case "print":
						this.printFile();
					break;
				case "pdf":
						this.exportAsPDF();
					break;
				case "csv":
						this.exportAsCSV();
					break;
			    case  "tips":
					this.tips();
					break;		
					
				default:
					// code...
					break;
			}
		});
	}
	
}



@Component({
  template: `
    <ion-list>
      <ion-list-header>More Options</ion-list-header>
      
      <button ion-item detail-none (click)="close('email')">Email</button>
      <button ion-item detail-none (click)="close('print')">Print</button>
      <button ion-item detail-none (click)="close('pdf')">Export as PDF</button>
      <button ion-item detail-none (click)="close('csv')">Export as CSV</button>
	   <button ion-item detail-none (click)="close('tips')">Tips</button>
	 
    </ion-list>
  `
})

export class OptionsPopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close(val) {
    this.viewCtrl.dismiss(val);
  }

}
