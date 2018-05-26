import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import{PermaccformPage}from'../permaccform/permaccform';
import{BudgetdepositPage}from'../budgetdeposit/budgetdeposit';

@Component({
  selector: 'page-files',
  templateUrl: 'files.html'
})
export class FilesPage {
  constructor(public navCtrl: NavController) {
}
/*loadpaf()
{
this.navCtrl.push(PermaccformPage);
}*/

loadbudget()
{
  this.navCtrl.push(BudgetdepositPage);
}
                    
}