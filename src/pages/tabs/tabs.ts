import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {FilesPage} from '../files/files';
import{AccountPage}from'../account/account';
import {PurchasePage}from'../purchase/purchase';
import{OptionsPage}from'../options/options';
import{BudgetdepositPage}from'../budgetdeposit/budgetdeposit';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root= BudgetdepositPage;
  tab3Root = ContactPage;
   tab4Root= FilesPage;
  tab5Root=AccountPage;
  tab6Root=PurchasePage;

  constructor() {

  }
}
