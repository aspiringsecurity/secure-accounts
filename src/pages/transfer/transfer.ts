import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import{Validators,FormBuilder,FormGroup}from'@angular/forms';
import { LocalStorageProvider , Entry} from '../../providers/local-storage/local-storage';
import { DatePicker } from '@ionic-native/date-picker';



@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {
  list:any={};
  accountsList : any = [];
	accountSelected: any;
  amount: any ;
  register: any = {};
  date: Date ;
transfer:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public store:LocalStorageProvider,
                public toastCtrl: ToastController,public datePicker:DatePicker) {

     this.transfer = this.formBuilder.group({
          date: ['', Validators.required],
          amount: ['',Validators.required],
          from: ['', Validators.required],
          to:['',Validators.required],
          reason: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        });

        this.store.getAccountList().then(transfer => {
        	this.accountsList = transfer;
        //	this.transfer.value.accountSelected = this.accountsList[0];
      });
      
this.date = new Date();

  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad TransferPage');
  }
  ionViewWillEnter()
  {
    this.store.getAccountList().then(transfer => {
			this.accountsList = transfer;
			//this.transfer.value.accountSelected = this.accountsList[0];
  });
  }
  transferData(){
     if(this.transfer.value.amount == '') {
      this._presentToast("Amount cannot be empty!");
      return;
    }
    else if(this.transfer.value.amount<0)
		{
alert("enter a positive  amount");
		}
		else if(this.transfer.value.amount>9999999999)
		{
alert("enter a valid  amount");
		}
    else if(!this.transfer.value.from) 
    {
      this._presentToast("Select FROM account ");
      return;
    }
  else  if(!this.transfer.value.to)
  {
   this._presentToast("Select TO account "); 
return;
  } 
    else if(this.transfer.value.from == this.transfer.value.to) {
      this._presentToast("Cannot transfer within the same amount");
      return;
    }
	 else if(this.transfer.value.reason=="")
		{
			alert("Please enter the reason");
      return;
		}
    else
    {
    console.log("Transfering "+this.transfer.value.amount+" from account "+this.transfer.value.from+" to "+this.transfer.value.to);
    const descTo = 'Transfer to account '+this.transfer.value.to;
    const descFrom = 'Transfer from account '+this.transfer.value.from;

    this.store.get(this.transfer.value.to).then(data => {
      this.register = JSON.parse(data) || {};
      // this.register.checkbook;

      let balance  = this.transfer.value.amount;
      console.log("Add "+this.register.checkbook[this.register.checkbook.length-1].balance+" & "+balance);
      balance = parseInt(balance.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);

      let entry = new Entry(new Date(this.date).toString(), 
                  'NEFT',
                  descFrom,
                  'R',
                  0,
                  this.transfer.value.amount, 
                  balance);

      this.register.checkbook.push(entry);

      // console.log(JSON.stringify(this.register)); 
      this.store.set(this.transfer.value.to, JSON.stringify(this.register));
       // console.log('Journal entry Created');
    
    });
    

    this.store.get(this.transfer.value.from).then(data => {
      this.register = JSON.parse(data) || {};
      // this.register.checkbook;

      let balance  = 0 - this.transfer.value.amount;
      console.log("Add "+this.register.checkbook[this.register.checkbook.length-1].balance+" & "+balance);
      balance = parseInt(balance.toString()) + parseInt(this.register.checkbook[this.register.checkbook.length-1].balance);

      let entry = new Entry(new Date().toString(), 
                  'NEFT',
                  descTo,
                  'R',
                  this.transfer.value.amount,
                  0, 
                  balance);

      this.register.checkbook.push(entry);

      // console.log(JSON.stringify(this.register)); 
     this.store.set(this.transfer.value.from, JSON.stringify(this.register));
       // console.log('Journal entry Created');
  /*this.list = {
			created: new Date().toString(), amount: this.transfer.value.amount, from: this.transfer.value.from ,
			 to:this.transfer.value.to,reason:this.transfer.value.reason
		};
    this.store.sets(JSON.stringify(this.list));

  });*/
    });
    }

    setTimeout(()=> {
      this._presentToast(" Amount Transferred successfully ");
      this.navCtrl.pop();
    }, 100);


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

