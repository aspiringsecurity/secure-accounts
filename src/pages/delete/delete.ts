import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import{LocalStorageProvider }from'../../providers/local-storage/local-storage';
import { ActionSheetController } from 'ionic-angular';
import{Validators,FormBuilder,FormGroup}from'@angular/forms';
import{TransferPage} from'../../pages/transfer/transfer';
import{ContactPage} from'../../pages/contact/contact';

@IonicPage()
@Component({
  selector: 'page-delete',
  templateUrl: 'delete.html',
})
export class DeletePage {

  list:any={};
  delete:FormGroup;
  account:any={};
deleteConfirmed:string;
deleteRefused:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public store:LocalStorageProvider,
  public formBuilder: FormBuilder,public actionSheetCtrl: ActionSheetController,public alert:AlertController)
   {
    
this.delete = this.formBuilder.group({

	 name: ['', Validators.required]});
  
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePage');
  }
/*deleteaccount()
{
//if (this.deleteConfirmed !== undefined) {
 let key = this.delete.value.name;
    this.store.delete(key);
  alert("Account deleted");
}*/
del()
{

 let actionsheet = this.actionSheetCtrl.create({
 title:"Delete account",
 buttons:[{
 text: 'Transfer',
 handler: () => {
   if(this.delete.value.name=='')
   {
     alert("Please enter the account name");
   }
   else
   {
   this.navCtrl.push(TransferPage);
   }
 //console.log("Camera Clicked");
 }
 },{
 text: 'Delete',
 handler: ()=>{

   if(this.delete.value.name=='')
   {
     alert("Please enter the account name");
   }
   else
   {
  
   let key = this.delete.value.name;
    this.store.delete(key);
  alert("Account deleted");
  this.navCtrl.push(ContactPage);
 //console.log("Gallery Clicked");
}
 }
 }]
 });
 actionsheet.present();
}

}




