import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
  standalone: false
})
export class ListProductsPage implements OnInit {

  private idCategory: string;

  constructor(
    private navParams: NavParams,
    private navController: NavController,
  ) {
    console.log(this.navParams.data['idCategory']);
    this.idCategory = this.navParams.data['idCategory'];
   }

  ngOnInit() {
    if(this.idCategory){

    }else{
      this.navController.navigateForward('categories');
    }
  }

}
