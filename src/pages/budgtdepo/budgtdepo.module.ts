import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgtdepoPage } from './budgtdepo';

@NgModule({
  declarations: [
    BudgtdepoPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgtdepoPage),
  ],
  exports: [
    BudgtdepoPage
  ]
})
export class BudgtdepoPageModule {}
