import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetdepositPage } from './budgetdeposit';

@NgModule({
  declarations: [
    BudgetdepositPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetdepositPage),
  ],
  exports: [
    BudgetdepositPage
  ]
})
export class BudgetdepositPageModule {}
