import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraviewPage } from './cameraview';

@NgModule({
  declarations: [
    CameraviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraviewPage),
  ],
  exports: [
    CameraviewPage
  ]
})
export class CameraviewPageModule {}
