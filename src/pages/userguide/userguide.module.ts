import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserguidePage } from './userguide';

@NgModule({
  declarations: [
    UserguidePage,
  ],
  imports: [
    IonicPageModule.forChild(UserguidePage),
  ],
  exports: [
    UserguidePage
  ]
})
export class UserguidePageModule {}
