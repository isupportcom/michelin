import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { AdminAuthGuard } from "./services/admin-auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UpdateProductsComponent } from "./dashboard/update-products/update-products.component";
import { CartComponent } from "./cart/cart.component";



const  routes : Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard],
  },{
    path:'products',
    component:ProductsComponent,
    canActivate:[AuthGuard]
  },

  {
    path : 'dashboard',
    canActivate:[AdminAuthGuard],
    component:DashboardComponent,
    children:[

          {
            path:'update-products',
            component:UpdateProductsComponent
          }


    ]
  },
  {
    path:'cart',
    canActivate:[AuthGuard],
    component: CartComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };
