import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './pay-routing.module';

import { PayPage } from './pay.page';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from "../../shared/login/login.component";
import { CreateAccountComponent } from "../../shared/create-account/create-account.component";
import { ListProductOrderComponent } from 'src/app/shared/list-product-order/list-product-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule,
    TranslateModule.forChild(),
    LoginComponent,
    CreateAccountComponent,
    ListProductOrderComponent
],
  declarations: [PayPage]
})
export class PayPageModule {}
