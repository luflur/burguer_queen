import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { GetCategories } from 'src/app/state/categories/categories.actions';
import { CategoriesState } from 'src/app/state/categories/categories.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage {

  @Select(CategoriesState.categories)
  private categories$: Observable<Category[]>;

  public categories: Category[];
  private subscription: Subscription;

  constructor(
    private store: Store,
    private loagingController: LoadingController,
    private translate: TranslateService,
    private navController: NavController,
    private navParams: NavParams,
  ) { }

  ionViewWillEnter() {
    this.subscription = new Subscription();
    this.loadData();
  }

  async loadData() {
    const loading = await this.loagingController.create({
      message: this.translate.instant('label.loading'),
    })

    await loading.present();

    setTimeout(() => {
      this.store.dispatch(new GetCategories());
      this.categories$.subscribe({
        next: () => {
          this.categories = this.store.selectSnapshot(CategoriesState.categories);
          console.log(this.categories);
          loading.dismiss();
        }, error: (err) => {
          console.error(err);
          loading.dismiss();
        }
      });
    }, 1500);

  }

  goToProducts(category: Category) {
    this.navParams.data['idCategory'] = category._id;
    this.navController.navigateForward('list-products')
  }

  refreshCategories($event){
    this.store.dispatch(new GetCategories());
    $event.target.complete();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
