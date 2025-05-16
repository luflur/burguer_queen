import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Category } from 'src/app/models/category';
import { GetCategories } from 'src/app/state/categories.actions';
import { CategoriesState } from 'src/app/state/categories.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {

  public categories: Category[];

  constructor(
    private store: Store,
    private loagingController: LoadingController,
    private translate: TranslateService,
    private navController: NavController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loagingController.create({
      message: this.translate.instant('label.loading'),
    })

    loading.present();

    setTimeout(() => {
      this.store.dispatch(new GetCategories()).subscribe({
        next: () => {
          this.categories = this.store.selectSnapshot(CategoriesState.categories);
          console.log(this.categories);
          loading.dismiss();
        }, error: (err) => {
          console.error(err);
        },
        complete: () => {
          loading.dismiss();
        }
      });
    }, 5000);

  }

  goToProducts(category: Category) {
    this.navParams.data['idCategory'] = category._id;
    this.navController.navigateForward('list-products')
  }
}
