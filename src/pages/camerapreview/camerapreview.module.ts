import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamerapreviewPage } from './camerapreview';

@NgModule({
  declarations: [
    CamerapreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CamerapreviewPage),
  ],
  exports: [
    CamerapreviewPage
  ]
})
export class CamerapreviewPageModule {}
