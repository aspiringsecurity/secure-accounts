import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditentryPage } from './editentry';

@NgModule({
  declarations: [
    EditentryPage,
  ],
  imports: [
    IonicPageModule.forChild(EditentryPage),
  ],
  exports: [
    EditentryPage
  ]
})
export class EditentryPageModule {}
