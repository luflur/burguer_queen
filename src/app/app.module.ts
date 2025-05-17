import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Instalar ngx-translate/core y ngx-translate/http-loader
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxsModule } from '@ngxs/store';
import { CategoriesState } from './state/categories/categories.state';
import { ProductsState } from './state/products/products.state';
import { AuthState } from './state/auth/auth.state';
import { LoginComponent } from './shared/login/login.component';
import { User } from './models/user';
import { UsersState } from './state/users/users.state';
import { CreateAccountComponent } from './shared/create-account/create-account.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json'); // Cargar archivos de traducción desde assets/i18n/
} // Importar HttpLoaderFactory

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({ // Configuración de ngx-translate
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([
      CategoriesState,
      ProductsState,
      AuthState,
      UsersState,
    ]), // Configuración de NGXS
    ToolbarComponent,
    FooterComponent,
    LoginComponent,
    CreateAccountComponent,
  ],
  providers: [
    { provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy },
    NavParams,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
