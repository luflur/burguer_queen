import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule),
    data: { showBack: false }
  },
  {
    path: 'list-products',
    loadChildren: () => import('./pages/list-products/list-products.module').then( m => m.ListProductsPageModule),
    data: { showBack: true }
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule),
    data: { showBack: true }
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then( m => m.PayPageModule),
    data: { showBack: false }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
