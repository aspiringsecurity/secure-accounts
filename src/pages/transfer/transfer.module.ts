import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferPage } from './transfer';

@NgModule({
  declarations: [
    TransferPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferPage),
  ],
  exports: [
    TransferPage
  ]
})
export class TransferPageModule {}
