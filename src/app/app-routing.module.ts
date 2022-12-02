import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";
import { CartComponent } from "./cart/cart.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { AdminAuthGuard } from "./services/admin-auth.guard";
import { ProductsDashboardComponent } from "./dashboard/products-dashboard/products-dashboard.component";
import { ImagesComponent } from "./dashboard/images/images.component";
import { UploadComponent } from "./dashboard/upload/upload.component";
import { InsertComponent } from "./dashboard/insert/insert.component";


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
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AdminAuthGuard],
    children:[
      {
        path:'products',
        component:ProductsDashboardComponent,

      },
      {
        path:'images',
        component:ImagesComponent,
        children:[
          {
            path:'upload',
            component:UploadComponent
          },
          {
            path:'insert',
            component:InsertComponent
          }
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };
