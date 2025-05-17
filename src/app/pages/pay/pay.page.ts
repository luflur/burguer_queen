import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserOrderService } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
  standalone: false
})
export class PayPage{

  public showNewAccount: boolean;
  public step: number;
  public optionAddress: string;
  public showNewAddress: boolean;
  public address: string;

  constructor(
    public userOrderService: UserOrderService,
    private navController: NavController,
  ) {
  }

  ionViewWillEnter() {
    this.showNewAccount = false;
    this.step = 1;
    this.optionAddress = 'address-default';
    this.showNewAddress = false;
    this.changeOptionAddress();
  }

  newAccount() {
    this.showNewAccount = true;
  }

  showLogin() {
    this.showNewAccount = false;
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  back(){
    this.navController.navigateForward('categories');
  }

  changeOptionAddress(){
    switch (this.optionAddress) {
      case 'address-default':
        this.showNewAddress = false;
        this.address = this.userOrderService.getUser().address;
        break;
      case 'choose-address':
        this.showNewAddress = true;
        this.address = '';
        break;
    }
  }

}
