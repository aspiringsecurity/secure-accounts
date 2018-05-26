import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview,CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

/**
 * Generated class for the CameraviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cameraview',
  templateUrl: 'cameraview.html',
})
export class CameraviewPage {


    public getWidth: number;
    public getHeight : number;
    public calcWidth : number;
    constructor(private nav: NavController, private zone:NgZone,private cameraPreview: CameraPreview) {
   
             this.zone.run(() => {
            this.getWidth = window.innerWidth;
            
            this.getHeight = window.innerHeight;
        });
        console.log('width',this.getWidth);
        
           this.calcWidth = this.getWidth - 80;  // Calculate the width of device and substract 80 from device width;
           
             console.log('calc width',this.calcWidth);  
       
    }
    
    /**
     * 
     * Before Using Ionic Native Camera Preview Please Note...
     * 
     * 1. Camera Drag Working in android (However not tested in IOS)
     * 2. tap Photo not working in android (However not tested in IOS)
     * 3. Default Camera Direction i.e Front/Back is Working (However not tested in IOS)
     * 4. toBack and Alpha are useless in Android (However not checking in IOS)
     * 
     *  
     * */ 
    
    startCamera(){
        // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
    this.cameraPreview.startCamera({x: 40, y: 100, width: this.calcWidth, height: 220, toBack: false, previewDrag: true, tapPhoto: true});
        //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted        
    }
    
    stopCamera(){
        this.cameraPreview.stopCamera();
    }
    
    takePicture(){
  
        // let size = {maxWidth: 1024, maxHeight: 640};
        // CameraPreview.takePicture(size);         //Decrepted
         this.cameraPreview.takePicture(function(imgData){
            (<HTMLInputElement>document.getElementById('previewPicture')).src = 'data:image/jpeg;base64,' + imgData;
         });
    }
    
    
    SwitchCamera(){
        this.cameraPreview.switchCamera();
    }
    showCamera(){
        this.cameraPreview.show();
    }
    hideCamera(){
        this.cameraPreview.hide();
    }
    
    
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraviewPage');
  }

}
