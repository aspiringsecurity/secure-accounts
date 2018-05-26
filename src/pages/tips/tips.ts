import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
 
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html'
})
export class TipsPage {
 
    items: any = [];
    itemsi:any=[];
    itemsm:any=[];
   itemsp:any=[];
    itemExpandHeight: number = 40;
 
    constructor(public navCtrl: NavController,public iab:InAppBrowser) {
 
        this.items = [
            {expanded: false}
            
        ];
          this.itemsi = [
            {expanded: false}
            
        ];
        this.itemsm = [
            {expanded: false}
            
        ];

         this.itemsp = [
            {expanded: false}
            
        ];
        
        

       
 
    }

    visit(){
         console.log("investment");
    	let browser = this.iab.create('https://investguru.in');
        console.log("investmentplan");
    	
	}

     visith(){
    	
    	let browser = this.iab.create('http://www.lifehack.org/articles/money/the-5-best-websites-make-money-online.html');
    	
	}

     visitm(){
    	
    	let browser = this.iab.create('http://www.moneycontrol.com/fixed-income/best-fixed-income-rates/');
    	
	}
    
     visitp(){
    
    	let browser = this.iab.create('https://www.policybazaar.com/');
    	
	}
    



    


 
    expandItem(item){
 
        this.items.map((listItem) => {
 
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }

      expandItemi(itemi){
 
        this.itemsi.map((listItem) => {
 
            if(itemi == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }

    expandItemm(itemm){
 
        this.itemsm.map((listItem) => {
 
            if(itemm == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }

     expandItemp(itemp){
 
        this.itemsp.map((listItem) => {
 
            if(itemp == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }
      
    }
     
     
 
