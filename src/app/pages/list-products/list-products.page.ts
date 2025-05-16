import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { GetProductsByCategory } from 'src/app/state/products/products.actions';
import { ProductsState } from 'src/app/state/products/products.state';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
  standalone: false
})
export class ListProductsPage {

  @Select(ProductsState.products)
  private products$: Observable<Product[]>;

  private idCategory: string;
  public products: Product[];

  private subscription: Subscription;

  constructor(

    private navParams: NavParams,
    private navController: NavController,
    private store: Store,
    private loagingController: LoadingController,
    private translate: TranslateService,

  ) {
    this.products = [];
   }

   async ionViewWillEnter() {
    this.subscription = new Subscription();
    console.log(this.navParams.data['idCategory']);
    this.idCategory = this.navParams.data['idCategory'];

    if(this.idCategory){

      const loading = await this.loagingController.create({
      message: this.translate.instant('label.loading'),
    })

    await loading.present();

      this.store.dispatch(new GetProductsByCategory({
        idCategory: this.idCategory
      }));

      const sub = this.products$.subscribe({
        next: () => {
          this.products = this.store.selectSnapshot(ProductsState.products);
          console.log(this.products);
          loading.dismiss();
        },
        error: (err) => {
          console.error(err);
          loading.dismiss();
        }
      })
      this.subscription.add(sub);
    }else{
      this.navController.navigateForward('categories');
    }
  }

  goToProduct(product: Product) {
    this.navParams.data['product'] = product;
    this.navController.navigateForward('product');
  }

  refreshProducts($event){
    this.store.dispatch(new GetProductsByCategory({
        idCategory: this.idCategory
      }))
    $event.target.complete();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
