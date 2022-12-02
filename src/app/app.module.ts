import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { AdminNavComponent } from './dashboard/admin-nav/admin-nav.component';
import { ImagesComponent } from './dashboard/images/images.component';
import { UploadComponent } from './dashboard/upload/upload.component';
import { InsertComponent } from './dashboard/insert/insert.component';
import { AddImagePopupComponent } from './dashboard/add-image-popup/add-image-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    DashboardComponent,
    ProductsDashboardComponent,
    AdminNavComponent,
    ImagesComponent,
    UploadComponent,
    InsertComponent,
    AddImagePopupComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
